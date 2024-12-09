"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { forgotPassword, verifyOtp } from "@/app/redux/AppUserSlice";
import styles from "./ForgotPin.module.css";

export default function ForgotPin() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const userDetail = localStorage.getItem("userDetail");
  console.log(userDetail);
  
  const username = JSON.parse(userDetail || "{}")?.userName;
  console.log(username);
  

  const handleGoHome = () => router.push("/");

  const handleForgotPin = async (e) => {
    
    e.preventDefault();

    try {
      setLoading(true);
      const result = await dispatch(forgotPassword(username)).unwrap();

      if (result?.statusCode === 200) {
        enqueueSnackbar("OTP sent successfully. Check your email.", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
        setEmailSent(true);
      } else {
        enqueueSnackbar(result?.message || "Error sending OTP.", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    } catch (error) {
      console.error("ForgotPin Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      enqueueSnackbar("Please enter the OTP.", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      return;
    }

    try {
      setLoading(true);
      const result = await dispatch(verifyOtp({ username, otp })).unwrap();

      if (result?.statusCode === 200) {
        enqueueSnackbar("OTP verified successfully.", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
        router.push("/login/UpdatePin");
      } else {
        enqueueSnackbar(result?.message || "Invalid OTP.", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    } catch (error) {
      console.error("VerifyOtp Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      {/* Left Image */}
      <Box
        component="img"
        src="/images/boy.svg"
        alt="Boy Illustration"
        className={styles.leftImg}
      />

      {/* Form Container */}
      <Box className={styles.formContainer}>
        <Box className={styles.arrowBox} onClick={handleGoHome}>
          <ArrowBackIcon className={styles.arrowIcon} />
        </Box>

        <Box className={styles.content}>
          <Typography variant="h4" className={styles.title}>
            {emailSent ? "Verify OTP?" : "Forgot Pin?"}
          </Typography>
          <Typography className={styles.description}>
            {emailSent
              ? "Enter your OTP to verify your identity."
              : "Enter your email to receive instructions."}
          </Typography>

          <Box
            component="form"
            onSubmit={emailSent ? handleVerifyOtp : handleForgotPin}
            className={styles.inputField}
          >
            {!emailSent && (
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: "1rem",
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#784800",
                  },
                }}
              />
            )}

            {emailSent && (
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: "1rem",
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#784800",
                  },
                }}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : emailSent ? "Verify OTP" : "Send Me"}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Right Image */}
      <Box
        component="img"
        src="/images/girl.svg"
        alt="Girl Illustration"
        className={styles.rightImg}
      />
    </Box>
  );
}
