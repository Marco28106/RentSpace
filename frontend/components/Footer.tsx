"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] dark:bg-[#020617] border-t border-[#E7E5DE] dark:border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#063C2F] flex items-center justify-center text-white font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#111512] dark:text-white">RentSpace</span>
            </Link>
            <p className="text-xs text-[#555A56] dark:text-[#94A3B8]">
              Architectural sanctuaries & athletic arenas for every occasion.
            </p>
          </div>

          {/* Discover Spaces */}
          <div>
            <h4 className="font-semibold text-[#111512] dark:text-white mb-3 text-sm">DISCOVER SPACES</h4>
            <ul className="space-y-2 text-xs text-[#555A56] dark:text-[#94A3B8]">
              <li><Link href="/explore" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Explore All Spaces</Link></li>
              <li><Link href="/#categories" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Browse by Category</Link></li>
<li><Link href="/explore" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Latest Listings</Link></li>
               <li><Link href="/explore" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Trending Spaces</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-[#111512] dark:text-white mb-3 text-sm">COMPANY</h4>
            <ul className="space-y-2 text-xs text-[#555A56] dark:text-[#94A3B8]">
              <li><Link href="/about" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">About</Link></li>
               <li><Link href="/blog" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Blog</Link></li>
               <li><Link href="/careers" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Careers</Link></li>
               <li><Link href="/press" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Press</Link></li>
            </ul>
          </div>

          {/* Hosts */}
          <div>
            <h4 className="font-semibold text-[#111512] dark:text-white mb-3 text-sm">HOSTS</h4>
            <ul className="space-y-2 text-xs text-[#555A56] dark:text-[#94A3B8]">
              <li><Link href="/become-owner" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Become a Host</Link></li>
               <li><Link href="/dashboard/places" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Owner Dashboard</Link></li>
               <li><Link href="/pricing" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Pricing</Link></li>
               <li><Link href="/resources" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Resources</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-[#111512] dark:text-white mb-3 text-sm">SUPPORT</h4>
            <ul className="space-y-2 text-xs text-[#555A56] dark:text-[#94A3B8]">
              <li><Link href="/help" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Help Center</Link></li>
               <li><Link href="/policies" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Safety & Policies</Link></li>
               <li><Link href="/community" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Community Guidelines</Link></li>
               <li><Link href="/contact" className="hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#E7E5DE] dark:border-[#334155] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#555A56] dark:text-[#94A3B8]">
            © 2025 RentSpace.com, all rights reserved. Discover together.
          </p>
          <div className="flex items-center gap-4">
            <select className="text-xs bg-white dark:bg-[#0E1223] text-[#111512] dark:text-white border border-[#E7E5DE] dark:border-[#334155] rounded px-2 py-1">
              <option>English (US)</option>
              <option>Indonesian</option>
            </select>
            <select className="text-xs bg-white dark:bg-[#0E1223] text-[#111512] dark:text-white border border-[#E7E5DE] dark:border-[#334155] rounded px-2 py-1">
              <option>IDR (Rp)</option>
              <option>USD ($)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
