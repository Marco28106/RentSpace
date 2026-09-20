"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Bell, ChevronDown, Menu, X, Building2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Explore", href: "/explore" },
    { label: "Categories", href: "/#categories" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E7E5DE] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#063C2F] flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-[#075342] transition-colors">
            <Building2 className="w-4 h-4 text-[#FAF9F6]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#111512]">
            RentSpace
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  isActive
                    ? "text-[#063C2F] font-semibold"
                    : "text-[#555A56] hover:text-[#111512]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#063C2F] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/dashboard/favorites"
            className="p-2 rounded-full text-[#555A56] hover:text-[#111512] hover:bg-[#F4F3EF] transition-colors"
            title="Saved Spaces"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
          </Link>

          <Link
            href="/notifications"
            className="p-2 rounded-full text-[#555A56] hover:text-[#111512] hover:bg-[#F4F3EF] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#063C2F] rounded-full ring-2 ring-[#FAF9F6]" />
          </Link>

          <Link
            href="/become-owner"
            className="text-sm font-medium text-[#111512] hover:text-[#063C2F] px-3 py-1.5 rounded-full hover:bg-[#F4F3EF] transition-colors"
          >
            Become an Owner
          </Link>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E7E5DE]">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-[#F4F3EF] border border-[#E7E5DE] transition-colors"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-[#E8F0ED] border border-[#E7E5DE] flex items-center justify-center">
                {/* Avatar Fallback or Portrait */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#777C78]" />
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#111512] hover:bg-[#F4F3EF] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E5DE] bg-[#FAF9F6] px-4 py-5 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#111512] hover:text-[#063C2F] px-2 py-1.5 rounded-md hover:bg-[#F4F3EF]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#E7E5DE] flex items-center justify-between">
            <Link
              href="/become-owner"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#063C2F]"
            >
              Become an Owner
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#555A56]"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <Link
                href="/notifications"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#555A56]"
              >
                <Bell className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
