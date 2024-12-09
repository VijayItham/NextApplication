"use client";
import { Box, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

export default function PinReset() {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGoHome = () => {
        router.push("/");
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (pin !== confirmPin) {
            enqueueSnackbar("PINs do not match. Please try again.", {
                variant: "error",
                autoHideDuration: 1000,
                anchorOrigin: { vertical: "top", horizontal: "center" },
            });
            return;
        }

        setPin("");
        setConfirmPin("");
    };


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f6f2eb",
                    height: "100vh",
                    position: "fixed",
                    width: "100vw",
                    top: 65,
                    left: 0,
                }}
            >
                <Box
                    component="img"
                    src="/images/boy.svg"
                    alt="Boy Illustration"
                    sx={{
                        height: "34rem",
                        marginRight: "4rem",
                        marginBottom: "2rem",
                    }}
                />

                <Box
                    sx={{
                        maxWidth: 440,
                        backgroundColor: "#fff",
                        padding: "4rem",
                        borderRadius: "50px",
                        boxShadow: "0px 4px 10px rgba(249, 224, 180, 1)",
                        textAlign: "center",
                        marginTop: "2rem",
                        marginBottom: "6rem",
                    }}
                >
                    <Box sx={{ backgroundColor: "#EEEEEE", width: "45px", height: "45px", borderRadius: "50%", marginBottom: "2rem" }} onClick={handleGoHome}>
                        <ArrowBackIcon sx={{ fontSize: "30px", color: "#666666", marginTop: "7px" }} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <Typography variant="h4" component="h3" sx={{ color: "#333333", marginBottom: "1rem" }}>
                            Reset Pin?
                        </Typography>
                        <Typography sx={{ color: "#666666", fontSize: "18px", fontFamily: "Montserrat", wordSpacing: "2px" }} >
                            Create your pin and confirm your pin
                        </Typography>

                        {error && (
                            <Typography sx={{ color: "red", fontSize: "14px", marginBottom: "1rem" }}>
                                {error}
                            </Typography>
                        )}

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="pin"
                                placeholder="Pin"
                                name="pin"
                                autoFocus
                                value={pin}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,4}$/.test(value)) {
                                        setPin(value);
                                    }
                                    if (value.length !== 4 && value.length > 0) {
                                        setError("PIN must be exactly 4 digits.");
                                    } else {
                                        setError("");
                                    }

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
                                name="confirmPin"
                                placeholder="Confirm Pin"
                                id="confirmPin"
                                autoComplete="current-password"
                                value={confirmPin}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,4}$/.test(value)) {
                                        setConfirmPin(value);
                                    }
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
                                sx={{ mt: 3, mb: 2, padding: "15px", width: "8rem", borderRadius: "3rem", backgroundColor: "#784800", fontSize: "13px", marginRight: "20rem" }}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Right Image */}
                <Box
                    component="img"
                    src="/images/girl.svg"
                    alt="Girl Illustration"
                    sx={{
                        height: "auto",
                        marginLeft: "4rem",
                        maxHeight: "100%",
                        maxWidth: "100%",
                        marginTop: "2rem",
                    }}
                />
            </Box>
        </>
    );
}
