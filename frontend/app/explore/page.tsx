"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "../../lib/api";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Filter,
  Check,
  Zap,
  ShieldCheck,
  Star,
  Map,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import PlaceCard, { PlaceCardProps } from "../../components/PlaceCard";

const explorePlaces: PlaceCardProps[] = [
  {
    id: "explore-1",
    title: "Lumina Daylight Loft",
    category: "DAYLIGHT PHOTO STUDIO",
    sqm: 240,
    rating: 4.98,
    reviewCount: 94,
    location: "Kemang",
    distance: "1.4 km",
    price: 350000,
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    instantBook: true,
    description:
      "Double-height glass frontage, south-facing daylight with blackout capabilities.",
  },
  {
    id: "explore-2",
    title: "Urban Arena Futsal",
    category: "FUTSAL & SPORTS ARENA",
    sqm: 800,
    rating: 4.9,
    reviewCount: 128,
    location: "Jakarta Barat",
    distance: "3.2 km",
    price: 150000,
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
    badge: "FIBA PARQUET",
    instantBook: false,
    description:
      "Interlock wood court engineered for competitive play with electronic scoreboard.",
  },
  {
    id: "explore-3",
    title: "Nordic Haven Creative Studio",
    category: "CREATIVE STUDIO & PODCAST",
    sqm: 180,
    rating: 4.95,
    reviewCount: 81,
    location: "Senopati",
    distance: "2.1 km",
    price: 400000,
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
    instantBook: false,
    description:
      "Acoustically isolated creator sanctuary tailored for lookbooks, podcasts, and recordings.",
  },
  {
    id: "explore-4",
    title: "Apex Grand Badminton Pavilion",
    category: "BADMINTON ARENA",
    sqm: 1200,
    rating: 4.89,
    reviewCount: 156,
    location: "BSD City",
    distance: "5.0 km",
    price: 110000,
    imageUrl:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80",
    instantBook: false,
    description:
      "Olympic standard BWF approved 5.0mm non-slip rubber surface with high ceiling clearance.",
  },
  {
    id: "explore-5",
    title: "Summit Boardroom & Suites",
    category: "EXECUTIVE BOARDROOM",
    sqm: 160,
    rating: 4.91,
    reviewCount: 42,
    location: "Kuningan",
    distance: "1.8 km",
    price: 250000,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    badge: "EXECUTIVE GRADE",
    instantBook: true,
    description:
      "Concealed Cisco telepresence system, sound-insulated glass, and ergonomic seating.",
  },
  {
    id: "explore-6",
    title: "Atelier High-Ceiling Gallery",
    category: "EVENT VENUE & GALLERY",
    sqm: 450,
    rating: 4.97,
    reviewCount: 67,
    location: "Menteng",
    distance: "4.3 km",
    price: 750000,
    imageUrl:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80",
    instantBook: false,
    description:
      "450 sqm open-format cathedral floor plan ideal for fashion shows, popups, and galas.",
  },
];

type PlaceListItem = {
  id: string;
  name: string;
  category: string;
  city: string;
  district?: string;
  price?: number;
  rating?: number;
  review_count?: number;
  image_url?: string;
};

type PlacesResponse = {
  items: PlaceListItem[];
  pagination: { total: number };
};

export default function ExplorePage() {
  const [places, setPlaces] = useState<PlaceCardProps[]>([]);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [placesError, setPlacesError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Photo Studio",
    "Futsal Courts",
  ]);
  const [instantBookOnly, setInstantBookOnly] = useState(true);
  const [superhostOnly, setSuperhostOnly] = useState(false);
  const [distanceRadius, setDistanceRadius] = useState("Within 5 km");
  const [ratingFilter, setRatingFilter] = useState("4.5 & above");
  const [sortBy, setSortBy] = useState("Recommended");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  useEffect(() => {
    let active = true;

    async function loadPlaces() {
      try {
        const data = await apiRequest<PlacesResponse>("/places?limit=12");
        if (!active) return;
        setPlaces(
          data.items.map((place) => ({
            id: place.id,
            title: place.name,
            category: place.category || "VENUE",
            city: place.district ? `${place.district}, ${place.city}` : place.city,
            price: place.price ?? 0,
            rating: place.rating ?? 0,
            reviewCount: place.review_count ?? 0,
            imageUrl: place.image_url,
          }))
        );
        setTotalPlaces(data.pagination.total);
      } catch (err) {
        if (active) setPlacesError(err instanceof Error ? err.message : "Could not load spaces.");
      }
    }

    loadPlaces();
    const refresh = window.setInterval(loadPlaces, 15000);
    return () => {
      active = false;
      window.clearInterval(refresh);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Search Controls Bar */}
      <div className="bg-white rounded-2xl border border-[#E7E5DE] p-3 sm:p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          {/* Location */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FAF9F6]">
            <MapPin className="w-4 h-4 text-[#777C78]" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#777C78]">
                Location
              </div>
              <div className="text-xs font-semibold text-[#111512]">
                Jakarta Selatan
              </div>
            </div>
          </div>

          {/* Space Type */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FAF9F6]">
            <SlidersHorizontal className="w-4 h-4 text-[#777C78]" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#777C78]">
                Space Type
              </div>
              <div className="text-xs font-semibold text-[#111512]">
                All Categories
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FAF9F6]">
            <Calendar className="w-4 h-4 text-[#777C78]" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#777C78]">
                Date
              </div>
              <div className="text-xs font-semibold text-[#111512]">
                Oct 24, 2025
              </div>
            </div>
          </div>

          {/* Time Slot */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FAF9F6]">
            <Clock className="w-4 h-4 text-[#777C78]" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#777C78]">
                Time Slot
              </div>
              <div className="text-xs font-semibold text-[#111512]">
                Any time
              </div>
            </div>
          </div>

          {/* Update Search Button */}
          <div>
            <button className="w-full h-11 rounded-xl bg-[#063C2F] hover:bg-[#075342] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-sm">
              <Search className="w-3.5 h-3.5" />
              <span>Update Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Title & Sorting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#063C2F]" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111512]">
              Curated Venues & Spaces
            </h1>
          </div>
          <p className="text-xs text-[#555A56] mt-0.5">
            Showing <span className="font-semibold text-[#111512]">{places.length || 0} verified spaces</span> in Jakarta Metropolitan
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#777C78]">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#E7E5DE] bg-white font-medium text-[#111512] focus:outline-none"
          >
            <option value="Recommended">Recommended</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Highest Rated">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Filters Sidebar + Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-1 bg-white rounded-2xl border border-[#E7E5DE] p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-[#F4F3EF] pb-4">
            <div className="flex items-center gap-2 font-bold text-sm text-[#111512]">
              <Filter className="w-4 h-4 text-[#063C2F]" />
              <span>Filters</span>
            </div>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setInstantBookOnly(false);
                setSuperhostOnly(false);
              }}
              className="text-xs text-[#777C78] hover:text-[#063C2F] font-medium"
            >
              Reset All
            </button>
          </div>

          {/* Quick Toggles: Instant Book & Superhost */}
          <div className="space-y-2.5">
            <label
              onClick={() => setInstantBookOnly(!instantBookOnly)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                instantBookOnly
                  ? "bg-[#FAF9F6] border-[#063C2F]"
                  : "border-[#E7E5DE] hover:bg-[#FAF9F6]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E8F0ED] flex items-center justify-center text-[#063C2F]">
                  <Zap className="w-4 h-4 fill-[#063C2F]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111512]">
                    Instant Book
                  </div>
                  <div className="text-[10px] text-[#777C78]">
                    Book without host wait
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={instantBookOnly}
                readOnly
                className="w-4 h-4 accent-[#063C2F] rounded"
              />
            </label>

            <label
              onClick={() => setSuperhostOnly(!superhostOnly)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                superhostOnly
                  ? "bg-[#FAF9F6] border-[#063C2F]"
                  : "border-[#E7E5DE] hover:bg-[#FAF9F6]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FAF9F6] border border-[#E7E5DE] flex items-center justify-center text-[#777C78]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111512]">
                    Superhost Venue
                  </div>
                  <div className="text-[10px] text-[#777C78]">
                    Top-tier verified hosts
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={superhostOnly}
                readOnly
                className="w-4 h-4 accent-[#063C2F] rounded"
              />
            </label>
          </div>

          {/* Venue Categories */}
          <div className="space-y-3 pt-2 border-t border-[#F4F3EF]">
            <h4 className="text-[10px] font-bold tracking-wider uppercase text-[#777C78]">
              Venue Category
            </h4>
            <div className="space-y-2">
              {[
                { name: "Photo Studio", count: 16 },
                { name: "Futsal Courts", count: 24 },
                { name: "Badminton Arena", count: 18 },
                { name: "Coworking Loft", count: 12 },
                { name: "Meeting Rooms", count: 9 },
                { name: "Event Venues", count: 5 },
              ].map((c) => {
                const isChecked = selectedCategories.includes(c.name);
                return (
                  <label
                    key={c.name}
                    className="flex items-center justify-between text-xs cursor-pointer py-1"
                    onClick={() => toggleCategory(c.name)}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-[#063C2F] border-[#063C2F] text-white"
                            : "border-[#D8D6CE] bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-[#111512] font-medium">{c.name}</span>
                    </div>
                    <span className="text-[#777C78] text-[11px]">{c.count}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3 pt-2 border-t border-[#F4F3EF]">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold tracking-wider uppercase text-[#777C78]">
                Price Range (Per Hour)
              </h4>
              <span className="text-[10px] text-[#777C78] font-bold">IDR</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-[#FAF9F6] rounded-xl border border-[#E7E5DE]">
                <div className="text-[9px] text-[#777C78]">Min</div>
                <div className="font-semibold text-[#111512]">Rp 50.000</div>
              </div>
              <div className="p-2 bg-[#FAF9F6] rounded-xl border border-[#E7E5DE]">
                <div className="text-[9px] text-[#777C78]">Max</div>
                <div className="font-semibold text-[#111512]">Rp 1.500.000</div>
              </div>
            </div>
          </div>

          {/* Distance Radius */}
          <div className="space-y-3 pt-2 border-t border-[#F4F3EF]">
            <h4 className="text-[10px] font-bold tracking-wider uppercase text-[#777C78]">
              Distance Radius
            </h4>
            <div className="flex items-center gap-2">
              {["Within 5 km", "10 km", "25 km"].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setDistanceRadius(dist)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    distanceRadius === dist
                      ? "bg-[#063C2F] text-white"
                      : "bg-[#FAF9F6] text-[#555A56] hover:bg-[#F4F3EF]"
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-3 pt-2 border-t border-[#F4F3EF]">
            <h4 className="text-[10px] font-bold tracking-wider uppercase text-[#777C78]">
              Minimum Rating
            </h4>
            <div className="flex items-center gap-2">
              {["4.5 & above", "4.0 & above"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRatingFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    ratingFilter === r
                      ? "bg-[#063C2F] text-white"
                      : "bg-[#FAF9F6] text-[#555A56] hover:bg-[#F4F3EF]"
                  }`}
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{r}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Facilities & Gear */}
          <div className="space-y-3 pt-2 border-t border-[#F4F3EF]">
            <h4 className="text-[10px] font-bold tracking-wider uppercase text-[#777C78]">
              Facilities & Gear
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { name: "Air Conditioning", checked: true },
                { name: "Shower & Locker Room", checked: true },
                { name: "High-Speed WiFi (300+ Mbps)", checked: true },
                { name: "Studio Lighting Rig", checked: false },
                { name: "Pro Sound Equipment", checked: false },
                { name: "Free Dedicated Parking", checked: false },
                { name: "Coffee & Refreshment Bar", checked: false },
              ].map((f) => (
                <label
                  key={f.name}
                  className="flex items-center gap-2.5 cursor-pointer py-0.5 text-[#555A56]"
                >
                  <input
                    type="checkbox"
                    defaultChecked={f.checked}
                    className="w-4 h-4 accent-[#063C2F] rounded"
                  />
                  <span>{f.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <button className="w-full py-3 rounded-xl bg-[#063C2F] hover:bg-[#075342] text-white font-semibold text-xs shadow-md transition-all">
            Apply Filters
          </button>
        </aside>

        {/* Right Results Column */}
        <div className="lg:col-span-3 space-y-8">
          {/* Places Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <PlaceCard key={place.id} {...place} />
            ))}
          </div>

          {/* Map View Banner */}
          <div className="bg-[#FAF9F6] rounded-2xl border border-[#E7E5DE] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E7E5DE] flex items-center justify-center text-[#063C2F] shadow-sm">
                <Map className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#111512]">
                  Explore Geographic Map View
                </h3>
                <p className="text-xs text-[#555A56] mt-0.5 max-w-md">
                  Switch to interactive radar map with instant transit times and neighborhood walkability scores.
                </p>
              </div>
            </div>

            <button className="px-5 py-2.5 rounded-xl bg-white border border-[#E7E5DE] hover:border-[#063C2F] text-[#111512] font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap">
              <span>Open Map View</span>
              <span className="text-sm">↗</span>
            </button>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E7E5DE] text-xs">
            <div className="text-[#777C78]">
              Showing <span className="font-semibold text-[#111512]">1 - 6</span> of 84 spaces
            </div>

            <div className="flex items-center gap-1.5">
              <button
                disabled
                className="px-3 py-1.5 rounded-lg border border-[#E7E5DE] text-[#9CA19E] flex items-center gap-1 cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button className="w-8 h-8 rounded-lg bg-[#063C2F] text-white font-semibold">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-[#E7E5DE] text-[#555A56] hover:bg-[#FAF9F6]">
                2
              </button>
              <button className="w-8 h-8 rounded-lg border border-[#E7E5DE] text-[#555A56] hover:bg-[#FAF9F6]">
                3
              </button>
              <span className="px-1 text-[#777C78]">…</span>
              <button className="w-8 h-8 rounded-lg border border-[#E7E5DE] text-[#555A56] hover:bg-[#FAF9F6]">
                8
              </button>

              <button className="px-3 py-1.5 rounded-lg border border-[#E7E5DE] text-[#111512] hover:bg-[#FAF9F6] flex items-center gap-1">
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
