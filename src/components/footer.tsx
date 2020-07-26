import ExtLink from './ext-link'
import Link from 'next/link'
import styles from '../styles/footer.module.css'

export default () => (
  <>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerRight}>
          <div className={styles.footerProfile}></div>
        </div>
        <div className={styles.footerLeft}>
          <div className={styles.footerCategory}></div>
          <div className={styles.footerLink}></div>
        </div>
      </div>
      <hr />
      <p>&copy; Canned Bananas 2020 / 🧍🏻‍♀ + 🌸 + 👑 = 🍌 </p>
      <p>
        Powerd by <a href="https://github.com/ijjk/notion-blog">Notion-blog</a>
      </p>
    </footer>
  </>
)
