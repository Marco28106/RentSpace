"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Star, MapPin, Zap } from "lucide-react";

export interface PlaceCardProps {
  id: string;
  title: string;
  category?: string;
  sqm?: number;
  rating?: number;
  reviewCount?: number;
  location?: string;
  city?: string;
  distance?: string;
  price: number;
  imageUrl?: string | null;
  badge?: string;
  instantBook?: boolean;
  description?: string;
  pricing?: Array<{ price: number; day_of_week?: number }>;
}

export default function PlaceCard({
  id,
  title,
  category = "VENUE",
  sqm,
  rating = 4.9,
  reviewCount = 50,
  location,
  city,
  distance,
  price,
  imageUrl,
  badge,
  instantBook,
  description,
  pricing,
}: PlaceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const displayLocation = location || city;

  const displayImage =
    imageUrl ||
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80";

  const effectivePrice = pricing && pricing.length > 0 ? pricing[0].price : price;

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(effectivePrice);

  return (
    <div className="group bg-white dark:bg-[#0E1223] rounded-2xl border border-[#E7E5DE] dark:border-[#334155] overflow-hidden hover:shadow-colored-lg dark:hover:shadow-black/20 hover:border-[#D8D6CE] dark:hover:border-[#475569] transition-all duration-300 flex flex-col h-full motion-safe:hover:scale-[1.02]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F3EF] dark:bg-[#1E293B]">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {badge && (
            <span className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider uppercase bg-accent-gold/90 backdrop-blur-md text-white rounded-lg shadow-md">
              {badge}
            </span>
          )}
          {instantBook && (
            <span className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider uppercase bg-white/95 dark:bg-[#0E1223]/95 backdrop-blur-md text-[#063C2F] dark:text-[#14B8A6] rounded-lg flex items-center gap-1 shadow-md">
              <Zap className="w-3 h-3 fill-[#063C2F] dark:fill-[#14B8A6]" />
              <span>Instant</span>
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 dark:bg-[#0E1223]/95 backdrop-blur-md hover:bg-white dark:hover:bg-[#1E293B] hover:shadow-lg active:scale-95 text-[#111512] hover:text-red-500 dark:text-[#94A3B8] dark:hover:text-red-500 flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 z-10"
          aria-label="Save to favorites"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "stroke-[1.5]"
            }`}
          />
        </button>
        {distance && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-3 py-1.5 text-[11px] font-semibold bg-black/70 backdrop-blur-md text-white rounded-full flex items-center gap-1 shadow-md">
              <span>{location ? `${location} • ` : ""}{distance}</span>
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-[10px] text-[#777C78] dark:text-[#94A3B8] font-semibold tracking-widest uppercase mb-2">
            <span className="truncate">
              {category}
              {sqm ? ` • ${sqm} SQM` : ""}
            </span>
            <div className="flex items-center gap-1.5 text-[#111512] dark:text-[#F8FAFC] font-semibold flex-shrink-0">
              <Star className="w-3.5 h-3.5 text-accent-gold fill-accent-gold" />
              <span className="text-sm">{rating.toFixed(1)}</span>
              <span className="text-[10px] text-[#777C78] dark:text-[#94A3B8] font-normal">({reviewCount})</span>
            </div>
          </div>
          <Link href={`/places/${id}`}>
            <h3 className="font-display text-lg font-bold text-[#111512] dark:text-[#F8FAFC] group-hover:text-brand dark:group-hover:text-[#14B8A6] transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
          </Link>
          {description ? (
            <p className="text-xs text-[#555A56] dark:text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed">
              {description}
            </p>
          ) : displayLocation ? (
            <p className="text-xs text-[#555A56] dark:text-[#94A3B8] mt-2 flex items-center gap-1.5 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-brand flex-shrink-0" />
              <span>{displayLocation}</span>
            </p>
          ) : null}
        </div>
        <div className="mt-5 pt-4 border-t border-[#F4F3EF] dark:border-[#334155] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-xl font-bold text-[#111512] dark:text-[#F8FAFC]">
              {formattedPrice}
            </span>
            <span className="text-xs text-[#777C78] dark:text-[#94A3B8]">/ hour</span>
          </div>
          <Link
            href={`/booking/${id}`}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-brand text-white hover:bg-brand-hover dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center gap-1"
          >
            <span>Reserve</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
