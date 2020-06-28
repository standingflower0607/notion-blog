import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/header'
import ExtLink from '../../components/ext-link'
import Features from '../../components/features'
import GitHub from '../../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

import React from 'react'
import { render } from 'react-dom'
import Gallery from 'react-photo-gallery'
import photos from '../../../public/photos'

export default () => (
  <>
    <Header titlePre="Instagram" />
    <div className="container">
      <h1>Instagram</h1>
      <p>Here is "my Instagram" 😎</p>
      <Gallery photos={photos} />
    </div>
  </>
)
