"use client";
import { Box } from "@mui/material";
import styles from "./Navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  return (
    <Box className={styles.header}>
      <Box className={styles.logoContainer}>
        <Image
         src="/images/Codetrex_logo.png"
         alt="Codetrex Logo"
         width={180}
         height={45}
        />
      </Box>
    </Box>
  );
}
