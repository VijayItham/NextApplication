"use client";
import { Box } from "@mui/material";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <Box className={styles.header}>
      <Box className={styles.logoContainer}>
        <img
          src="/images/Codetrex_logo.png"
          alt="Codetrex Logo"
          className={styles.logo}
        />
      </Box>
    </Box>
  );
}
