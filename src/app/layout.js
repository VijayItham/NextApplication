"use client";
import { Providers } from "./redux/providers";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "./api/auth";

export default function RootLayout({ children }) {
  const router = useRouter();
  console.log('isLoggedIn123', isLoggedIn())
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/"); // Redirect to the login page
    }
  }),[router];
  return (
    <html lang="en">
      <body>
      <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
        <Providers>{children}</Providers>
        </SnackbarProvider>
      </body>
    </html>
  );
}
