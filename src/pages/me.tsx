import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/me.module.css'
import Section from '../components/section'

const sections = [
  {
    title: 'Background',
    details: 'レペゼン埼玉',
  },
  {
    title: 'Favorites',
    details: 'ラジオとかお笑いが好きです。',
    link: 'https://www.notion.so/8953623c338544e99ba10d9b2e1302c6',
    link_title: '現在進行形List',
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
    link_title: '好きな食べ物List',
  },
  {
    title: 'Essay',
    details:
      '自分の中で鬱憤がたまった時に書いているエッセイです。とても見せられるものではないですが、自分の人間性が出ているので紹介します。',
    link: 'https://www.notion.so/7b5ef33aaad94b11b3ecdba4b619655a',
    link_title: 'エッセイList',
  },
]

export default () => (
  <>
    <Header titlePre="Me" />

    <div className="container">
      <h1>Do you want know more about me?</h1>
      {sections.map(({ title, details, link, link_title }) => {
        return (
          <Section
            title={title}
            details={details}
            link={link}
            link_title={link_title}
          />
        )
      })}
    </div>
  </>
)
