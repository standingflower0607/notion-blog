import Link from 'next/link'
import Header from '../../components/header'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import {
  getBlogLink,
  getDateStr,
  postIsPublished,
} from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name)
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    unstable_revalidate: 10,
  }
}

const defaultImage = '/images/default.jpg'

export default ({ posts = [], preview }) => {
  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className="container">
        <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
          <h1>My Blog</h1>
          <p className="utsukushi-font">SNSをやらない代わりに。</p>
          {posts.length === 0 && (
            <p className={blogStyles.noPosts}>There are no posts yet</p>
          )}
          <div className={blogStyles.flexContainer}>
            {posts.map(post => {
              return (
                <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                  <a className={blogStyles.blogCard} key={post.Slug}>
                    {post.cover ? (
                      <img
                        src={`/api/asset?assetUrl=${encodeURIComponent(
                          post.cover.url as any
                        )}&blockId=${post.cover.blockId}`}
                        className={blogStyles.postPreviewCover}
                      />
                    ) : (
                      <img
                        src={defaultImage}
                        className={blogStyles.postPreviewCover}
                      ></img>
                    )}
                    <div className={blogStyles.postContent}>
                      <div className={blogStyles.title}>
                        {!post.Published && (
                          <span className={blogStyles.draftBadge}>Draft</span>
                        )}
                        {post.Page}
                      </div>
                      {/*
                  {post.Authors.length > 0 && (
                    <div className="authors">By: {post.Authors.join(' ')}</div>
                      )}
                      */}
                      <div className={blogStyles.blogDetails}>
                        {post.Date && (
                          <div className="posted">{getDateStr(post.Date)}</div>
                        )}
                      </div>
                      <p className={blogStyles.postPreview}>
                        {(!post.preview || post.preview.length === 0) &&
                          'No preview available'}
                        {(post.preview || []).map((block, idx) =>
                          textBlock(block, true, `${post.Slug}${idx}`)
                        )}
                      </p>
                    </div>
                  </a>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
