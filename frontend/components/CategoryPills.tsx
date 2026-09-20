"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Activity,
  CircleDot,
  Camera,
  Briefcase,
  Laptop,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  icon: React.ElementType;
}

const categories: CategoryItem[] = [
  { id: "futsal", name: "Futsal Courts", count: "38 Arenas", icon: Trophy },
  { id: "badminton", name: "Badminton", count: "54 Halls", icon: Activity },
  { id: "basketball", name: "Basketball", count: "22 Courts", icon: CircleDot },
  { id: "photo-studio", name: "Photo Studios", count: "46 Lofts", icon: Camera },
  { id: "meeting-room", name: "Meeting Suites", count: "70 Boardrooms", icon: Briefcase },
  { id: "coworking", name: "Coworking", count: "90 Desks", icon: Laptop },
  { id: "classroom", name: "Classrooms", count: "31 Workshops", icon: GraduationCap },
  { id: "event", name: "Event & Gala", count: "19 Mansions", icon: Sparkles },
];

export default function CategoryPills({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const [active, setActive] = useState(selectedId || "photo-studio");

  const handleClick = (id: string) => {
    setActive(id);
    if (onSelect) onSelect(id);
  };

  return (
    <section id="categories" className="py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#777C78]">
            Curated Typologies
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111512] mt-1">
            Browse by Space Type
          </h2>
        </div>
        <p className="text-sm text-[#555A56] max-w-md">
          Tailored spaces designed for focus, athletic performance, and memorable creative productions.
        </p>
      </div>

      {/* Categories Horizontal Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = active === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                isSelected
                  ? "bg-[#063C2F] text-white border-[#063C2F] shadow-md shadow-[#063C2F]/10 scale-[1.02]"
                  : "bg-white text-[#111512] border-[#E7E5DE] hover:border-[#D8D6CE] hover:bg-[#FAF9F6]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected ? "bg-white/15 text-white" : "bg-[#FAF9F6] text-[#063C2F]"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="text-xs font-semibold tracking-tight line-clamp-1">
                {cat.name}
              </span>
              <span
                className={`text-[10px] mt-1 ${
                  isSelected ? "text-white/70" : "text-[#777C78]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
