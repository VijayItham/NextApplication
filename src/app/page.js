"use client";
import Link from "next/link";
import { Container, Box, Button, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Recharge Portal
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Join us to experience the best of our services. Login or sign up to get started!
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
              Login
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
