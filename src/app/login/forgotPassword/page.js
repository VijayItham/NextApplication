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
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [usernameSent, setUsernameSent] = useState(false);

    const handleGoHome = () => {
        router.push("/");
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();


        try {
            setLoading(true);
            const result = await dispatch(forgotPassword(username)).unwrap();

            if (result?.statusCode === 200) {
                enqueueSnackbar("OTP sent successfully. Check your email.", {
                    variant: "success",
                    autoHideDuration: 1000,
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                });
                setUsernameSent(true);
            } 
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {

        try {
            setLoading(true);
            const result = await dispatch(verifyOtp({ username, otp })).unwrap();

            if (result?.statusCode === 200) {
                enqueueSnackbar("OTP verified successfully.", {
                    variant: "success",
                    autoHideDuration: 1000,
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                });
                router.push("/login/UpdatePassword");
            } else {
                enqueueSnackbar("Invalid OTP.", {
                    variant: "error",
                    autoHideDuration: 1000,
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            className={styles.container}
        >
            <Box
                component="img"
                src="/images/boy.svg"
                alt="Boy Illustration"
                className={styles.leftImg}
            />

            <Box
                className={styles.box}
            >
                <Box
                    className={styles.goHome}
                    onClick={handleGoHome}
                >
                    <ArrowBackIcon
                        className={styles.arrowIcon}
                    />
                </Box>

                <Box
                    className={styles.content}
                >
                    <Typography
                        variant="h4"
                        component="h3"
                        className={styles.title}
                    >
                        {usernameSent ? "Verify OTP" : "Forgot Password?"}
                    </Typography>
                    <Typography
                        className={styles.description}
                    >
                        {usernameSent
                            ? "Enter your OTP to verify your identity"
                            : "Enter your username to receive instructions"}
                    </Typography>

                    <Box className={styles.form}>
                        {!usernameSent && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="username"
                                    placeholder="Username"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography variant="h6">{"@"}</Typography>
                                            </InputAdornment>
                                        ),
                                        readOnly: loading,
                                    }}
                                    disabled={loading}
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
                                    type="button"
                                    variant="contained"
                                    onClick={handleForgotPassword}
                                    className={styles.sendMe}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Send Me"}
                                </Button>
                            </>
                        )}

                        {usernameSent && (
                            <>
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
                                                <Typography variant="h6">{"#"}</Typography>
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
                                    type="button"
                                    variant="contained"
                                    onClick={handleVerifyOtp}
                                    className={styles.verifyOtp}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Verify OTP"}
                                </Button>
                            </>
                        )}
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

    );
}