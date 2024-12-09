"use client";

import { usePathname } from "next/navigation";
import { Box, TextField, Badge, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from '@mui/icons-material/Search';
import Profile from "./profile";

export default function Header() {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  if (isDashboard) {
    return (
      <Box
        sx={{
          backgroundColor: "#fcf8f4",
          padding: "18px",
          border: "2px solid #EFDCBA",
          width: "100vw",
          overflowX: "hidden",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",  
        }}
      >
        {/* logo */}
        <Box sx={{ display: "flex", alignItems: "center", flex: "1 1 auto", mb: { xs: 2, sm: 0 } }}>
          <img
            src="/images/Codetrex_logo.png"
            alt="Codetrex Logo"
            style={{ width: "11rem" }}
          />
        </Box>

        {/* Search Box */}
        <Box sx={{
          flexGrow: 1,
          mx: 7,
          display: { xs: "none", sm: "block" }, 
          position: "relative"
        }}>
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
          <SearchIcon sx={{ color: "#666666", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
        </Box>

        {/* Notifications and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px", marginRight: "3rem" }}>
          <Badge badgeContent={3} color="error">
            <NotificationsNoneIcon
              sx={{ fontSize: "2rem", cursor: "pointer", color: "#666666" }}
            />
          </Badge>

          {/* Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "1rem", backgroundColor: "#784800", padding: "3px", borderRadius: "30px" }}>
            <Box>
              <Typography sx={{ color: "#FFFFFF", marginLeft: "13px" }}>Hi! Deepak</Typography>
              <Typography sx={{ color: "#FFFFFF", fontSize: "14px", marginLeft: "14px" }}>Rs. 9811.23</Typography>
            </Box>
            <Profile />
          </Box>
        </Box>
      </Box>
    );
  }

  // Only show navbar with logo
  return (
    <Box
      sx={{
        backgroundColor: "#fcf8f4",
        padding: "18px",
        border: "2px solid #EFDCBA",
        width: "100vw",
        overflowX: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <img
          src="/images/Codetrex_logo.png"
          alt="Codetrex Logo"
          style={{ width: "11rem" }}
        />
      </Box>
    </Box>
  );
}
