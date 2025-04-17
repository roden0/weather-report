"use client";

import { MdLogout, MdLanguage } from "react-icons/md";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./TopBar.module.scss";

const TopBar = () => {
  const { logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.title}>
        <h1>Admin Dashboard</h1>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.languageButton}
          onClick={toggleLanguage}
          title={t("topbar.language")}
        >
          <MdLanguage size={20} />
          <span>{language.toUpperCase()}</span>
        </button>
        <button
          type="button"
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          <MdLogout size={20} />
          <span>{t("topbar.logout")}</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
