"use client";
import styles from "./Navbar.module.css";
import {
  MdSearch,
  MdNotifications,
  MdOutlineChat,
  MdPublic,
} from "react-icons/md";
import { isLoggedIn } from "../../../api/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/"); // Redirect to the login page
    }
  },[router]);
  return (
    <>
    {isLoggedIn() && (
        <div className={styles.container}>
          <div className={styles.title}>{pathName.split("/").pop()}</div>
          <div className={styles.menu}></div>
          <div className={styles.icons}>
            <MdOutlineChat size={20} />
            <MdNotifications size={20} />
            <MdPublic size={20} />
          </div>
        </div>
    )}
    </>
  );
};

export default Navbar;
