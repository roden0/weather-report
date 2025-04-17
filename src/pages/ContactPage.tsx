'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useContactForm } from '../hooks/useContactForm';
import styles from './ContactPage.module.scss';

const ContactPage = () => {
  const { t } = useLanguage();
  const { formData, errors, submitted, handleChange, handleSubmit } = useContactForm();

  return (
    <div className={styles.contactPage}>
      <h1>{t('contact.title')}</h1>

      {submitted && <div className={styles.success}>{t('contact.success')}</div>}

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">{t('contact.name')} *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? styles.inputError : ''}
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dateOfBirth">{t('contact.dateOfBirth')} *</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={errors.dateOfBirth ? styles.inputError : ''}
            max={new Date().toISOString().split('T')[0]} // Prevent future dates
          />
          {errors.dateOfBirth && <span className={styles.errorMessage}>{errors.dateOfBirth}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="city">{t('contact.city')} *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? styles.inputError : ''}
          />
          {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">{t('contact.email')} *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">{t('contact.phone')} *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            className={errors.phone ? styles.inputError : ''}
          />
          {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
        </div>

        <div className={styles.formFooter}>
          <p className={styles.requiredFields}>{t('contact.requiredFields')}</p>
          <button type="submit" className={styles.submitButton}>
            {t('contact.submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
