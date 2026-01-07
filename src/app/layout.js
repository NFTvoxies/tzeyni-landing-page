// src/app/layout.js

import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Tzeyni - Professional Services Marketplace",
  description: "Connect with top professionals for your needs on Tzeyni.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* <head>
        <link rel="shortcut icon" type="image/x-icon" href="/test.ico" />
      </head> */}
      <body className={geistSans.className}>
        {/* Wrap the entire app with CartProvider */}
        <CartProvider>
          <SessionProviderWrapper>
            {children}
            <Toaster position="top-right" richColors />
          </SessionProviderWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
