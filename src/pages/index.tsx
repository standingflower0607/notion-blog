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
    <div className="container">
      <div className={sharedStyles.index}>
        <h1>About</h1>
        <img
          className={sharedStyles.img}
          src="/images/favicon.jpg"
          alt="画像"
        />
        <p>バナナの缶詰とは、立花冠の個人ブログです。</p>
        <p style={{ textAlign: 'left' }}>
          人間同士のコミュニケーションは良くも悪くも周りによって決定されるモノだと思います。それが、SNSによって360度、どの方向からもみられてることによって、その決定要因が増えすぎて息苦しくなっているのが今だと思います。
          また、さらにいつでもどこでも自分以外の人に発信できることで思考力の低下にも繋がっていると思います
          そこで、僕はSNSから離れ、自分の中で反芻したうえ、もしくは言語化するためにブログというメディアでひっそりと自分を発信しようと思います。
        </p>
        <p>
          サムネイルなどに関しては、
          <a href="https://burst.shopify.com/">burst</a>
          などの写真を使わせていただいております。
        </p>
      </div>
    </div>
  </>
)
