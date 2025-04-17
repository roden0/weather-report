import { Outlet } from "react-router";
import Sidebar from "../navigation/Sidebar";
import TopBar from "../navigation/TopBar";
import styles from "./DashboardLayout.module.scss";

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar />
        <main className={styles.contentArea}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
