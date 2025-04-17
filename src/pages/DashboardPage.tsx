'use client';

import { useLanguage } from '../contexts/LanguageContext';
import Weather from '../components/weather/Weather';
import styles from './DashboardPage.module.scss';

const DashboardPage = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.dashboard}>
      <h1>{t('dashboard.title')}</h1>
      <p className={styles.welcome}>{t('dashboard.welcome')}</p>

      {/* Weather component */}
      <Weather />
    </div>
  );
};

export default DashboardPage;
