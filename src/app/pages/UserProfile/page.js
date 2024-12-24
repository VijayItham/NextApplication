"use client";
import * as React from "react";
import { Box } from "@mui/material";
import styles from "./UserProfile.module.css";
import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputAdornment from "@mui/material/InputAdornment";
import { getUserDetails } from "../api/authCookies";
import { updatePassword } from "@/app/redux/AppUserSlice";
import LoadingSpinner from "@/app/common/Loading";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/app/redux/AppUserSlice";
import { useRouter } from "next/navigation";
import "../../globals.css";

export default function UserProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState("1");
  const [userName, setUserName] = useState("");
  const [details, setDetails] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const userDetails = getUserDetails();
    setDetails(userDetails);
  }, []);

  if (!details) {
    return (
      <Typography>
        <LoadingSpinner />
      </Typography>
    );
  }

  const username = details.userName || "";

  const inputStyles = {
    marginBottom: "1rem",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#784800",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  };

  const handleTabList = (event, newValue) => {
    setValue(newValue);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleGetOtp = async () => {
    if (!userName.trim()) {
      enqueueSnackbar("Please enter a valid username.", { variant: "error" });
      return;
    }

    try {
      setLoading(true);
      const result = await dispatch(forgotPassword(userName)).unwrap();

      if (result?.statusCode === 200) {
        enqueueSnackbar("OTP sent successfully. Check your email.", {
          variant: "success",
          autoHideDuration: 1000,
        });
        setOtpSent(true);
      } else {
        enqueueSnackbar(result?.message || "Error sending OTP.", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }
    } catch (error) {
      console.error("Error sending OTP: ", error);
      enqueueSnackbar("An error occurred while sending OTP. Try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("New passwords do not match.", { variant: "error" });
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (!otp.trim()) {
      enqueueSnackbar("Please enter the OTP.", { variant: "error" });
      return;
    }

    setLoading(true);

    try {
      const result = await dispatch(
        updatePassword({ username: userName, otp, password })
      ).unwrap();

      if (result?.statusCode === 200) {
        enqueueSnackbar("Password updated successfully.", {
          variant: "success",
          autoHideDuration: 1000,
          style: { backgroundColor: "#4caf50", color: "#fff" },
        });
        setOtp("");
        setPassword("");
        setConfirmPassword("");
        setOtpSent(false);
        router.push("/pages/Dashboard");
      }
    } catch (error) {
      console.error("Error updating password: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      <TabContext value={value}>
        <Box className={styles.tabBox}>
          <TabList
            onChange={handleTabList}
            sx={{
              width: "43vw",
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab
              label="User Details"
              value="1"
              sx={{
                "&.Mui-selected": {
                  color: "#784800",
                  borderBottom: "1px solid #784800",
                },
              }}
            />
            <Tab
              label="Update Password"
              value="2"
              sx={{
                marginLeft: "10rem",
                "&.Mui-selected": {
                  color: "#784800",
                  borderBottom: "1px solid #784800",
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{ marginTop: "4rem", width: "33vw", marginLeft: "7.5rem" }}>
            <Box className={styles.content}>
              <Typography variant="h5" mb={4} className={styles.title}>
                UserDetails
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      User Name:
                    </Typography>
                    <Typography variant="body1">{username}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      First Name:
                    </Typography>
                    <Typography variant="body1">
                      {details?.firstName ?? ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Last Name:
                    </Typography>
                    <Typography variant="body1">
                      {details?.lastName ?? ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Email:
                    </Typography>
                    <Typography variant="body1">
                      {details?.email ?? ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Phone Number:
                    </Typography>
                    <Typography variant="body1">
                      {details?.phoneNumber ?? ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Address:
                    </Typography>
                    <Typography variant="body1">
                      {details?.address1 ?? ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Country:
                    </Typography>
                    <Typography variant="body1">
                      {details?.countryName ?? ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      State:
                    </Typography>
                    <Typography variant="body1">
                      {details?.stateName ?? ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      City:
                    </Typography>
                    <Typography variant="body1">
                      {details?.cityName ?? ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Zip Code:
                    </Typography>
                    <Typography variant="body1">
                      {details?.zipCode ?? ""}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box className={styles.box}>
            <Box sx={{ width: "30vw" }}>
              <Box className={styles.content1}>
                <Typography
                  variant="h4"
                  component="h3"
                  className={styles.title}
                >
                  Change Password ?
                </Typography>
                <Typography className={styles.description}>
                  {!otpSent
                    ? "Enter your userName"
                    : "Enter your Otp and create New Password"}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {!otpSent && (
                    <>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        placeholder="UserName"
                        name="username"
                        className={styles.textField}
                        autoFocus
                        value={userName}
                        onChange={handleUsername}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Typography variant="h6" component="span">
                                {"@"}
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                      <Button
                        variant="contained"
                        onClick={handleGetOtp}
                        className={styles.submitBtn}
                      >
                        {loading ? <CircularProgress size={24} /> : "Get OTp"}
                      </Button>
                    </>
                  )}
                  {otpSent && (
                    <>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={handleOtp}
                        sx={inputStyles}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        className={styles.textField}
                        placeholder="New Password"
                        value={password}
                        onChange={handlePassword}
                        sx={inputStyles}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        className={styles.textField}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        sx={inputStyles}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        onClick={handleSubmit}
                        className={styles.submitBtn}
                      >
                        {loading ? <CircularProgress size={24} /> : "Submit"}
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
