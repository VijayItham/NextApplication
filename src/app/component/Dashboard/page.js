"use client";
import Card from "./Card/card";
import styles from "../Layout/layout.module.css";
import Rightbar from "./RecentActivity/page";
import { isLoggedIn } from "../../api/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  console.log('Dashboard')
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
    }
  });
  return (
    <div className={styles.wrapper}>
      {isLoggedIn() && (
        <div>
          <div className={styles.main}>
            <div className={styles.cards}>
              <Card />
              <Card />
              <Card />
            </div>
          </div>
          <div className={styles.side}>
            <Rightbar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
