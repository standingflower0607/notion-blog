import Link from 'next/link'
import fetch from 'node-fetch'
import { useRouter } from 'next/router'
import Header from '../../components/header'
import Heading from '../../components/heading'
import components from '../../components/dynamic'
import ReactJSXParser from '@zeit/react-jsx-parser'
import blogStyles from '../../styles/blog.module.css'
import { textBlock } from '../../lib/notion/renderers'
import getPageData from '../../lib/notion/getPageData'
import React, { CSSProperties, useEffect } from 'react'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import { getBlogLink, getDateStr } from '../../lib/blog-helpers'
import { TwitterTweetEmbed } from 'react-twitter-embed'

// Get the data for each blog post
export async function getStaticProps({ params: { slug }, preview }) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex()
  const post = postsTable[slug]

  // if we can't find the post or if it is unpublished and
  // viewed without preview mode then we just redirect to /blog
  if (!post || (post.Published !== 'Yes' && !preview)) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/blog',
        preview: false,
      },
      unstable_revalidate: 5,
    }
  }
  const postData = await getPageData(post.id)
  post.content = postData.blocks
  post.cover = postData.cover

  for (let i = 0; i < postData.blocks.length; i++) {
    const { value } = postData.blocks[i]
    const { type, properties } = value
    if (type == 'tweet') {
      const src = properties.source[0][0]
      // parse id from https://twitter.com/_ijjk/status/TWEET_ID format
      const tweetId = src.split('/')[5].split('?')[0]
      if (!tweetId) continue

      try {
        const res = await fetch(
          `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
        )
        const json = await res.json()
        properties.html = json.html.split('<script')[0]
        post.hasTweet = true
      } catch (_) {
        console.log(`Failed to get tweet embed for ${src}`)
      }
    }
  }

  const { users } = await getNotionUsers(post.Authors || [])
  post.Authors = Object.keys(users).map(id => users[id].full_name)

  return {
    props: {
      post,
      preview: preview || false,
    },
    unstable_revalidate: 10,
  }
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const postsTable = await getBlogIndex()
  // we fallback for any unpublished posts to save build time
  // for actually published ones
  return {
    paths: Object.keys(postsTable)
      .filter(post => postsTable[post].Published === 'Yes')
      .map(slug => getBlogLink(slug)),
    fallback: true,
  }
}

const listTypes = new Set(['bulleted_list', 'numbered_list'])

const RenderPost = ({ post, redirect, preview }) => {
  const router = useRouter()

  let listTagName: string | null = null
  let listLastId: string | null = null
  let listMap: {
    [id: string]: {
      key: string
      isNested?: boolean
      nested: string[]
      children: React.ReactFragment
    }
  } = {}

  useEffect(() => {
    const twitterSrc = 'https://platform.twitter.com/widgets.js'
    // make sure to initialize any new widgets loading on
    // client navigation
    if (post && post.hasTweet) {
      if ((window as any)?.twttr?.widgets) {
        ;(window as any).twttr.widgets.load()
      } else if (!document.querySelector(`script[src="${twitterSrc}"]`)) {
        const script = document.createElement('script')
        script.async = true
        script.src = twitterSrc
        document.querySelector('body').appendChild(script)
      }
    }
  }, [])
  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect)
    }
  }, [redirect, post])

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // if you don't have a post at this point, and are not
  // loading one from fallback then  redirect back to the index
  if (!post) {
    return (
      <div className={blogStyles.post}>
        <p>
          Woops! didn't find that post, redirecting you back to the blog index
        </p>
      </div>
    )
  }

  const defaultImage = '/images/default.jpg'
  const imgPath = '/images/'

  // cover
  const coverURL = post.cover
    ? `/api/asset?assetUrl=${encodeURIComponent(
        post.cover.url as any
      )}&blockId=${post.cover.blockId}`
    : undefined
  const backgroundImageURL = post.Category
    ? `${imgPath}${post.Category.toLowerCase()}/${post.Category.toLowerCase()}` +
      Math.ceil(Math.random() * 10) +
      '.jpg'
    : defaultImage
  const ogImageReplace = coverURL
    ? `https://notion-blog-customized.now.sh/${coverURL}`
    : undefined

  return (
    <>
      <Header titlePre={post.Page} ogImageReplace={ogImageReplace} />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview?slug=${post.Slug}`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div
        className={blogStyles.articleHeader}
        style={{
          backgroundImage: `url(${backgroundImageURL})`,
          backgroundSize: 'cover',
        }}
      >
        {/*
        {coverURL ? (
          <img src={coverURL} style={{ width: '100%', boxShadow: 'none' }} />
        ) : null}
        */}
        <div className={blogStyles.articleHeaderContents}>
          <div className={blogStyles.pageTitleWrapper}>
            <h1 className={blogStyles.pageTitle}>{post.Page || ''}</h1>
          </div>
          <div className={blogStyles.blogDetails}>
            {
              //{post.Authors.length > 0 && (<div className="authors">🤔{post.Authors.join(' ')}</div>)}
            }
            {post.Date && (
              <div className="posted">🗓 {getDateStr(post.Date)}</div>
            )}
            {post.Category && <div>🗂 {post.Category}</div>}
            {post.Tag && <div>🏷 {post.Tag}</div>}
          </div>
        </div>
      </div>
      <div className="container">
        <div className={blogStyles.post}>
          {(!post.content || post.content.length === 0) && (
            <p>This post has no content</p>
          )}

          {(post.content || []).map((block, blockIdx) => {
            const { value } = block
            const { type, properties, id, parent_id } = value
            const isLast = blockIdx === post.content.length - 1
            const isList = listTypes.has(type)
            let toRender = []

            if (isList) {
              listTagName = components[type === 'bulleted_list' ? 'ul' : 'ol']
              listLastId = `list${id}`

              listMap[id] = {
                key: id,
                nested: [],
                children: textBlock(properties.title, true, id),
              }

              if (listMap[parent_id]) {
                listMap[id].isNested = true
                listMap[parent_id].nested.push(id)
              }
            }

            if (listTagName && (isLast || !isList)) {
              toRender.push(
                React.createElement(
                  listTagName,
                  { key: listLastId! },
                  Object.keys(listMap).map(itemId => {
                    if (listMap[itemId].isNested) return null

                    const createEl = item =>
                      React.createElement(
                        components.li || 'ul',
                        { key: item.key },
                        item.children,
                        item.nested.length > 0
                          ? React.createElement(
                              components.ul || 'ul',
                              { key: item + 'sub-list' },
                              item.nested.map(nestedId =>
                                createEl(listMap[nestedId])
                              )
                            )
                          : null
                      )
                    return createEl(listMap[itemId])
                  })
                )
              )
              listMap = {}
              listLastId = null
              listTagName = null
            }

            const renderHeading = (Type: string | React.ComponentType) => {
              toRender.push(
                <Heading key={id}>
                  <Type key={id}>{textBlock(properties.title, true, id)}</Type>
                </Heading>
              )
            }

            const renderBookmark = ({ link, title, description, format }) => {
              const { bookmark_icon: icon, bookmark_cover: cover } = format
              console.debug(JSON.stringify(cover))
              toRender.push(
                <div className={blogStyles.bookmark}>
                  <div>
                    <div style={{ display: 'flex' }}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className={blogStyles.bookmarkContentsWrapper}
                        href={link}
                      >
                        <div
                          role="button"
                          className={blogStyles.bookmarkContents}
                        >
                          <div className={blogStyles.bookmarkInfo}>
                            <div className={blogStyles.bookmarkTitle}>
                              {title}
                            </div>
                            <div className={blogStyles.bookmarkDescription}>
                              {description}
                            </div>
                            <div className={blogStyles.bookmarkLinkWrapper}>
                              <img
                                src={icon}
                                className={blogStyles.bookmarkLinkIcon}
                              />
                              <div className={blogStyles.bookmarkLink}>
                                {link}
                              </div>
                            </div>
                          </div>
                          <div className={blogStyles.bookmarkCoverWrapper1}>
                            <div className={blogStyles.bookmarkCoverWrapper2}>
                              <div className={blogStyles.bookmarkCoverWrapper3}>
                                <img
                                  src={cover}
                                  className={blogStyles.bookmarkCover}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )
            }

            switch (type) {
              case 'page':
              case 'divider':
                break
              case 'text':
                if (properties) {
                  toRender.push(textBlock(properties.title, false, id))
                }
                break
              case 'image':
              case 'video':
              case 'embed': {
                const { format = {} } = value
                const {
                  block_width,
                  block_height,
                  display_source,
                  block_aspect_ratio,
                } = format
                const baseBlockWidth = 768
                const roundFactor = Math.pow(10, 2)
                // calculate percentages
                const width = block_width
                  ? `${Math.round(
                      (block_width / baseBlockWidth) * 100 * roundFactor
                    ) / roundFactor}%`
                  : block_height || '100%'

                const isImage = type === 'image'
                const Comp = isImage ? 'img' : 'video'
                // const useWrapper = block_aspect_ratio && !block_height
                // gifがassetWrapperに包まれないので,条件を変える
                const useWrapper = block_aspect_ratio
                const childStyle: CSSProperties = useWrapper
                  ? {
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      position: 'absolute',
                      top: 0,
                    }
                  : {
                      width,
                      border: 'none',
                      height: block_height,
                      display: 'block',
                      maxWidth: '100%',
                    }

                let child = null

                if (!isImage && !value.file_ids) {
                  // external resource use iframe
                  child = (
                    <iframe
                      style={childStyle}
                      src={display_source}
                      key={!useWrapper ? id : undefined}
                      className={!useWrapper ? 'asset-wrapper' : undefined}
                    />
                  )
                } else {
                  // notion resource
                  child = (
                    <Comp
                      key={!useWrapper ? id : undefined}
                      src={`/api/asset?assetUrl=${encodeURIComponent(
                        display_source as any
                      )}&blockId=${id}`}
                      controls={!isImage}
                      alt={`An ${isImage ? 'image' : 'video'} from Notion`}
                      loop={!isImage}
                      muted={!isImage}
                      autoPlay={!isImage}
                      style={childStyle}
                    />
                  )
                }

                toRender.push(
                  useWrapper ? (
                    <div
                      style={{
                        paddingTop: `${Math.round(block_aspect_ratio * 100)}%`,
                        position: 'relative',
                      }}
                      className="asset-wrapper"
                      key={id}
                    >
                      {child}
                    </div>
                  ) : (
                    child
                  )
                )
                break
              }
              case 'header':
                renderHeading('h1')
                break
              case 'sub_header':
                renderHeading('h2')
                break
              case 'sub_sub_header':
                renderHeading('h3')
                break
              case 'code': {
                if (properties.title) {
                  const content = properties.title[0][0]
                  const language = properties.language[0][0]

                  if (language === 'LiveScript') {
                    // this requires the DOM for now
                    toRender.push(
                      <ReactJSXParser
                        key={id}
                        jsx={content}
                        components={components}
                        componentsOnly={false}
                        renderInpost={false}
                        allowUnknownElements={true}
                        blacklistedTags={['script', 'style']}
                      />
                    )
                  } else {
                    toRender.push(
                      <components.Code key={id} language={language || ''}>
                        {content}
                      </components.Code>
                    )
                  }
                }
                break
              }
              case 'quote': {
                if (properties.title) {
                  toRender.push(
                    React.createElement(
                      components.blockquote,
                      { key: id },
                      properties.title
                    )
                  )
                }
                break
              }
              case 'callout': {
                toRender.push(
                  <div className="callout" key={id}>
                    {value.format?.page_icon && (
                      <div>{value.format?.page_icon}</div>
                    )}
                    <div className="text">
                      {textBlock(properties.title, true, id)}
                    </div>
                  </div>
                )
                break
              }
              case 'tweet':
                const tweetUrl = properties.source[0][0]
                const pos = tweetUrl.indexOf('?')
                let tweetId = tweetUrl.substring(0, pos).split('/')[5]
                if (!tweetId) {
                  tweetId = tweetUrl.split('/')[5]
                }
                toRender.push(
                  <TwitterTweetEmbed
                    key={id}
                    tweetId={tweetId}
                    options={{ margin: '0 auto;' }}
                  />
                )
                break
              case 'bookmark':
                const { link, title, description } = properties
                const { format = {} } = value
                renderBookmark({ link, title, description, format })
                break
              case 'table_of_contents':
                // headerをリストに入れて、埋めてやればいい
                break
              case 'miro':
                let miroUrl = properties.source[0][0]
                const b = miroUrl.indexOf('b')
                const d = miroUrl.indexOf('d')
                const formerUrl = miroUrl.substring(0, b)
                const latterUrl = miroUrl.substring(d + 1, miroUrl.length)
                const embedUrl = `${formerUrl}embed${latterUrl}?&pres=1`
                const miroStyle: CSSProperties = {
                  width: '100%',
                  height: '300px',
                  border: 'none',
                }
                console.log(embedUrl)
                toRender.push(
                  <div>
                    <iframe
                      src={embedUrl}
                      style={miroStyle}
                      frameBorder="0"
                    ></iframe>
                  </div>
                )
                console.log(properties)
                break
              default:
                if (
                  process.env.NODE_ENV !== 'production' &&
                  !listTypes.has(type)
                ) {
                  console.log('unknown type', type)
                  // console.log(block);
                }
                break
            }
            return toRender
          })}
        </div>
        <p>共有したければ、すりゃいいんじゃない</p>
        {/** 

          <div className={blogStyles.shareWrapper}>
            <a href={`https://twitter.com/intent/tweet?url=${location.href}&text=バナナの缶詰 | ${post.Page}`}><i className="fab fa-twitter" /></a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}><i className="fab fa-facebook" /></a>
            <a href={`http://getpocket.com/edit?url=${location.href}&title=バナナの缶詰 | ${post.Page}`}><i className="fab fa-get-pocket" /></a>
            <a href="http://fetchrss.com/rss/5f1151368a93f875168b45675f1151128a93f851128b4567.xml"><i className="fas fa-rss-square" /></a>
          </div>
          */}
      </div>
    </>
  )
}

export default RenderPost
