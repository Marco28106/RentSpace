"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getPlaces, getCategories } from "../../lib/api";
import {
  Search,
  MapPin,
  Filter,
  Check,
  Star,
  Map,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PlaceCard, { PlaceCardProps } from "../../components/PlaceCard";
import AnimatedGrid, { AnimatedItem } from "../../components/AnimatedGrid";
import { SkeletonGrid } from "../../components/SkeletonLoader";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function ExplorePage() {
  const [places, setPlaces] = useState<PlaceCardProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [instantBookOnly, setInstantBookOnly] = useState(false);
  const [distanceRadius, setDistanceRadius] = useState("Within 5 km");
  const [ratingFilter, setRatingFilter] = useState("4.5 & above");
  const [sortBy, setSortBy] = useState("Recommended");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [placesRes, categoriesRes] = await Promise.all([
          getPlaces(),
          getCategories(),
        ]);
        
         const items = (placesRes.items as any[]).map((p) => ({
           id: p.id,
           title: p.name,
           category: p.category?.name ?? "Venue",
           sqm: p.capacity,
           rating: p.review_summary?.average_rating ?? 4.9,
           reviewCount: p.review_summary?.review_count ?? 0,
           location: p.city,
           price: Math.round(p.price ?? 0),
           imageUrl: p.image_url ?? p.images?.[0]?.image_url ?? null,
           badge: p.status === "ACTIVE" ? "AVAILABLE" : undefined,
           instantBook: false,
         }));
        
        setPlaces(items);
        setCategories(categoriesRes.items || []);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredPlaces = places.filter((place) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(place.category || "")) {
      return false;
    }
    if (instantBookOnly && !place.instantBook) {
      return false;
    }
    const minRating = ratingFilter === "4.5 & above" ? 4.5 : 4.0;
    if ((place.rating || 0) < minRating) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      {/* Header */}
      <header className="bg-white dark:bg-[#0E1223] border-b border-[#E7E5DE] dark:border-[#334155] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
           <div>
             <h1 className="font-display text-3xl font-bold text-[#111512] dark:text-[#F8FAFC]">Explore</h1>
             <p className="text-xs text-[#777C78] dark:text-[#94A3B8] mt-0.5">{filteredPlaces.length} verified spaces</p>
           </div>
         </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title & Sort */}
        <div className="flex items-center justify-between mb-8 gap-4">
           <div>
            <h2 className="font-display text-3xl font-bold text-[#111512] dark:text-[#F8FAFC]">Curated Venues & Spaces</h2>
            <p className="text-xs text-[#555A56] dark:text-[#94A3B8] mt-0.5">Showing {filteredPlaces.length} verified spaces</p>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] text-sm font-medium text-[#111512] dark:text-[#F8FAFC]"
          >
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Rated</option>
          </select>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters */}
          <aside className="lg:col-span-1 bg-white dark:bg-[#0E1223] rounded-2xl border border-[#E7E5DE] dark:border-[#334155] p-5 space-y-6 h-fit sticky top-20">
            <div className="flex items-center justify-between border-b border-[#F4F3EF] dark:border-[#475569] pb-4">
              <div className="flex items-center gap-2 font-bold text-sm text-[#111512] dark:text-[#F8FAFC]">
                <Filter className="w-4 h-4 text-[#063C2F] dark:text-[#14B8A6]" />
                <span>Filters</span>
              </div>
            </div>

            {/* Instant Book */}
            <div className="space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#555A56] dark:text-[#94A3B8]">
                <input
                  type="checkbox"
                  checked={instantBookOnly}
                  onChange={(e) => setInstantBookOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#063C2F] dark:accent-[#14B8A6] rounded"
                />
                <span>Instant Book Only</span>
              </label>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-[#F4F3EF] dark:border-[#475569]">
                <h4 className="text-[10px] font-bold uppercase text-[#777C78] dark:text-[#94A3B8]">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer text-sm text-[#555A56] dark:text-[#94A3B8] hover:text-[#111512] dark:hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => toggleCategory(cat.name)}
                        className="w-4 h-4 accent-[#063C2F] dark:accent-[#14B8A6] rounded"
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Distance */}
            <div className="space-y-3 pt-2 border-t border-[#F4F3EF] dark:border-[#475569]">
              <h4 className="text-[10px] font-bold uppercase text-[#777C78] dark:text-[#94A3B8]">Distance Radius</h4>
              <div className="flex items-center gap-2">
                {[
                  "Within 5 km",
                  "10 km",
                  "25 km",
                ].map((dist) => (
                  <button
                    key={dist}
                    onClick={() => setDistanceRadius(dist)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      distanceRadius === dist
                        ? "bg-[#063C2F] dark:bg-[#14B8A6] text-white"
                        : "bg-[#FAF9F6] dark:bg-[#1E293B] text-[#555A56] dark:text-[#94A3B8] hover:bg-[#F4F3EF] dark:hover:bg-[#475569]"
                    }`}
                  >
                    {dist}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-3 pt-2 border-t border-[#F4F3EF] dark:border-[#475569]">
              <h4 className="text-[10px] font-bold uppercase text-[#777C78] dark:text-[#94A3B8]">Minimum Rating</h4>
              <div className="flex items-center gap-2">
                {["4.5 & above", "4.0 & above"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatingFilter(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      ratingFilter === r
                        ? "bg-[#063C2F] dark:bg-[#14B8A6] text-white"
                        : "bg-[#FAF9F6] dark:bg-[#1E293B] text-[#555A56] dark:text-[#94A3B8] hover:bg-[#F4F3EF] dark:hover:bg-[#475569]"
                    }`}
                  >
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{r}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-[#063C2F] dark:bg-[#14B8A6] hover:bg-[#075342] dark:hover:bg-[#0E7D75] text-white font-semibold text-xs transition-all" onClick={() => {
              setInstantBookOnly(instantBookOnly);
              setRatingFilter(ratingFilter);
              setDistanceRadius(distanceRadius);
            }}>
              Apply Filters
            </button>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3 space-y-8">
            {loading ? (
              <SkeletonGrid count={6} />
            ) : filteredPlaces.length === 0 ? (
              <div className="text-center py-12 text-[#777C78] dark:text-[#94A3B8]">
                {places.length === 0 ? "No spaces found" : "No spaces match your filters"}
              </div>
            ) : (
              <>
                <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlaces.map((place) => (
                    <AnimatedItem key={place.id}>
                      <PlaceCard {...place} />
                    </AnimatedItem>
                  ))}
                </AnimatedGrid>

                {/* Map Banner */}
                <div className="bg-[#FAF9F6] dark:bg-[#1E293B] rounded-2xl border border-[#E7E5DE] dark:border-[#334155] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#0E1223] border border-[#E7E5DE] dark:border-[#334155] flex items-center justify-center text-[#063C2F] dark:text-[#14B8A6]">
                      <Map className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#111512] dark:text-[#F8FAFC]">Explore Geographic Map View</h3>
                      <p className="text-xs text-[#555A56] dark:text-[#94A3B8] mt-0.5">Interactive map with transit times</p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#0E1223] border border-[#E7E5DE] dark:border-[#334155] hover:border-[#063C2F] dark:hover:border-[#14B8A6] text-[#111512] dark:text-[#F8FAFC] font-semibold text-xs transition-colors whitespace-nowrap">
                    Open Map
                  </button>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-1.5 pt-4 border-t border-[#E7E5DE] dark:border-[#334155]">
                  <button className="px-3 py-1.5 rounded-lg border border-[#E7E5DE] dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC] hover:bg-[#FAF9F6] dark:hover:bg-[#1E293B]">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#063C2F] dark:bg-[#14B8A6] text-white font-semibold">
                    1
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-[#E7E5DE] dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC] hover:bg-[#FAF9F6] dark:hover:bg-[#1E293B]">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
