"use client";
import { Providers } from "./redux/providers";
import Header from "./Header/page";
import Footer from "./Footer/page";
import {
  Box,
} from "@mui/material";

import LeftMenu from "./LeftMenu/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <Box sx={{ display: "flex" }}>
            <LeftMenu/>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                marginLeft: '30px',
              }}
            >
              {children}
            </Box>
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
