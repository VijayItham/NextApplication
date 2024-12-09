"use client"
import Sidebar from "./Layout/Sidebar/page"
import Navbar from "./Layout/Navbar/page"
import styles from './Layout/Layout.module.css'
import { isLoggedIn } from "../api/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({children}){
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn()) {
          router.push("/");
        }
      });
      
    return(
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar/>
            </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
            </div>
        </div>
    )
}

