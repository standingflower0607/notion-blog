import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="About" />
    <div className="container">
      <div className={sharedStyles.index}>
        <h1>About</h1>
        <img
          className={sharedStyles.img}
          src="/images/favicon.jpg"
          alt="画像"
        />
        <p>バナナの缶詰とは、城華暖のブログでございます。</p>
      
        <p>
          サムネイルなどに関しては、
          <a href="https://burst.shopify.com/">burst</a>
          などの写真を使わせていただいております。
        </p>
      </div>
    </div>
  </>
)
