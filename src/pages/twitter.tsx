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
  <>
    <Header titlePre="Twitter" />
    <div className="container">
      <h1>Twitter</h1>

      <p>Here is "my Twitter" 🤗, I don't have an account, though.</p>
      <div>
        <img src="/images/sejou.png" alt="" />
      </div>
      <div className={sharedStyles.feed}>
        <p>B : ....</p>
        <p>
          A : Oh, for real? It means it exploit our spare time and sell it to
          advertiser, right?
        </p>
        <p>B : What are you saying? It's totally free.</p>
        <p>A : So, How much does it cost?</p>
        <p>B : Sure, You can keep up with current events.</p>
        <p>A : Is there any merits to use Twitter ?</p>
      </div>
    </div>
  </>
)
