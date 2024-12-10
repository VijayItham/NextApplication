"use client";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <div className={styles.container}>
        <div className={styles.title}>{pathName.split('/').pop()}</div>
    </div>
  );
};





