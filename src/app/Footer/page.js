// app/components/Footer.js
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ padding: 2, textAlign: "center", backgroundColor: "#f5f5f5" }}>
      <Typography variant="body2" color="text.secondary">
        © 2024 Your Company Name. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
