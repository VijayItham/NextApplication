"use client";

import Sidebar from "./Layout/Sidebar/page";
import Navbar from "./Layout/Navbar/page";
import styles from "./Layout/Layout.module.css";
import MenuNavbar from "../common/MenuNavbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Navbar />
          <MenuNavbar/>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
