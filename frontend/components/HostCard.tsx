"use client";

import React from "lucide-react";
import { MessageCircle, Shield, Clock, ThumbsUp } from "lucide-react";
import { images } from "../lib/demo-data";

interface HostCardProps {
  hostName: string;
  hostAvatar: string;
  hostPhone: string;
  responseRate: number;
  verified: boolean;
  superhost: boolean;
  joinDate: string;
  reviewCount: number;
}

export default function HostCard({
  hostName,
  hostAvatar,
  hostPhone,
  responseRate,
  verified,
  superhost,
  joinDate,
  reviewCount,
}: HostCardProps) {
  const handleContact = () => {
    const message = `Halo ${hostName}, saya ingin menanyakan tentang tempat Anda di RentSpace.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${hostPhone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-colored-md border border-[#E7E5DE] dark:border-[#334155] hover:shadow-colored-lg transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <img src={hostAvatar || images.host} alt={hostName} className="h-20 w-20 rounded-full object-cover ring-2 ring-brand/20 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-[#111512] dark:text-[#F8FAFC]">Hosted by {hostName}</h3>
            <p className="text-sm text-[#555A56] dark:text-[#94A3B8] mt-0.5">Studio Director & Architect</p>
            {superhost && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent-gold/15 px-3 py-1 text-xs font-semibold text-accent-gold">
                <span>⭐</span>
                <span>Superhost</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-gradient-to-br from-[#F4F3EF] to-[#FAF9F6] dark:from-[#1A1E2F] dark:to-[#0E1223] border border-[#E7E5DE] dark:border-[#334155]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand" />
            <span className="text-xs font-semibold text-[#777C78] dark:text-[#94A3B8] uppercase tracking-wider">Response</span>
          </div>
          <p className="font-display text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">{responseRate}%</p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-brand" />
            <span className="text-xs font-semibold text-[#777C78] dark:text-[#94A3B8] uppercase tracking-wider">Reviews</span>
          </div>
          <p className="font-display text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">{reviewCount}</p>
        </div>
        {verified && (
          <div className="col-span-2 pt-2 border-t border-[#E7E5DE] dark:border-[#334155]">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand" />
              <span className="text-xs font-semibold text-[#111512] dark:text-[#F8FAFC] uppercase tracking-wider">✓ ID Verified</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3.5 mb-6">
        <p className="text-sm leading-relaxed text-[#555A56] dark:text-[#94A3B8]">
          Astrid telah menjadi host sejak <strong className="text-[#111512] dark:text-white">{joinDate}</strong> dan telah melayani ratusan produksi profesional.
        </p>
        <p className="text-sm leading-relaxed text-[#555A56] dark:text-[#94A3B8]">
          Studio ini dikelola dengan standar internasional untuk memastikan pengalaman terbaik bagi setiap client.
        </p>
      </div>

      <button
        onClick={handleContact}
        className="w-full rounded-xl bg-[#25D366] hover:bg-[#20BA58] active:scale-95 px-4 py-3.5 font-semibold text-white flex items-center justify-center gap-2.5 transition-all duration-200 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        aria-label="Contact host on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span>Message Host on WhatsApp</span>
      </button>
    </section>
  );
}
