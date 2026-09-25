"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PlacesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/places/my-places");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-[#777C78] dark:text-[#94A3B8]">Redirecting...</p>
    </div>
  );
}
