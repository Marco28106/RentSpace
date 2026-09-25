"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Bell, ChevronDown, Menu, X, Building2, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { images } from "../lib/demo-data";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout, loadingLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (pathname === "/") {
      const categories = document.getElementById("categories");
      const howItWorks = document.getElementById("how-it-works");

      if (categories) observer.observe(categories);
      if (howItWorks) observer.observe(howItWorks);

      return () => {
        if (categories) observer.unobserve(categories);
        if (howItWorks) observer.unobserve(howItWorks);
      };
    } else {
      setActiveSection(null);
    }
  }, [pathname]);

  const navLinks = [
    { label: "Explore", href: "/explore" },
    { label: "Categories", href: "/#categories" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  const avatarURL = user?.avatar_url
    ? user.avatar_url.startsWith("http")
      ? user.avatar_url
      : `http://localhost:8080${user.avatar_url}`
    : images.avatar;

  return (
      <header className={`sticky top-0 z-50 bg-[#FAF9F6]/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-[#E7E5DE] dark:border-[#334155] transition-all ${scrolled ? "shadow-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#063C2F] flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-[#075342] transition-colors">
            <Building2 className="w-4 h-4 text-[#FAF9F6]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#111512] dark:text-white">
            RentSpace
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 transition-colors duration-200">
          {navLinks.map((link) => {
            let isActive = false;
            if (link.href.includes("#")) {
              const sectionId = link.href.replace("/#", "");
              isActive = activeSection === sectionId;
            } else {
              isActive = pathname === link.href;
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-all relative py-2 px-1 focus-visible:ring-2 focus-visible:ring-[#063C2F] focus-visible:ring-offset-2 rounded ${
                  isActive
                    ? "text-[#063C2F] dark:text-[#14B8A6] font-semibold"
                    : "text-[#555A56] dark:text-[#94A3B8] hover:text-[#111512] dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#063C2F] dark:bg-[#14B8A6] rounded-full" style={{ animation: "nav-underline 300ms ease-out" }} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/dashboard/favorites"
            className="p-2 rounded-full text-[#555A56] dark:text-[#94A3B8] hover:text-[#111512] dark:hover:text-white hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors focus-visible:ring-2 focus-visible:ring-[#063C2F] focus-visible:ring-offset-2"
            title="Saved Spaces"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
          </Link>

          <Link
            href="/notifications"
            className="p-2 rounded-full text-[#555A56] dark:text-[#94A3B8] hover:text-[#111512] dark:hover:text-white hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors relative focus-visible:ring-2 focus-visible:ring-[#063C2F] focus-visible:ring-offset-2"
            title="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#063C2F] dark:bg-[#14B8A6] rounded-full ring-2 ring-[#FAF9F6] dark:ring-[#0F172A]" />
            </Link>

            {user?.role === "OWNER" ? (
              <>
                <Link
                  href="/dashboard/places"
                  className="text-sm font-medium text-[#111512] dark:text-white hover:text-[#063C2F] dark:hover:text-[#14B8A6] px-3 py-1.5 rounded-full hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors focus-visible:ring-2 focus-visible:ring-[#063C2F] focus-visible:ring-offset-2"
                >
                  Listing Places
                </Link>
                <Link
                  href="/dashboard/places/my-places"
                  className="text-sm font-medium text-[#111512] dark:text-white hover:text-[#063C2F] dark:hover:text-[#14B8A6] px-3 py-1.5 rounded-full hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors focus-visible:ring-2 focus-visible:ring-[#063C2F] focus-visible:ring-offset-2"
                >
                  My Places
                </Link>
              </>
            ) : (
              <Link
                href="/become-owner"
                className="text-sm font-medium text-[#111512] dark:text-white hover:text-[#063C2F] dark:hover:text-[#14B8A6] px-3 py-1.5 rounded-full hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors focus-visible:ring-2 focus-visible:ring-[#063C2F] focus-visible:ring-offset-2"
              >
                Become Owner
              </Link>
            )}

           <Link
            href="/dashboard/settings"
            className="p-2 rounded-full text-[#555A56] dark:text-[#94A3B8] hover:text-[#111512] dark:hover:text-white hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors focus-visible:ring-2 focus-visible:ring-[#063C2F] focus-visible:ring-offset-2"
            title="Settings"
           >
            <Settings className="w-5 h-5 stroke-[1.75]" />
           </Link>

           <div className="flex items-center gap-2 pl-2 border-l border-[#E7E5DE] dark:border-[#334155] relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] border border-[#E7E5DE] dark:border-[#334155] transition-colors focus-visible:ring-2 focus-visible:ring-[#063C2F] focus-visible:ring-offset-2"
                aria-label="User menu"
              >
               <div className="w-7 h-7 rounded-full overflow-hidden bg-[#E8F0ED] dark:bg-[#1E293B] border border-[#E7E5DE] dark:border-[#334155] flex items-center justify-center">
                 {loading ? (
                   <div className="w-full h-full bg-[#E7E5DE] dark:bg-[#334155] animate-pulse" />
                 ) : (
                   <img
                     src={avatarURL}
                     alt={user?.name || "User avatar"}
                     className="w-full h-full object-cover"
                   />
                 )}
               </div>
               <ChevronDown className="w-3.5 h-3.5 text-[#777C78] dark:text-[#94A3B8]" />
             </button>
             
             {dropdownOpen && (
               <div className="absolute right-0 top-12 z-50 w-56 rounded-xl bg-white dark:bg-[#0F172A] shadow-xl border border-[#E7E5DE] dark:border-[#334155] py-2">
                 <div className="px-4 py-3 border-b border-[#F4F3EF] dark:border-[#334155]">
                   <p className="font-semibold text-[#111512] dark:text-white truncate">{user?.name}</p>
                   <p className="text-xs text-[#555A56] dark:text-[#94A3B8] truncate">{user?.email}</p>
                 </div>
                 <Link
                   href="/dashboard/profile"
                   onClick={() => setDropdownOpen(false)}
                   className="flex items-center gap-3 px-4 py-3 text-sm text-[#111512] dark:text-white hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors"
                 >
                   Profile
                 </Link>
                 {user?.role === "OWNER" && (
                   <Link
                     href="/dashboard/places"
                     onClick={() => setDropdownOpen(false)}
                     className="flex items-center gap-3 px-4 py-3 text-sm text-[#111512] dark:text-white hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors"
                   >
                     My Listings
                   </Link>
                 )}
                 <button
                   onClick={() => { logout(); setDropdownOpen(false); }}
                   disabled={loadingLogout}
                   className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                 >
                   {loadingLogout ? "Signing out..." : "Sign out"}
                 </button>
               </div>
             )}
           </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Link href="/dashboard/settings" className="p-2 rounded-lg text-[#555A56] dark:text-[#94A3B8]" aria-label="Settings">
            <Settings className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#111512] dark:text-white hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E5DE] dark:border-[#334155] bg-[#FAF9F6] dark:bg-[#0F172A] px-4 py-5 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#111512] dark:text-white hover:text-[#063C2F] dark:hover:text-[#14B8A6] px-2 py-1.5 rounded-md hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#E7E5DE] dark:border-[#334155] flex items-center justify-between">
            {user?.role === "OWNER" ? (
              <Link
                href="/dashboard/places"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#063C2F] dark:text-[#14B8A6]"
              >
                Listing Places
              </Link>
            ) : (
              <Link
                href="/become-owner"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#063C2F] dark:text-[#14B8A6]"
              >
                Become an Owner
              </Link>
            )}
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#111512] dark:text-white"
              >
                Profile
              </Link>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                disabled={loadingLogout}
                className="text-sm font-medium text-red-600 dark:text-red-400 disabled:opacity-50"
              >
                {loadingLogout ? "Signing out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
