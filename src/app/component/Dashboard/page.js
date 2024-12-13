"use client";

import React from "react";
import { Box } from "@mui/material";
import OutlinedCard from "./Card/card";
import { useEffect } from "react";
import styles from './Dashboard.module.css'
import Rightbar from "./RecentActivity/page";
import { useDispatch } from "react-redux";
import { getDashboard } from "@/app/redux/AppUserSlice";
import { usePathname } from "next/navigation";
import { getUserDetails } from "../../api/authCookies";

export default function DashBoard() {
  const pathName = usePathname();
  const dispatch = useDispatch();

  const details = getUserDetails()
  const username = details?.userName??'';
  useEffect(() => {
    if (username) {
      dispatch(getDashboard(username));
    }
  }, [dispatch, username]);

  return (
    <>
      <Box className={styles.rightSection}>
        <Box>
          <Box
            sx={{
              marginTop: "5px",
              textAlign: "center",
              marginRight: "8rem",
              fontSize: "25px",
            }}
          >
            {pathName.split("/").pop()}
          </Box>
          <Box className={styles.cardContainer}>
            <OutlinedCard />
          </Box>
          <Rightbar />
        </Box>
      </Box>
    </>
  );
}
