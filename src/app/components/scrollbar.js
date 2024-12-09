import React from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Navbar from "../ui/dashboard/navbar/page";
import OutlinedCard from "./card";
import GridViewIcon from '@mui/icons-material/GridView';
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

export default function Scrollbar() {
  const { enqueueSnackbar } = useSnackbar();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("");

  const data = [
    { icon: <PersonOutlineIcon />, detail: "Recharge" },
    { icon: <PersonOutlineIcon />, detail: "Bbps" },
    { icon: <PersonOutlineIcon />, detail: "Aeps" },
    { icon: <PersonOutlineIcon />, detail: "Upi Dmt" },
    { icon: <PersonOutlineIcon />, detail: "Fund Request" },
    { icon: <PersonOutlineIcon />, detail: "Pan Services" },
    { icon: <PersonOutlineIcon />, detail: "Payout" },
    { icon: <PersonOutlineIcon />, detail: "Wallet" },
    { icon: <PersonOutlineIcon />, detail: "Invoice" },
    { icon: <PersonOutlineIcon />, detail: "Report" },
    { icon: <PersonOutlineIcon />, detail: "Support" },
    { icon: <PersonOutlineIcon />, detail: "Payout" },
    { icon: <PersonOutlineIcon />, detail: "Wallet" },
    { icon: <PersonOutlineIcon />, detail: "Invoice" },
    { icon: <PersonOutlineIcon />, detail: "Report" },
    { icon: <PersonOutlineIcon />, detail: "Support" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleMenuClick = (detail) => {
    setSelectedMenu(detail);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        width: "100%",
        position: "relative",
        right: "1.8rem",
        zIndex:5

      }}
    >
      {/* Left Scrollable Section */}
      <Box
        sx={{
          width: "16vw",
          overflowY: "auto",
          bgcolor: "#FBF8F3",
          padding: 2,
          borderRight: "2px solid #EFDCBA"
        }}
      >

        <Box sx={{ display: "flex", alignItems: 'center', backgroundColor: "#FBF8F3", width: "150px", padding: "1rem", border: "1px solid #7848001A", borderRadius: "48px", backgroundColor: "#7848001A", marginTop: "3px", marginLeft: "2rem" }} >
          <GridViewIcon sx={{ marginLeft: "1rem" }} />
          <Box sx={{ marginLeft: "1rem", color: "#784800", fontFamily: "Montserrat" }} >Dashboard</Box>
        </Box>
        <Box sx={{ display: "flex", marginBottom: "10PX", marginTop: "19px" }}>
          <Typography variant="h6" gutterBottom sx={{ marginLeft: "3rem", color: "#666666", fontFamily: "Montserrat" }}>
            MENU
          </Typography>
          <KeyboardArrowUpIcon sx={{ marginLeft: "5.5rem", marginTop: "2px", color: "#666666" }} onClick={toggleMenu} />
        </Box>
        {isMenuOpen && data.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex", alignItems: "center", width: "130px", marginLeft: "2.5rem", cursor: "pointer", marginBottom: "1rem", backgroundColor: selectedMenu === item.detail ? "#784800" : "transparent", color: selectedMenu === item.detail ? "#FFFFFF" : "#333333", borderRadius: "41px", padding: "17px",
              "&:hover": {
                backgroundColor: selectedMenu === item.detail ? "#784800" : "#7848001A",
              },
            }}
            onClick={() => handleMenuClick(item.detail)}
          >
            <Box sx={{
              color: selectedMenu === item.detail ? "#FFFFFF" : "#333333",
            }}>
              {item.icon}
            </Box>
            <Typography variant="h6" sx={{ marginLeft: "1rem", color: "#333333", fontFamily: "Montserrat", fontSize: "16px", color: selectedMenu === item.detail ? "#FFFFFF" : "normal", }}>
              {item.detail}
            </Typography>
          </Box>
        ))}
      </Box>
       
   
      {/* Right Scrollable Section */}
      <Box
        sx={{
          width: "84vw",
          bgcolor: "#FBF8F3",
          height: "100vh"
        }}
      >
        <Navbar />

        <Box sx={{
          display: "flex", padding: 2,
          gap: 2
        }}>
          <OutlinedCard />
          <OutlinedCard />
          <OutlinedCard />
          <OutlinedCard />
          <OutlinedCard />
          <OutlinedCard />
        </Box>
      </Box>
    </Box>
  );
};

