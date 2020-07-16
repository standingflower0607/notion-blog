import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import styles from '../styles/me.module.css'
import Section from '../components/section'

const sections = [
  {
    title: 'Background',
    details: 'レペゼン埼玉。体力はないです。',
  },
  {
    title: 'Favorites',
    details: 'ラジオとかお笑いが好きです。',
    link: 'https://www.notion.so/8953623c338544e99ba10d9b2e1302c6',
  },
  {
    title: 'Music',
    details:
      'HipHopが好きです。特に日本語ラップが好きです。17歳で聞いているということは一生聞くかもしれません。',
  },
  {
    title: 'Food',
    details: 'ネバネバしたものとか、コリコリしているものが基本的に好きです。',
    link: 'https://www.notion.so/49ace3283cb1499b9e00f37ff5d0d334',
  },
  {
    title: 'Essay',
    details:
      '自分の中で鬱憤がたまった時に書いているエッセイです。とても見せられるものではないですが、自分の人間性が出ているので紹介します。',
    link: 'https://www.notion.so/7b5ef33aaad94b11b3ecdba4b619655a',
  },
]

export default () => (
  <>
    <Header titlePre="Me" />

    <div className="container">
      <h1>立花 冠wiki</h1>
      <div className={styles.meWrapper}>
        {sections.map(({ title, details, link }) => {
          return <Section title={title} details={details} link={link} />
        })}
      </div>
    </div>
  </>
)
