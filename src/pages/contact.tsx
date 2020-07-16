import Header from '../components/header'
import ExtLink from '../components/ext-link'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import contacts from '../../public/contacts'

import GitHub from '../components/svgs/github'
import Twitter from '../components/svgs/twitter'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'

export default () => (
  <>
    <Header titlePre="Contact" />
    <div className="container">
      <div className={sharedStyles.layout}>
        <h1>Contact</h1>
        <div className={contactStyles.avatar}>
          <img src="/images/for_insta.jpg" alt="" />
        </div>

        <div className={contactStyles.name}>Kan Tachibana</div>

        <div className={contactStyles.links}>
          {contacts.map(({ icon, link, alt }) => {
            return (
              <ExtLink key={link} href={link} aria-label={alt}>
                <i className={icon} />
              </ExtLink>
            )
          })}
        </div>
      </div>
    </div>
  </>
)
