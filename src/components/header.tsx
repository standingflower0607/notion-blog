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

const ogImageUrl = '/images/amekomi.jpg'
const profileImage = '/images/for_insta_compressed.jpg'

export default ({ titlePre = '', ogImageReplace = undefined }) => {
  const { pathname } = useRouter()

  return (
    <header>
      <Menu right>
        <div className={styles.sideProfile}>
          <img src={profileImage} alt="わい" />
          <div>
            <p>たちばな　かん</p>
            <div>
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
        {navItems.map(({ label, page, link }) => (
          <div key={label}>
            {page ? (
              <Link href={page}>{label}</Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </div>
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

        <div className={styles.icon}>
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
