"use client";
import { Providers } from "./redux/providers";
import Navbar from "./components/Navbar";
import { SnackbarProvider } from "notistack";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Navbar />
          <Providers>
            {children}
          </Providers>
        </SnackbarProvider>
      </body>
    </html>
  );
}
