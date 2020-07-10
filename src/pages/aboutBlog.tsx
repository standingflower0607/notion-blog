import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/aboutBlog.module.css'

export default () => (
  <div className={sharedStyles.index}>
    <div className="container">
      <div className={sharedStyles.details}>
        <h1>このブログについて</h1>
        <p>ブログのサムネイルについては、unsplashさんのところからきてます</p>
      </div>
    </div>
  </div>
)
