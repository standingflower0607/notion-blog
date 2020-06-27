import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="Home" />
    <div className={sharedStyles.layout}>
      <img
        src="/zeit-and-notion.png"
        height="85"
        width="250"
        alt="Vercel + Notion"
      />
      <h1>🧍🏻‍♀+ 🌸+ 👑 = 🍌</h1>
      <h1>Canned Bananas</h1>
      <h2>Kan Tachibana</h2>

      <div className="explanation">
        <p>高校生やってます。</p>

      </div>
    </div>
  </>
)
