import ExtLink from './ext-link'
import Link from 'next/link'
import styles from '../styles/footer.module.css'

export default () => (
  <>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerRight}>
          <div className={styles.footerProfile}>
            <img src="/images/for_insta.jpg" alt="" />
          </div>
        </div>
        <div className={styles.footerLeft}>
          <div className={styles.footerCategory}>
            <h3>Cagegory</h3>
          </div>
          <div className={styles.footerLink}>
            <h3>Link</h3>
          </div>
        </div>
      </div>
      <hr />
      <p>&copy; Canned Bananas 2020 / 🧍🏻‍♀ + 🌸 + 👑 = 🍌 </p>
    </footer>
  </>
)
