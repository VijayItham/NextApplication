"use client";

import {
  Box,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { brown } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { fetchUserLogin } from "../redux/AppUserSlice";
import styles from "./Login.module.css";
import "../../app/globals.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await dispatch(
        fetchUserLogin({ userName, password })
      ).unwrap();

      if (result?.data[0]?.hasPin === "True") {
        router.push("/login/VerifyPin");
      } else if (result?.data[0]?.hasPin === "False") {
        router.push("/login/CreatePin");
      } else {
        enqueueSnackbar("Invalid login credentials.", {
          variant: "error",
          autoHideDuration: 1000,
          style: { backgroundColor: "#f44336", color: "#fff" },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

    setUserName("");
    setPassword("");
  };

  const handleForgotPassword = () => {
    router.push("/login/ForgotPassword");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    router.push("/login/SignUp");
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      <Box className={styles.container}>
        <Box
          component="img"
          src="/images/boy.svg"
          alt="Boy-img"
          className={styles.leftImage}
        />
        <Box className={styles.formContainer}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography variant="h4" component="h2" className={styles.title}>
              Login
            </Typography>
            <Typography className={styles.description}>
              Access your personalized dashboard to explore services, track
              progress, and stay updated.....
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              className={styles.textfield}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="UserName"
                placeholder="UserName or Email or PhoneNo"
                name="username"
                autoComplete="username"
                autoFocus
                value={userName}
                onChange={(e) => {
                  const value = e.target.value;
                  setUserName(value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="h6" component="span">
                        {"@"}
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
                name="password"
                label="Password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff color="disabled" />
                        ) : (
                          <Visibility color="disabled" />
                        )}
                      </IconButton>
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
              <Box className={styles.checkboxandforgotpassword}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      checked={rememberMe}
                      onChange={handleRememberMe}
                      sx={{
                        color: brown[800],
                        "&.Mui-checked": {
                          color: brown[600],
                        },
                      }}
                    />
                  }
                  label="Remember me"
                />
                <Box
                  className={styles.forgotPassword}
                  onClick={handleForgotPassword}
                >
                  Forgot password ?
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                className={styles.button}
                sx={{ position: "relative", right: "8.3rem" }}
              >
                {loading ? <CircularProgress size={24} /> : "Login Now"}
              </Button>
            </Box>
            <Button
              type="submit"
              variant="contained"
              className={styles.button}
              onClick={handleRegister}
              sx={{ position: "relative", bottom: "4.8rem", left: "16.9rem" }}
            >
              Register Now
            </Button>
          </Box>
        </Box>
        <Box
          component="img"
          src="/images/girl.svg"
          alt="Girl Illustration"
          className={styles.rightImage}
        />
      </Box>
    </>
  );
}