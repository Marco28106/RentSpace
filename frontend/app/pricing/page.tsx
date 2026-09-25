"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-[#063C2F] dark:text-[#14B8A6] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-6">Pricing for Hosts</h1>
        <div className="space-y-6 text-[#555A56] dark:text-[#94A3B8]">
          <p className="text-lg">RentSpace charges zero upfront fees. We only take a commission on successful bookings.</p>
          <div className="bg-white dark:bg-[#0E1223] rounded-2xl p-6 border border-[#E7E5DE] dark:border-[#334155]">
            <h2 className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-4">Commission Structure</h2>
            <ul className="space-y-3">
              <li>• 15% commission on all successful bookings</li>
              <li>• Payment processing: Included</li>
              <li>• Insurance: Included</li>
              <li>• Customer support: 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
