"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-[#063C2F] dark:text-[#14B8A6] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-6">About RentSpace</h1>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-[#555A56] dark:text-[#94A3B8]">
          <p className="text-lg leading-relaxed">
            RentSpace is Indonesia's premier marketplace for architectural sanctuaries and athletic arenas. We connect hosts with verified spaces to professionals, athletes, creators, and teams seeking the perfect venue.
          </p>

          <h2 className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC] mt-8">Our Mission</h2>
          <p className="leading-relaxed">
            To democratize access to premium physical spaces across Southeast Asia, enabling athletes, creators, and professionals to find and book verified venues with confidence.
          </p>

          <h2 className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC] mt-8">Why RentSpace?</h2>
          <ul className="space-y-3">
            <li>✓ Verified hosts and spaces</li>
            <li>✓ Secure escrow payments</li>
            <li>✓ Instant keyless access via QR codes</li>
            <li>✓ 24/7 customer support</li>
            <li>✓ Insurance protection included</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC] mt-8">Contact Us</h2>
          <p className="leading-relaxed">
            Have questions? Visit our <Link href="/contact" className="text-[#063C2F] dark:text-[#14B8A6] hover:underline">contact page</Link> or email support@rentspace.com
          </p>
        </div>
      </div>
    </div>
  );
}
