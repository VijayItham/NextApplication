"use client";

"use client";

import Link from "next/link";
import styles from './MenuLink.module.css';

const MenuLink = ({ item = {}, selectedMenu }) => {
  const { pageName = "", menuName = "" } = item;

  return (
    <Link
      href={pageName || "/"}
      className={styles.link}
      style={{
        color: selectedMenu === pageName ? "#FFFFFF" : "#333333",
      }}
    >
      {menuName || "Untitled"}
    </Link>
  );
};

export default MenuLink;
