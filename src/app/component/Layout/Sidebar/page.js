"use client";

import { useEffect, useState } from "react";
import { Box , Typography} from "@mui/material";
import styles from "./Sidebar.module.css";
import GridViewIcon from '@mui/icons-material/GridView';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getMenuByUserRole } from "@/app/redux/AppUserSlice";
import {useSelector, useDispatch } from "react-redux";

export default function Sidebar(){
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.appUserReducer.menu);
  console.log("menu",menu)
  console.log(menu)
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("");

  let username = null;
  const userDetail = localStorage.getItem("userDetail");
  if (userDetail) {
      const parsedUserDetail = JSON.parse(userDetail);
      username = parsedUserDetail.userName; 
  } else {
      console.log("No user detail found in localStorage.");
  }

  console.log(username);

  useEffect(() => {
    if (username) {
      dispatch(getMenuByUserRole(username));
    }
  }, [dispatch, username])

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  return (
    <Box
    className = {styles.leftSection}
  >

    <Box className={styles.menuItem} >
      <GridViewIcon sx={{ marginLeft: "1rem" }} />
      <Box sx={{ marginLeft: "1rem", color: "#784800", fontFamily: "Montserrat", cursor:"pointer" }} >Dashboard</Box>
    </Box>
    <Box sx={{ display: "flex", marginBottom: "10PX", marginTop: "19px" }}>
      <Typography variant="h6" gutterBottom sx={{ marginLeft: "3rem", color: "#666666", fontFamily: "Montserrat" }}>
        MENU
      </Typography>
      <KeyboardArrowUpIcon sx={{ marginLeft: "5.5rem", marginTop: "2px", color: "#666666" , cursor:"pointer"}} onClick={toggleMenu} />
    </Box>
    {isMenuOpen && menu.map((item, index) => (
      <Box
        key={index}
        sx={{
          display: "flex", alignItems: "center", width: "130px", marginLeft: "2.5rem", cursor: "pointer", marginBottom: "1rem", backgroundColor: selectedMenu === item.menuName ? "#784800" : "transparent", color: selectedMenu === item.menuName ? "#FFFFFF" : "#333333", borderRadius: "41px", padding: "17px",
          "&:hover": {
            backgroundColor: selectedMenu === item.menuName ? "#784800" : "#7848001A",
          },
        }}
        onClick={() => handleMenuClick(item.menuName)}
      >
        <Box sx={{
          color: selectedMenu === item.menuName ? "#FFFFFF" : "#333333",
        }}>
          {item.icon}
        </Box>
        <Typography variant="h6" sx={{ marginLeft: "1rem", width:"8rem", color: "#333333", fontFamily: "Montserrat", fontSize: "16px", color: selectedMenu === item.menuName ? "#FFFFFF" : "normal", }}>
          {item.menuName}
        </Typography>
      </Box>
    ))}
  </Box>
  );
};


