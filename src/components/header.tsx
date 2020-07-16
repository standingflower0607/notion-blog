import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Blog', page: '/blog' },
  { label: 'About', page: '/' },
  { label: 'Contact', page: '/contact' },
  { label: 'Me', page: '/me' },
]

const ogImageUrl = '/images/amekomi.jpg'

export default ({ titlePre = '', ogImageReplace = undefined }) => {
  const { pathname } = useRouter()

  return (
    <header>
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
        </Head>

        <div className={styles.icon}>
          <a href="/blog">バナナの缶詰</a>
        </div>
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
      </div>
    </header>
  )
}
