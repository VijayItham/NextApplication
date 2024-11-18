"use client"
import Sidebar from "../ui/dashboard/sidebar/page"
import Navbar from "../ui/dashboard/navbar/page"
import styles from '../ui/dashboard/dashboard.module.css'
import Footer from "../ui/dashboard/footer/footer"
import { isLoggedIn } from "../common/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const layout=({children})=>{
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
                <Footer/>
            </div>
        </div>
    )
}

export default layout