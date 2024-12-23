"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { updatePassword } from "@/app/redux/AppUserSlice";
import styles from "./UpdatePassword.module.css";
import { useSelector } from "react-redux";

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const username = useSelector((state) => state?.appUserReducer?.userDetail);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match. Please try again.", {
        variant: "error",
        autoHideDuration: 3000,
      });

      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      setLoading(true);
      const result = await dispatch(
        updatePassword({ username, otp, password })
      ).unwrap();

      if (result?.statusCode === 200) {
        enqueueSnackbar("Password updated successfully!", {
          variant: "success",
          autoHideDuration: 3000,
        });
        setPassword("");
        setConfirmPassword("");
        router.push("/login/UpdatePasswordSuccess");
      } else {
        enqueueSnackbar("Failed to update password.", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className={styles.container}>
        <Box
          component="img"
          src="/images/boy.svg"
          alt="Boy Illustration"
          className={styles.leftImg}
        />
        <Box className={styles.box}>
          <Box className={styles.arrowBox} onClick={handleGoHome}>
            <ArrowBackIcon className={styles.arrowIcon} />
          </Box>
          <Box className={styles.content}>
            <Typography variant="h4" component="h3" className={styles.title}>
              Password reset?
            </Typography>
            <Typography className={styles.description}>
              Enter your OTP and create your password
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="otp"
                placeholder="Enter OTP"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="h6">@</Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: "1rem",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#784800",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                placeholder="Password"
                name="password"
                className={styles.textField}
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="h6" component="span">
                        @
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: "1rem",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#784800",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                className={styles.textField}
                placeholder="Confirm Password"
                id="confirmPassword"
                autoComplete="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="h6" component="span">
                        @
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: "1rem",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#784800",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading || password !== confirmPassword}
                className={styles.submitBtn}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          component="img"
          src="/images/girl.svg"
          alt="Girl Illustration"
          className={styles.rightImg}
        />
      </Box>
    </>
  );
}
