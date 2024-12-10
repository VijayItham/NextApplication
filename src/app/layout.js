"use client";
import { Providers } from "./redux/providers";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "./api/auth";
import Navbar from "./common/Navbar";

export default function RootLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/"); 
    }
  }),[router];
  return (
    <html lang="en">
      <body>
      <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
        <Providers>
          <Navbar/>
          {children}</Providers>
        </SnackbarProvider>
      </body>
    </html>
  );
}
