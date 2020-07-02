import Header from '../components/header'
import ExtLink from '../components/ext-link'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHub from '../components/svgs/github'
import Twitter from '../components/svgs/twitter'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'

const contacts = [
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/standingflower0607',
  },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: 'mailto:tachibanaa1211@gmail.com?subject=hello',
  },
]

export default () => (
  <>
    <Header titlePre="Contact" />
    <div className="container">
      <div className={sharedStyles.layout}>
        <div className={contactStyles.avatar}></div>

        <h1>Contact</h1>

        <img src="/images/for_insta.jpg" alt="" />

        <div className={contactStyles.name}>Kan Tachibana</div>

        <div className={contactStyles.links}>
          {contacts.map(({ Comp, link, alt }) => {
            return (
              <ExtLink key={link} href={link} aria-label={alt}>
                <Comp height={32} />
              </ExtLink>
            )
          })}
        </div>
      </div>
    </div>
  </>
)
