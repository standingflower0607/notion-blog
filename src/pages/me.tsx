import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="Me" />
    <div className={sharedStyles.layout}>
      <h2>Do you want know more about me?</h2>
    </div>
  </>
)
