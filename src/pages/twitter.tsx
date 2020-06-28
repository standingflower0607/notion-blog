import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="Twitter" />
    <div className="container">
      <h1>Twitter</h1>
      <p>Here is "my Twitter" 🤗, I don't have an account, though.</p>
    </div>
  </>
)
