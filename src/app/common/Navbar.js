"use client";

import { usePathname } from "next/navigation";
import { Box, TextField, Badge, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from '@mui/icons-material/Search';
import { getUserDetails } from "../api/auth";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const user = getUserDetails();
  const dashboardData = useSelector((state) => state?.appUserReducer?.dashboardData);
  const balance = dashboardData?.data?.[0]?.currentBalance;
  const menu = useSelector((state) => state.appUserReducer.menu); 
  const pathname = usePathname();

  const isComponentPage = pathname.startsWith("/component/");

  return (
    <Box className={isComponentPage ? styles.header : styles.header1}>
      <Box className={isComponentPage ? styles.logoContainer : styles.logoContainer1}>
        <img
          src="/images/Codetrex_logo.png"
          alt="Codetrex Logo"
          className={styles.logo}
        />
      </Box>

      {isComponentPage ? (
        <>
          <Box className={styles.searchBox}>
            <TextField
              variant="outlined"
              placeholder="Search Here..."
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                position: "relative",
                color: "#666666",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#784800",
                  },
                },
              }}
            />
            <SearchIcon className={styles.searchIcon} />
          </Box>

          <Box className={styles.menuContainer}>
            {menu.map((item, index) => (
              <Box key={index} className={styles.menuItem}>
                <Typography
                  className={pathname === item.path ? styles.activeMenuItem : styles.menuItemText}
                >
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box className={styles.notifications}>
            <Badge badgeContent={3} color="error">
              <NotificationsNoneIcon
                sx={{ fontSize: "2rem", cursor: "pointer", color: "#666666" }}
              />
            </Badge>

            <Box className={styles.profile}>
              <Box>
                <Typography className={styles.profileName}>{user.userName}</Typography>
                <Typography className={styles.profileBalance}>Rs. {balance}</Typography>
              </Box>
              <Profile />
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  );
}