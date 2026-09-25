"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-[#063C2F] dark:text-[#14B8A6] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-6">Safety & Policies</h1>
        <div className="prose dark:prose-invert max-w-none space-y-6 text-[#555A56] dark:text-[#94A3B8]">
          <h2 className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">Our Commitment to Safety</h2>
          <p>RentSpace is committed to providing a safe and secure platform for all users.</p>
          
          <h2 className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">Escrow Protection</h2>
          <p>All payments are held in secure escrow until the booking is confirmed complete.</p>
          
          <h2 className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">Verification Requirements</h2>
          <p>All hosts and users must verify their identity before using the platform.</p>
          
          <h2 className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">Insurance Coverage</h2>
          <p>Every booking includes basic insurance coverage for peace of mind.</p>
        </div>
      </div>
    </div>
  );
}
