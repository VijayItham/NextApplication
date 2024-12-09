"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";


export default function PasswordResetSuccessfully() {
    const router = useRouter();

    const handleLoginNow = () => {
        router.push("/");
    }

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
                    maxWidth: 500,
                    backgroundColor: "#fff",
                    padding: "2.5rem",
                    borderRadius: "50px",
                    boxShadow: "0px 4px 10px rgba(249, 224, 180, 1)",
                    textAlign: "center",
                    marginTop: "2rem",
                    marginBottom: '15rem'
                }}
            >


                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Typography variant="h4" component="h3" sx={{ color: "#333333", marginBottom: "1rem", marginTop: "1rem", fontSize: "24px", }}>
                        Password updated Successfully
                    </Typography>

                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleLoginNow}
                        sx={{
                            mb: 2,
                            mt: 2,
                            ml:12,
                            padding: "15px",
                            borderRadius: "3rem",
                            backgroundColor: "#784800",
                            fontSize: "13px",
                            width: "7rem"
                        }}
                    >
                        Login Now
                    </Button>

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
