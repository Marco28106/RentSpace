"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { getCategories } from "../lib/api";

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

export default function CategoryPills({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [active, setActive] = useState(selectedId || "");

  useEffect(() => {
    getCategories().then((res) => {
      const items = res.items.map((cat) => ({
        id: cat.id,
        name: cat.name,
        icon: Trophy,
      }));
      setCategories(items);
      if (items.length > 0 && !selectedId) {
        setActive(items[0].id);
      }
    });
  }, [selectedId]);

  const handleClick = (id: string) => {
    setActive(id);
    if (onSelect) onSelect(id);
  };

  return (
    <section id="categories" className="py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#777C78] dark:text-[#94A3B8]">
            Curated Typologies
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111512] dark:text-[#F8FAFC] mt-1">
            Browse by Space Type
          </h2>
        </div>
        <p className="text-sm text-[#555A56] dark:text-[#94A3B8] max-w-md">
          Tailored spaces designed for focus, athletic performance, and memorable creative productions.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = active === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all focus-visible:ring-2 focus-visible:ring-[#063C2F] dark:focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 ${
                isSelected
                  ? "bg-[#063C2F] dark:bg-[#14B8A6] text-white dark:text-[#020617] border-[#063C2F] dark:border-[#14B8A6] shadow-md shadow-[#063C2F]/10 dark:shadow-[#14B8A6]/10"
                  : "bg-white dark:bg-[#0E1223] text-[#111512] dark:text-[#F8FAFC] border-[#E7E5DE] dark:border-[#334155] hover:border-[#063C2F] dark:hover:border-[#334155] hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected ? "bg-white/15 dark:bg-[#020617]/10 text-white dark:text-[#020617]" : "bg-[#FAF9F6] dark:bg-[#1E293B] text-[#063C2F] dark:text-[#14B8A6]"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="text-xs font-semibold tracking-tight line-clamp-1">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
