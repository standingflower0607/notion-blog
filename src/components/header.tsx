import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'
import { slide as Menu } from 'react-burger-menu'
import contacts from '../../public/contacts'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Blog', page: '/blog' },
  { label: 'About', page: '/' },
  { label: 'Contact', page: '/contact' },
  { label: 'Me', page: '/me' },
]

const ogImageUrl = '/images/favicon.jpg'
const profileImage = '/images/for_insta_compressed.jpg'
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', function() {
    //スクロール量を取得
    let scroll = window.scrollY
    // ウィンドウの高さを取得
    let windowHeight = window.innerHeight
    // ページの高さを取得(ページによって異なる、いわばbodyの高さ)
    let pageHeight = document.body.clientHeight
    // 元々のwindowHeightとスクロール量を足すことでページ全体の高さと等しくなる
    // (window.scrollY + window.innerHeight) / document.body.clientHeight
    let x = 16 * (scroll / (pageHeight - windowHeight))
    let a = 1 / 4
    let aG = 1 / 2
    let R = a * Math.pow(x - 8, 2) + 239
    let B = -a * Math.pow(x - 8, 2) + 255
    let G = 0

    if (x <= 4) {
      G = -aG * Math.pow(x - 4, 2) + 255
    } else if (x <= 8) {
      G = 255
    } else if (x <= 12) {
      G = -aG * Math.pow(x - 4, 2) + 255
    } else {
      G = 239
    }
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = `rgb(${R},${B}, ${G} )`
    }
  })
}

export default ({ titlePre = '', ogImageReplace = undefined }) => {
  const { pathname } = useRouter()
  return (
    <header>
      <Menu right>
        <div className={styles.sideProfile}>
          <img src={profileImage} alt="わい" />
          <div>
            <p>たちばな　かん</p>
            <div className="iconWrapper">
              {contacts.map(({ icon, link, alt }) => {
                return (
                  <ExtLink key={link} href={link} aria-label={alt}>
                    <i className={icon} />
                  </ExtLink>
                )
              })}
            </div>
          </div>
        </div>
        {navItems.map(({ label, page }) => (
          <Link href={page} key={label}>
            <a>{label}</a>
          </Link>
        ))}
      </Menu>
      <div className={styles.header}>
        <Head>
          <title>
            {titlePre ? `${titlePre} |` : ''} バナナの缶詰 | Canned
            Bananas　立花 冠/Kan Tachibana
          </title>
          <meta
            name="description"
            content="立花冠の個人サイト。SNSは基本的にやっておりませんので、私を知りたければこちらを参照していただけると幸いです。"
          />
          <meta name="og:title" content="バナナの缶詰 || Canned Bananas" />
          <meta property="og:image" content={ogImageReplace || ogImageUrl} />
          <meta name="twitter:site" content="@banakankan" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={ogImageReplace || ogImageUrl} />
          <link
            href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
            rel="stylesheet"
          ></link>
        </Head>

        <div className={styles.logo}>
          <a href="/blog">バナナの缶詰</a>
        </div>

        {/*
        <div className={styles.list}>
          {navItems.map(({ label, page, link }) => (
            <div key={label}>
              {page ? (
                <Link href={page}>
                  <a className={pathname === page ? 'active' : undefined}>
                    {label}
                  </a>
                </Link>
              ) : (
                  <ExtLink href={link}>{label}</ExtLink>
                )}
            </div>
          ))}
        </div>
              */}
      </div>
    </header>
  )
}
