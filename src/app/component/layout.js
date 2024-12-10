"use client";
import Sidebar from "./Layout/Sidebar/page";
import Navbar from "./Layout/Navbar/page";
import styles from "./Layout/Layout.module.css";
import Footer from "./Layout/Footer/page";
import { isLoggedIn } from "../api/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
    }
  });
  return (
    <>x
      {isLoggedIn() && (
        <div className={styles.container}>
          <div className={styles.menu}>
            <Sidebar />
          </div>
          <div className={styles.content}>
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
