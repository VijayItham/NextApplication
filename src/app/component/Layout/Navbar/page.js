"use client";
import styles from "./Navbar.module.css";
import {
  MdSearch,
  MdNotifications,
  MdOutlineChat,
  MdPublic,
} from "react-icons/md";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className={styles.container}>
        <div className={styles.title}>{pathName.split('/').pop()}</div>
        <div className={styles.menu}></div>
        <div className={styles.icons}>
            <MdOutlineChat size={20}/>
            <MdNotifications size={20}/>
            <MdPublic size={20}/>
        </div>
    </div>

  );
};

export default Navbar;
