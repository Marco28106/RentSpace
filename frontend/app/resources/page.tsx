"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-[#063C2F] dark:text-[#14B8A6] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-6">Resources for Hosts</h1>
        <div className="space-y-6 text-[#555A56] dark:text-[#94A3B8]">
          <p>Guides, templates, and tools to help you succeed as a RentSpace host.</p>
          <div className="grid gap-4">
            <div className="bg-white dark:bg-[#0E1223] rounded-xl p-4 border border-[#E7E5DE] dark:border-[#334155]">
              <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">Getting Started Guide</h3>
              <p className="text-sm mt-2">Learn how to list your space and attract bookings</p>
            </div>
            <div className="bg-white dark:bg-[#0E1223] rounded-xl p-4 border border-[#E7E5DE] dark:border-[#334155]">
              <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">Photography Tips</h3>
              <p className="text-sm mt-2">Best practices for showcasing your venue</p>
            </div>
            <div className="bg-white dark:bg-[#0E1223] rounded-xl p-4 border border-[#E7E5DE] dark:border-[#334155]">
              <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">Pricing Strategy</h3>
              <p className="text-sm mt-2">How to price your venue competitively</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
