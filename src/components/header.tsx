import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
  { label: 'Contact', page: '/contact' },
  { label: 'Gallery', page: '/gallery' },
  { label: 'Instagram', page: '/instagram' },
  { label: 'Twitter', page: '/twitter' },
  { label: 'Me', page: '/me' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

export default ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Canned Bananas</title>
        <meta name="description" content="Kan Tachibana's Blog" />
        <meta name="og:title" content="Canned Bananas" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@banakankan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <div>
        <div className="icon">
          <a href="/">Canned Bananas</a>
        </div>
        <ul>
          {navItems.map(({ label, page, link }) => (
            <li key={label}>
              {page ? (
                <Link href={page}>
                  <a className={pathname === page ? 'active' : undefined}>
                    {label}
                  </a>
                </Link>
              ) : (
                <ExtLink href={link}>{label}</ExtLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
