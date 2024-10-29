"use client";
import Card from "../ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css";
import Chart from "../ui/dashboard/chart/chart";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import { isLoggedIn } from "../common/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const dashboard = () => {
  const router = useRouter();
  console.log("asd", isLoggedIn());
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
            <Chart />
          </div>
          <div className={styles.side}>
            <Rightbar />
          </div>
        </div>
      )}
    </div>
  );
};

export default dashboard;
