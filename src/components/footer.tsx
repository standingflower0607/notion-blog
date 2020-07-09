import ExtLink from './ext-link'
import Link from 'next/link'
import styles from '../styles/footer.module.css'

export default () => (
  <>
    <footer className={styles.footer}>
      <Link href={'/aboutBlog'}>このブログについて</Link>
      <p>&copy; Canned Bananas 2020 / 🧍🏻‍♀+ 🌸+ 👑 = 🍌</p>
    </footer>
  </>
)
