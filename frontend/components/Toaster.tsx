"use client";

import { ReactNode, useCallback } from "react";
import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#FFFFFF",
          color: "#111512",
          border: "1px solid #E7E5DE",
          padding: "12px 16px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          iconTheme: {
            primary: "#063C2F",
            secondary: "#FFFFFF",
          },
        },
        error: {
          iconTheme: {
            primary: "#DC2626",
            secondary: "#FFFFFF",
          },
        },
      }}
    />
  );
}
