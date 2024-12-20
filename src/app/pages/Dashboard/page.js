"use client";

import React from "react";
import { Box } from "@mui/material";
import OutlinedCard from "./Card/card";
import { useEffect } from "react";
import styles from "./Dashboard.module.css";
import { useDispatch } from "react-redux";
import { getDashboard } from "@/app/redux/AppUserSlice";
import { getUserDetails } from "../api/authCookies";
import "../../globals.css";
import GetLatestRecharge from "./RecentActivity/page";

export default function DashBoard() {
  const dispatch = useDispatch();

  const details = getUserDetails();
  const username = details?.userName ?? "";
  useEffect(() => {
    if (username) {
      dispatch(getDashboard(username));
    }
  }, [dispatch, username]);

  return (
    <>
      <Box className={styles.rightSection}>
        <Box className={styles.cardContainer}>
          <OutlinedCard />
        </Box>
        <GetLatestRecharge />
      </Box>
    </>
  );
}
