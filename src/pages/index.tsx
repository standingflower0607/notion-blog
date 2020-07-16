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
    <div className={sharedStyles.index}>
      <div className="container">
        <h1>About</h1>
        <img
          className={sharedStyles.img}
          src="/images/favicon.jpg"
          alt="画像"
        />
        <p>バナナの缶詰とは、立花冠の個人ブログです。</p>
        <p className="utsukushi-font">
          夢がないので、平等な機会を作りたいです。それが夢かもしれません。そして、自分がそれで幸せを感じれれば十分ですわ。
        </p>

        <h3>今の興味</h3>
        <p>テクノロジーの進歩と人間倫理</p>
      </div>
    </div>
  </>
)
