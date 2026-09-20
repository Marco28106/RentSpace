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
}: PlaceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const displayLocation = location || city;

  // Fallback high quality placeholder images based on category or id
  const displayImage =
    imageUrl ||
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80";

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="group bg-white rounded-2xl border border-[#E7E5DE] overflow-hidden hover:shadow-lg hover:shadow-black/[0.04] transition-all flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F3EF]">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {badge && (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white rounded-md">
              {badge}
            </span>
          )}
          {instantBook && (
            <span className="px-2 py-1 text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-[#063C2F] rounded-md flex items-center gap-1">
              <Zap className="w-3 h-3 fill-[#063C2F]" />
              <span>Instant Book</span>
            </span>
          )}
        </div>

        {/* Top Right Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md hover:bg-white text-white hover:text-red-500 flex items-center justify-center transition-colors z-10"
          aria-label="Save to favorites"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "stroke-[2]"
            }`}
          />
        </button>

        {/* Bottom Distance Pill (if provided) */}
        {distance && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white rounded-full flex items-center gap-1">
              <span>{location ? `${location} • ` : ""}{distance}</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line: Category / SQM + Rating */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-[#777C78] font-semibold tracking-wider uppercase mb-1.5">
            <span className="truncate">
              {category}
              {sqm ? ` • ${sqm} SQM` : ""}
            </span>
            <div className="flex items-center gap-1 text-[#111512] font-semibold flex-shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{rating.toFixed(2)}</span>
              <span className="text-[#777C78] font-normal">({reviewCount})</span>
            </div>
          </div>

          {/* Place Title */}
          <Link href={`/places/${id}`}>
            <h3 className="text-base font-bold text-[#111512] group-hover:text-[#063C2F] transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>

          {/* Location or snippet */}
          {description ? (
            <p className="text-xs text-[#555A56] mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          ) : displayLocation ? (
            <p className="text-xs text-[#555A56] mt-1 flex items-center gap-1 line-clamp-1">
              <MapPin className="w-3 h-3 text-[#777C78] flex-shrink-0" />
              <span>{displayLocation}</span>
            </p>
          ) : null}
        </div>

        {/* Footer: Price & CTA */}
        <div className="mt-4 pt-3 border-t border-[#F4F3EF] flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-[#111512]">
              {formattedPrice}
            </span>
            <span className="text-xs text-[#777C78]">/ hour</span>
          </div>

          <Link
            href={`/places/${id}`}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F4F3EF] text-[#063C2F] hover:bg-[#063C2F] hover:text-white transition-all flex items-center gap-1"
          >
            <span>Reserve</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
