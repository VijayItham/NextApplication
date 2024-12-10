"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./UpdatePasswordSuccess.module.css"


export default function PasswordUpdateSuccess() {
    const router = useRouter();

    const handleLoginNow = () => {
        router.push("/");
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
               className={styles.box}
            >


                <Box className={styles.content}>
                    <Typography variant="h4" component="h3" className={styles.title}>
                        Password updated Successfully
                    </Typography>

                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleLoginNow}
                        className={styles.login}
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
                className={styles.rightImg}
            />
        </Box>
    );
}