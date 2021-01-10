import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/header'
import Twitter from '../components/twitter'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/twitter.module.css'

const tweets = [
  {
    username: null,
    accountName: null,
    userImage: null,
    date: null,
    content: null,
    image: null,
  },
]
export default () => (
  <div>
    <Header titlePre="Twitter" />
    <div className="container">
      <h1>Twitter</h1>

      <p>やっておりません。</p>

      <img
        src="/images/sejou_compressed.jpg"
        alt=""
        className={sharedStyles.img}
      />
    </div>
  </div>
)
