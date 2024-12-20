"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./Sidebar.module.css";
import GridViewIcon from "@mui/icons-material/GridView";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getMenuByUserRole } from "@/app/redux/AppUserSlice";
import { useSelector, useDispatch } from "react-redux";
import MenuLink from "./MenuLink/page";
import { useRouter } from "next/navigation";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const response = useSelector((state) => state?.appUserReducer?.menu);
  const menu = response?.data;
  
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    dispatch(getMenuByUserRole());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMenuClick = (pageName) => {
    setSelectedMenu(pageName);
    router.push(`/pages/${pageName}`);
  };

  const navigateToDashboard = () => {
    router.push("/pages/Dashboard");
    setSelectedMenu("Dashboard");
  };

  return (
    <Box className={styles.leftSection}>
      <Box className={styles.menuItem}>
        <GridViewIcon sx={{ marginLeft: "1rem", color: "#784800" }} />
        <Box
          sx={{
            marginLeft: "1rem",
            color: "#784800",
            fontFamily: "Montserrat",
            cursor: "pointer",
            borderRadius: "41px",
            padding: "5px",
          }}
          onClick={navigateToDashboard}
        >
          Dashboard
        </Box>
      </Box>

      <Box sx={{ display: "flex", marginBottom: "10px", marginTop: "19px" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            marginLeft: "3rem",
            color: "#666666",
            fontFamily: "Montserrat",
          }}
        >
          MENU
        </Typography>
        <KeyboardArrowUpIcon
          sx={{
            marginLeft: "5.5rem",
            marginTop: "2px",
            color: "#666666",
            cursor: "pointer",
          }}
          onClick={toggleMenu}
        />
      </Box>

      {isMenuOpen &&
        menu?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "130px",
              marginLeft: "2.5rem",
              cursor: "pointer",
              marginBottom: "1rem",
              backgroundColor:
                selectedMenu === item?.pageName ? "#784800" : "transparent",
              borderRadius: "41px",
              padding: "17px",
              "&:hover": {
                backgroundColor:
                  selectedMenu === item?.pageName ? "#784800" : "#7848001A",
              },
            }}
            onClick={() => handleMenuClick(item?.pageName)}
          >
            <PermIdentityIcon
              sx={{
                fontSize: "1.5rem",
                color: selectedMenu === item?.pageName ? "white" : "#666666",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                marginLeft: "1rem",
                width: "8rem",
                fontFamily: "Montserrat",
                fontSize: "16px",
              }}
            >
              <MenuLink
                key={index}
                item={item || {}}
                selectedMenu={selectedMenu}
              />
            </Typography>
          </Box>
        ))}
    </Box>
  );
}
