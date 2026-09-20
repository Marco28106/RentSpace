"use client";

import React from "react";
import Link from "next/link";
import { Building2, Globe, DollarSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] border-t border-[#E7E5DE] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-[#E7E5DE]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#063C2F] flex items-center justify-center text-white">
                <Building2 className="w-3.5 h-3.5 text-[#FAF9F6]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#111512]">
                RentSpace
              </span>
            </Link>
            <p className="text-sm text-[#555A56] leading-relaxed max-w-sm">
              Curated physical sanctuaries, daylight studios, and executive spaces engineered for exceptional craft.
            </p>
          </div>

          {/* Column 1: Discover Spaces */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#111512]">
              Discover Spaces
            </h4>
            <ul className="space-y-2 text-sm text-[#555A56]">
              <li>
                <Link href="/explore?category=futsal" className="hover:text-[#063C2F] transition-colors">
                  Futsal & Athletic
                </Link>
              </li>
              <li>
                <Link href="/explore?category=photo-studio" className="hover:text-[#063C2F] transition-colors">
                  Daylight Studios
                </Link>
              </li>
              <li>
                <Link href="/explore?category=coworking" className="hover:text-[#063C2F] transition-colors">
                  Coworking Lofts
                </Link>
              </li>
              <li>
                <Link href="/explore?category=event" className="hover:text-[#063C2F] transition-colors">
                  Private Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#111512]">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-[#555A56]">
              <li>
                <Link href="/about" className="hover:text-[#063C2F] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#063C2F] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-[#063C2F] transition-colors">
                  Press & Stories
                </Link>
              </li>
              <li>
                <Link href="/monograph" className="hover:text-[#063C2F] transition-colors">
                  Architectural Monograph
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hosts */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#111512]">
              Hosts
            </h4>
            <ul className="space-y-2 text-sm text-[#555A56]">
              <li>
                <Link href="/become-owner" className="hover:text-[#063C2F] transition-colors">
                  List your Space
                </Link>
              </li>
              <li>
                <Link href="/owner" className="hover:text-[#063C2F] transition-colors">
                  Owner Dashboard
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-[#063C2F] transition-colors">
                  Insurance Guarantee
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-[#063C2F] transition-colors">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#111512]">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-[#555A56]">
              <li>
                <Link href="/help" className="hover:text-[#063C2F] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/trust" className="hover:text-[#063C2F] transition-colors">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#063C2F] transition-colors">
                  Cancellation Terms
                </Link>
              </li>
              <li>
                <Link href="/concierge" className="hover:text-[#063C2F] transition-colors">
                  Concierge Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#777C78]">
          <div>
            © 2025 RentSpace Inc. All rights reserved. Crafted with architectural discipline.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#111512] transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#111512] transition-colors">
              <span className="font-semibold">Rp</span>
              <span>IDR (Rp)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
