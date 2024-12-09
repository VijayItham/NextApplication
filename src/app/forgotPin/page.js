"use client";

import { Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { useSnackbar } from "notistack"; 

export default function ForgotPin() {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [email, setEmail] = useState("");  

    const handleGoHome = () => {
        router.push("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

              // Validate email using regex
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

              if (!emailRegex.test(email)) {
                  enqueueSnackbar('Please Enter a valid Email address.', { variant: 'success' ,autoHideDuration: 1000,
                      anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                      },
                      style: { backgroundColor: "#f44336", color: "#fff" },
                    });
                    setEmail("");
                  return;
                  
              }else{
                enqueueSnackbar('Email Sent successfully', { variant: 'error' ,autoHideDuration: 1000,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                    style: { backgroundColor: "#4caf50", color: "#fff" },
                  });
                  setEmail("");
                return;
              }
              console.log("Submitted email: ", email);
              setEmail("");
    };

    return (
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
                <Box
                    sx={{
                        backgroundColor: "#EEEEEE",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        marginBottom: "2rem",
                    }}
                    onClick={handleGoHome}
                >
                    <ArrowBackIcon sx={{ fontSize: "30px", color: "#666666", marginTop: "7px" }} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Typography variant="h4" component="h3" sx={{ color: "#333333", marginBottom: "1rem" }}>
                        Forgot Pin?
                    </Typography>
                    <Typography sx={{ color: "#666666", fontSize: "18px", fontFamily: "Montserrat", wordSpacing: "2px" }}>
                        Enter your email to receive instructions
                    </Typography>


                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            placeholder="Email Address"
                            id="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
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
                            sx={{
                                mt: 3,
                                mb: 2,
                                padding: "15px",
                                width: "8rem",
                                borderRadius: "3rem",
                                backgroundColor: "#784800",
                                fontSize: "13px",
                                marginRight: "20rem",
                            }}
                        >
                            Send Me
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
    );
}
