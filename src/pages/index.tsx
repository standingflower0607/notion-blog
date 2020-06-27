import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="Home" />
    <div className="container">
      <h1 className="hanko-font">Canned Bananas</h1>
      <h2>Kan Tachibana / 立花 冠</h2>
      <p>
        夢がないので、平等な機会を作りたいです。それが夢かもしれません。そして、自分がそれで幸せを感じれれば十分ですわ。
      </p>
      <p className="dinosaur-font">ABCDEFGHJK</p>

      <h4>今の興味</h4>
      <p>テクノロジーの進歩と人間倫理</p>
    </div>
  </>
)
