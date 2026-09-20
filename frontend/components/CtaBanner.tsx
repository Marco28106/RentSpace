"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="my-16">
      <div className="relative overflow-hidden rounded-3xl bg-[#063C2F] text-white p-8 sm:p-12 lg:p-16 shadow-xl">
        {/* Background decorative watermark */}
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-10 translate-x-12 translate-y-12">
          <Building2 className="w-96 h-96 stroke-[1]" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-emerald-300">
            Reserve Your Moment
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Your next space is closer than you think.
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
            Join thousands of athletes, creators, and corporate teams booking seamless architectural spaces every day.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/explore"
              className="px-6 py-3.5 rounded-xl bg-white text-[#063C2F] font-semibold text-sm hover:bg-[#FAF9F6] active:scale-95 transition-all shadow-md"
            >
              Explore All Spaces
            </Link>

            <Link
              href="/become-owner"
              className="px-5 py-3.5 rounded-xl text-white font-semibold text-sm hover:text-emerald-200 transition-colors flex items-center gap-2"
            >
              <span>List Your Venue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
