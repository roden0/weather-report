import { Outlet, Link } from "react-router";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} My App</p>
      </footer>
    </div>
  );
};

export default Layout;
