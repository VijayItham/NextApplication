
"use client"

import React from "react";
import { Box, } from "@mui/material";
import OutlinedCard from "./Card/Card";
import { useEffect } from "react";
import styles from "./DashBoard.module.css";
import Rightbar from "./RecentActivity/page";
import { isLoggedIn } from "@/app/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@/app/redux/AppUserSlice";
import { usePathname } from "next/navigation";

export default function DashBoard() {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.appUserReducer.dashboardData);

  let username = null;
  const userDetail = localStorage.getItem("userDetail");
  if (userDetail) {
      const parsedUserDetail = JSON.parse(userDetail);
      username = parsedUserDetail.userName; 
  } 

  useEffect(() => {
    if (username) {
      dispatch(getDashboard(username));
    }
  }, [dispatch, username])


  return (
   <>
      {/* Right Scrollable Section */}
      <Box
        className={styles.rightSection}
      >
        {isLoggedIn() && (
          <Box>
            <Box sx={{marginTop:"5px", textAlign:"center", marginRight:"8rem", fontSize:"25px"}}>{pathName.split('/').pop()}</Box>
            <Box className={styles.cardContainer}>
              <OutlinedCard />
            </Box>
            <Rightbar />
          </Box>
        )}
      </Box>
      </>
  );
}





