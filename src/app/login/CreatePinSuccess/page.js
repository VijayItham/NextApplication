"use client";

import { Box, Typography, Button, } from "@mui/material";
import { useRouter } from "next/navigation";
import  styles from "./CreatePinSuccess.module.css"

export default function PinCreateSuccess() {
    const router = useRouter();

    const handleDashboard = () =>{
        router.push("/component/Dashboard");
    }

    return (
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
                className = {styles.box}
            >


                <Box className = {styles.content}>
                    <Typography variant="h4" component="h3" className={styles.title}>
                     Pin Created Successfully
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                       className={styles.dashboard}
                        onClick={handleDashboard}
                    >
                        Dashboard
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