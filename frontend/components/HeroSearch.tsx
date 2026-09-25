"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Sparkles } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Jakarta (All Districts)");
  const [date, setDate] = useState("Today, 24 Oct");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location && location !== "Jakarta (All Districts)") params.set("location", location);
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-[#0E1223] rounded-2xl shadow-xl shadow-black/[0.04] border border-[#E7E5DE] dark:border-[#334155] p-2.5 sm:p-3">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center"
      >
        {/* Search Query Input */}
        <div className="md:col-span-4 flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAF9F6] dark:hover:bg-[#1A1E2F] rounded-xl transition-colors">
          <Sparkles className="w-5 h-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-bold tracking-wider uppercase text-[#777C78] dark:text-[#94A3B8]">
              What are you looking for?
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Futsal court, studio, meeting..."
              className="w-full text-sm font-medium text-[#111512] dark:text-[#F8FAFC] bg-transparent border-none p-0 focus:outline-none placeholder:text-[#9CA19E] dark:placeholder:text-[#64748B]"
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-[#E7E5DE] dark:bg-[#334155]" />

        {/* Location Selector */}
        <div className="md:col-span-3 flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAF9F6] dark:hover:bg-[#1A1E2F] rounded-xl transition-colors cursor-pointer">
          <MapPin className="w-5 h-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-bold tracking-wider uppercase text-[#777C78] dark:text-[#94A3B8]">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm font-medium text-[#111512] dark:text-[#F8FAFC] bg-transparent border-none p-0 focus:outline-none cursor-pointer"
            >
              <option value="Jakarta (All Districts)">Jakarta (All Districts)</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Tangerang / BSD">Tangerang / BSD</option>
            </select>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-[#E7E5DE] dark:bg-[#334155]" />

        {/* Date Selector */}
        <div className="md:col-span-2 flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAF9F6] dark:hover:bg-[#1A1E2F] rounded-xl transition-colors cursor-pointer">
          <Calendar className="w-5 h-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-bold tracking-wider uppercase text-[#777C78] dark:text-[#94A3B8]">
              Date
            </label>
            <div className="text-sm font-medium text-[#111512] dark:text-[#F8FAFC] truncate">
              {date}
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-[#E7E5DE] dark:bg-[#334155]" />

        {/* Submit Button */}
        <div className="md:col-span-2 md:col-start-11 flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto h-12 px-6 rounded-xl bg-[#063C2F] hover:bg-[#075342] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] active:bg-[#042E25] text-white dark:text-[#0F172A] font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search Spaces</span>
          </button>
        </div>
      </form>
    </div>
  );
}
