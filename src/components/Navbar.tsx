import styles from '../styles/components/Navbar.module.css';

export function Navbar() {
  return (
    <div className={styles.navbar}>
      <header>
        <img src="/icons/logo-blue.png" alt="fokus logo"/>
      </header>

      <div className={styles.icons}>
        <button type="button">
          <img src="../icons/home.svg" alt="Home"/>
        </button>
        <button type="button">
          <img src="../icons/award.svg" alt="Ranking"/>
        </button>
      </div>
    </div>
  )
}