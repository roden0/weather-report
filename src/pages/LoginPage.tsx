'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useLogin } from '../hooks/useLogin';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const { t } = useLanguage();
  const { email, password, error, isLoading, setEmail, setPassword, handleSubmit } = useLogin();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1>{t('login.title')}</h1>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">{t('login.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">{t('login.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? t('login.loading') : t('login.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
