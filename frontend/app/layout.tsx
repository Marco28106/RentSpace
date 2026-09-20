import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import AppChrome from "../components/AppChrome";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111512] font-sans antialiased selection:bg-[#E8F0ED] selection:text-[#063C2F]">
        <AuthProvider>
          <AppChrome>{children}</AppChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
