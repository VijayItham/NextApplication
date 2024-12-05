"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  IconButton,
  CheckCircleIcon,
  ErrorIcon,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchUserLogin } from "./redux/AppUserSlice";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { brown } from "@mui/material/colors";
import styles from './page.module.css'

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(null);


  const dispatch = useDispatch();
  const router = useRouter();

  const validateFields = () => {
    let tempErrors = {};
    if (!userName) tempErrors.userName = "User Name is required";
    if (!password) tempErrors.password = "Password is required";
    return tempErrors;
  };

  const onCancel = () => {
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const result = await dispatch(
        fetchUserLogin({ userName, password })
      ).unwrap();
      setLoading(false);
      console.log('result==>', result)
      if (result?.loginDetails?.data[0]?.hasPin === "True") {
        router.push("/login/verify-pin");
      } else if (result?.loginDetails?.data[0]?.hasPin === "False") {
        router.push("/login/createpin");
      }
      else {
        enqueueSnackbar("Invalid login credentials.", {
          variant: "error",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          style: { backgroundColor: "#f44336", color: "#fff" },
        });
      }
    } catch (error) {
      setApiError("An error occurred during login. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPassword= () => {
    router.push("login/forgotPassword");
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className={styles.container}>
      {loading && (
        <Box className={styles.loadingOverlay}>
          <CircularProgress />
        </Box>
      )}

      {/* Left Image */}
      <Box
        component="img"
        src="/images/boy.svg"
        alt="Boy-img"
        className={styles.leftImage}
      />

      {/* Login Form */}
      <Box className={styles.formContainer}>
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
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
              onChange={(e) => setUserName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="h6" component="span">
                      {"@"}
                    </Typography>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {isValid === true && <CheckCircleIcon color="success" />}
                    {isValid === false && <ErrorIcon color="error" />}
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

            <Button type="submit" variant="contained" className={styles.button}>
              Login Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Right Image */}
      <Box
        component="img"
        src="/images/girl.svg"
        alt="Girl Illustration"
        className={styles.rightImage}
      />
    </Box>
  );
};

export default HomePage;
