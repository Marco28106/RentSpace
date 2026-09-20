"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="flex-1 w-full">{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}

