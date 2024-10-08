import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          Designed and Developed By Nicholas Romano 2024
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
