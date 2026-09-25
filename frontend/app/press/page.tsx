"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-[#063C2F] dark:text-[#14B8A6] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-6">Press</h1>
        <p className="text-[#555A56] dark:text-[#94A3B8]">Press releases, media kit, and announcements coming soon.</p>
        <p className="mt-4 text-[#555A56] dark:text-[#94A3B8]">For media inquiries, contact press@rentspace.com</p>
      </div>
    </div>
  );
}
