"use client";

import { Providers } from "./redux/providers";
import { SnackbarProvider } from "notistack";
import Navbar from "./common/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Providers>
          <Navbar />
            {children}
          </Providers>
        </SnackbarProvider>
      </body>
    </html>
  );
}
