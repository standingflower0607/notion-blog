import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/me.module.css'

export default () => (
  <>
    <Header titlePre="Me" />

    <div className="container">
      <h1>Do you want know more about me?</h1>
      <div className={sharedStyles.section}>
        <h3 className={sharedStyles.header}>Background</h3>
        <div className={sharedStyles.content}>
          <p>レペゼン埼玉</p>
        </div>
      </div>
      <div className={sharedStyles.section}>
        <h3 className={sharedStyles.header}>Favorites</h3>
        <div className={sharedStyles.content}>
          <p>ラジオを聞くのが好きです。</p>
          <p>オードリー, ハライチ, Creepy Nuts</p>
        </div>
      </div>
      <div className={sharedStyles.section}>
        <h3 className={sharedStyles.header}>Music</h3>
        <div className={sharedStyles.content}>
          <p>HipHopが好きです。特に日本語ラップが好きです。</p>
        </div>
      </div>
      <div className={sharedStyles.section}>
        <h3 className={sharedStyles.header}>Food</h3>
        <div className={sharedStyles.content}>
          <p>ねばねばしたものとか、コリコリしたものが好きです。</p>
        </div>
      </div>
    </div>
  </>
)
