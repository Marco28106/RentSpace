"use client";

import React from "react";
import { Compass, RefreshCw, ShieldCheck, Award } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Easy Discovery",
    description:
      "Curated architectural spaces with verified floor plans, ceiling clearance specifications, and real sunpath indices.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Availability",
    description:
      "Direct cloud API synchronization with venue calendars preventing double-bookings and holding reservations instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Protected escrow payments, frictionless automated refunds, and fully transparent cancellation terms.",
  },
  {
    icon: Award,
    title: "Trusted Reviews",
    description:
      "100% verified member reviews written by accredited athletes, creative directors, and event producers.",
  },
];

export default function WhyRentSpace() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#777C78] dark:text-[#94A3B8]">
          Standard of Quality
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111512] dark:text-[#F8FAFC] mt-1">
          Why RentSpace
        </h2>
        <p className="text-sm text-[#555A56] dark:text-[#94A3B8] mt-2">
          Engineered with the care of private concierges to guarantee zero friction from discovery to game time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-[#0E1223] rounded-2xl p-6 border border-[#E7E5DE] dark:border-[#334155] hover:border-[#D8D6CE] dark:hover:border-[#64748B] transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] dark:bg-[#1A1E2F] border border-[#E7E5DE] dark:border-[#334155] flex items-center justify-center text-[#063C2F] dark:text-[#14B8A6] mb-4">
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="text-base font-bold text-[#111512] dark:text-[#F8FAFC] mb-2">
                {f.title}
              </h3>
              <p className="text-xs text-[#555A56] dark:text-[#94A3B8] leading-relaxed">
                {f.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
