
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
import Navbar from "../Layout/Navbar/page";


export default function DashBoard() {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.appUserReducer.dashboardData);
  console.log("dashboard----->",dashboardData)

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





