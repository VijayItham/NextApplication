"use client";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useDispatch} from "react-redux";
import { updatePassword } from "@/app/redux/AppUserSlice";
import styles from "./UpdatePassword.module.css";


export default function UpdatePassword() {
    console.log(styles)
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const userDetail = localStorage.getItem("userDetail");
    let username = null;
    
    if (userDetail) {
        const parsedUserDetail = JSON.parse(userDetail);
        username = parsedUserDetail.userName; 
    } else {
        console.log("No user detail found in localStorage.");
    }


    const handleGoHome = () => {
        router.push("/");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords do not match. Please try again.", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "top", horizontal: "center" },
            });

            setPassword("");
            setConfirmPassword("");
            return;
        }

        try {
            setLoading(true);
            const result = await dispatch(updatePassword({ username, password })).unwrap();
            console.log(result);

            if (result?.statusCode === 200) {
                enqueueSnackbar("Password updated successfully!", {
                    variant: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                });
                setPassword("");
                setConfirmPassword("");
                router.push("/login/PasswordResetSuccess");
            } else {
                enqueueSnackbar("Failed to update password.", {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "top", horizontal: "center" },
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
            <Box
                className = {styles.container}
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
                    <Box className={styles.arrowBox} onClick={handleGoHome}>
                        <ArrowBackIcon className={styles.arrowIcon} />
                    </Box>
                    <Box className={styles.content}>
                        <Typography variant="h4" component="h3" className={styles.title}>
                            Password reset?
                        </Typography>
                        <Typography className={styles.description} >
                            Create your password and confirm your password
                        </Typography>


                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                                onChange={(e) => {
                                    setPassword(e.target.value)
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
                                name="confirmPassword"
                                className={styles.textField}
                                placeholder="Confirm Password"
                                id="confirmPassword"
                                autoComplete="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
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

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                className={styles.submitBtn}
                            >
                                {loading ? <CircularProgress size={24} /> : "Submit"}
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
        </>
    );
}

