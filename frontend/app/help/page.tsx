"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-[#063C2F] dark:text-[#14B8A6] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-6">Help Center</h1>
        <div className="space-y-6 text-[#555A56] dark:text-[#94A3B8]">
          <p className="text-lg">Find answers to common questions about RentSpace.</p>
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#0E1223] rounded-xl p-4 border border-[#E7E5DE] dark:border-[#334155]">
              <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">How do I book a space?</h3>
              <p className="text-sm mt-2">Step-by-step guide to making your first booking</p>
            </div>
            <div className="bg-white dark:bg-[#0E1223] rounded-xl p-4 border border-[#E7E5DE] dark:border-[#334155]">
              <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">What's included in booking?</h3>
              <p className="text-sm mt-2">Details about what you get when you book</p>
            </div>
            <div className="bg-white dark:bg-[#0E1223] rounded-xl p-4 border border-[#E7E5DE] dark:border-[#334155]">
              <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">How do cancellations work?</h3>
              <p className="text-sm mt-2">Our cancellation and refund policies</p>
            </div>
          </div>
          <p className="mt-8">Still need help? <Link href="/contact" className="text-[#063C2F] dark:text-[#14B8A6] hover:underline">Contact support</Link></p>
        </div>
      </div>
    </div>
  );
}
