import "./globals.css";
import React from "react";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import AppChrome from "../components/AppChrome";
import { AuthProvider } from "../context/AuthContext";
import ThemeProvider from "../context/ThemeContext";
import Toaster from "../components/Toaster";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-plus-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "700",
  style: "normal",
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "RentSpace — Architectural Sanctuaries & Athletic Arenas",
  description:
    "Discover and book trusted spaces for sports, work, creativity, and events across premier locations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#090D16] text-[#111512] dark:text-white font-plus-jakarta antialiased selection:bg-[#E8F0ED] dark:selection:bg-[#0F766E] selection:text-[#063C2F] dark:selection:text-[#F0FDFA]">
        <ThemeProvider>
          <AuthProvider>
            <AppChrome>{children}</AppChrome>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
