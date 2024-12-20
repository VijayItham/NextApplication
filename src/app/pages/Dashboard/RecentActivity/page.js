"use client";

import styles from "./RecentActivity.module.css";
import { Box, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HistoryImg from "../../../../../public/images/historyImg";
import { IoCopyOutline } from "react-icons/io5";
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";
import { BsFiletypePdf } from "react-icons/bs";
import { PiPrinterLight } from "react-icons/pi";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestRecharge } from "@/app/redux/RechargeSlice";
import { getUserDetails } from "../../api/authCookies";
import "../../../globals.css";

const GetLatestRecharge = () => {
  const dispatch = useDispatch();
  const response = useSelector(
    (state) => state?.rechargeReducer?.getLatestRechargeData
  );
  const getData = response?.data;

  const details = getUserDetails();
  const username = details?.userName || [];

  useEffect(() => {
    dispatch(getLatestRecharge(username));
  }, [dispatch]);

  const dataHeaders = [
    "ID",
    "Operator",
    "Mobile No",
    "Amount (₹)",
    "Status",
    "Operator ID",
    "Type",
    "Recharge By",
    "Date Time",
  ];

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1.5px solid #ddd",
        }}
        pt={2}
        pr={3}
        pl={3}
        pb={1}
      >
        <h2 style={{ color: "#333333", letterSpacing: "0.03em" }}>
          {" "}
          Recent Recharges
        </h2>
        <span
          style={{
            color: "#784800",
            backgroundColor: "#7848001A",
            padding: "11px 15px",
            borderRadius: "25px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <HistoryImg />
          Recharge History
        </span>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1.5px solid #ddd",
        }}
      >
        <Box sx={{ display: "flex", position: "relative", right: "0.5rem" }}>
          <SearchIcon className={styles.searchIcon} />
          <TextField
            variant="outlined"
            placeholder="Search for records"
            fullWidth
            sx={{
              width: "289px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#784800",
                },
                "& input": {
                  position: "relative",
                  left: "2.5rem",
                },
              },
            }}
            margin="normal"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "18rem",
          }}
          pr={3}
        >
          <Typography variant="body1" style={{ color: "#666666" }}>
            MORE ACTIONS
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "9rem",
              color: "#666666",
              fontSize: "25px",
            }}
          >
            <IoCopyOutline />
            <PiMicrosoftExcelLogoLight />
            <BsFiletypePdf />
            <PiPrinterLight />
            <BsFiletypeCsv />
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        gap={5}
        pl={3}
        pr={3}
        pt={2}
        borderBottom="1.5px solid #ddd"
      >
        {dataHeaders.map((item, idx) => (
          <Box key={idx}>
            <Typography variant="h6" gutterBottom color="#333333">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginBottom: "40px" }}>
        {getData?.map((item) => (
          <Box
            key={item.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: "9px 26px",
              borderBottom: "1.5px solid #ddd",
            }}
          >
            <Typography variant="body1" style={{ color: "#333333" }}>
              {item.id}
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#333333", position: "relative", right: "30px" }}
            >
              {item.operatorName}
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#333333", position: "relative", right: "60px" }}
            >
              {item.mobileNo}
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#333333", position: "relative", right: "5rem" }}
            >
              {item.amount}
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: item.status === "Success" ? "#1CAC52" : "#EF4C19",
                backgroundColor:
                  item.status === "Success" ? "#1CAC521A" : "#EF4C191A",
                padding: "3px 18px",
                borderRadius: "20px",
                position: "relative",
                right: "6.2rem",
              }}
            >
              {item.status}
            </Typography>

            <Typography variant="body1" style={{ color: "#333333" }}>
              {item.createdBy || "N/A"}
            </Typography>
            <Typography variant="body1" style={{ color: "#333333" }}>
            <CiGlobe style={{ fontSize: 25 }}/>
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "#333333",
                textAlign: "center",
                marginRight: "10px",
              }}
            >
              {new Date(item.createdDate).toLocaleDateString()}
              <br />
              <span style={{ fontSize: "0.875rem", color: "#666666" }}>
                {new Date(item.createdDate).toLocaleTimeString()}
              </span>
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GetLatestRecharge;
