import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <div className={sharedStyles.index}>
    <Header titlePre="Home" />
    <div className="container">
      <img className={sharedStyles.img} src="/images/amekomi.jpg" alt="画像" />
      <h1 className="utsukushi-font">Kan Tachibana / 立花 冠</h1>
      <p className="utsukushi-font">
        夢がないので、平等な機会を作りたいです。それが夢かもしれません。そして、自分がそれで幸せを感じれれば十分ですわ。
      </p>

      <h4>今の興味</h4>
      <p>テクノロジーの進歩と人間倫理</p>
    </div>
  </div>
)
