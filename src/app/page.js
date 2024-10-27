"use client";
import {
  Box,
  Typography,
} from "@mui/material";
const HomePage = () => {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Our Recharge Platformasdsds
      </Typography>
    </Box>
  );
};

export default HomePage;
