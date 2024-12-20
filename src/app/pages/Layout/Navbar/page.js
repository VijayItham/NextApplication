"use client";

import { usePathname } from "next/navigation";
import { Box, Avatar, TextField, Badge, Typography, Menu, MenuItem } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from '@mui/icons-material/Search';
import { getUserDetails } from "../../api/authCookies";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { doLogout } from '../../api/authCookies';
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const user = getUserDetails();
  const dashboardData = useSelector((state) => state?.appUserReducer?.dashboardData);
  const balance = dashboardData?.data?.[0]?.currentBalance;
  const response = useSelector((state) => state?.appUserReducer?.menu);
  const menu = response?.data;
  const pathname = usePathname();
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsBoxVisible(!isBoxVisible);
  };

  const handleSettings = () => {
    router.push("/pages/Settings");
  }

  const handleProfile = () => {
    router.push("/pages/UserProfile");
  }

  const closeBox = () => {
    setIsBoxVisible(false);
  };

  const handleLogout = () => {
    doLogout();
    router.push("/");
  }

  return (
    <Box className={styles.header}>
      <Box className={styles.logoContainer}>
        <Link href="/">
        <Image
          src="/images/Codetrex_logo.png"
          alt="Codetrex Logo"
          width={180}
          height={45}
        />
        </Link>
      </Box>
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
              width: "16rem",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#784800"
                 
                },
                "& input": {
                  position:"relative",
                  left:"2rem",
                 
                },

              },
              "& .MuiInputBase-input::placeholder": {
                color: "#666666",  
              },
            }}
          />
          <SearchIcon className={styles.searchIcon} />
        </Box>

        <Box className={styles.menuContainer}>
          {menu?.map((item, index) => (
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
          <a onClick={handleClick}>
            <Box className={styles.profile} component="form" >
              <Box>
                <Typography className={styles.profileName} >Hi, {user?.userName ?? ''}</Typography>
                <Typography className={styles.profileBalance}>Rs. {balance}</Typography>
              </Box>
              <Box
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar
                  alt="User Avatar"
                  src="/images/userProfile.png"
                  sx={{ width: 40, height: 40, cursor: "pointer" }}
                />

              </Box>
              {
                isBoxVisible &&
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{ mt: 1, zIndex:"10000" }}
                  onClick={closeBox}

                >
                  <MenuItem onClick={handleSettings} >
                    <SettingsIcon sx={{ color: "#666666", marginRight: 1 }} />
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleProfile} >
                    <PersonIcon sx={{ color: "#666666", marginRight: 1 }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ color: "#666666", marginRight: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              }
            </Box>
          </a>

        </Box>
      </>
    </Box>
  );
}
