// src/app/layout.js

import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={geistSans.className}>
        {/* Wrap the entire app with CartProvider */}
        <CartProvider>
          <SessionProviderWrapper>
            {children}
            <Toaster position="top-right" />
          </SessionProviderWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
