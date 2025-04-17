'use client';

import { NavLink } from 'react-router';
import { MdDashboard, MdEmail } from 'react-icons/md';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { t } = useLanguage();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>App</h2>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              <MdDashboard size={20} />
              <span>{t('nav.dashboard')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/contact"
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              <MdEmail size={20} />
              <span>{t('nav.contact')}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
