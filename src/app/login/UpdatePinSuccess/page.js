"use client";

import { Box, Typography, Button, } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./UpdatePinSuccess.module.css"

export default function UpdatePinSuccess() {
    const router = useRouter();

    const handleDashboard = () => {
        router.push("/");
    }

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

                <Box className={styles.content}>
                    <Typography variant="h4" component="h3" className={styles.title}>
                        Updated pin Successfully
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.login}
                        onClick={handleDashboard}
                    >
                        Login Now
                    </Button>
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