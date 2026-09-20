"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroSearch from "../components/HeroSearch";
import CategoryPills from "../components/CategoryPills";
import PlaceCard, { PlaceCardProps } from "../components/PlaceCard";
import HyperlocalSpaces from "../components/HyperlocalSpaces";
import WhyRentSpace from "../components/WhyRentSpace";
import CtaBanner from "../components/CtaBanner";

const apiBase =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const initialPremierSpaces: PlaceCardProps[] = [
  {
    id: "place-1",
    title: "Urban Arena Futsal",
    category: "FUTSAL ARENA",
    sqm: 800,
    rating: 4.9,
    reviewCount: 128,
    location: "Jakarta Barat (Puri Indah)",
    price: 150000,
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
    badge: "VERIFIED HOST",
    instantBook: true,
  },
  {
    id: "place-2",
    title: "Lumina Daylight Loft",
    category: "DAYLIGHT PHOTO STUDIO",
    sqm: 240,
    rating: 4.98,
    reviewCount: 94,
    location: "Kemang, Jakarta Selatan",
    price: 350000,
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    badge: "SUPERHOST",
    instantBook: false,
  },
  {
    id: "place-3",
    title: "The Glasshouse Executive Suite",
    category: "MEETING & CONFERENCE",
    sqm: 160,
    rating: 4.92,
    reviewCount: 64,
    location: "SCBD Sudirman, Jakarta",
    price: 280000,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    badge: "EXECUTIVE GRADE",
    instantBook: false,
  },
  {
    id: "place-4",
    title: "Apex Badminton Pavilion",
    category: "SPORTS PAVILION • 5 COURTS",
    sqm: 1200,
    rating: 4.88,
    reviewCount: 210,
    location: "BSD City, Tangerang",
    price: 95000,
    imageUrl:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80",
    badge: "BWF STANDARD",
    instantBook: false,
  },
];

export default function Home() {
  const [places, setPlaces] = useState<PlaceCardProps[]>(initialPremierSpaces);

  useEffect(() => {
    let mounted = true;
    function loadPlaces() {
      fetch(`${apiBase}/places?limit=4`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          if (!mounted) return;
          const items = data?.data?.items || data?.items;
          if (Array.isArray(items) && items.length > 0) {
            const mapped: PlaceCardProps[] = items.slice(0, 4).map((p: any, idx: number) => ({
              id: p.id || `place-${idx + 1}`,
              title: p.name || p.title || initialPremierSpaces[idx % 4].title,
              category: p.category || initialPremierSpaces[idx % 4].category,
              sqm: p.sqm || initialPremierSpaces[idx % 4].sqm,
              rating: p.rating || initialPremierSpaces[idx % 4].rating,
              reviewCount: p.review_count || initialPremierSpaces[idx % 4].reviewCount,
              location: p.city ? `${p.city}` : initialPremierSpaces[idx % 4].location,
              price: p.price || initialPremierSpaces[idx % 4].price,
              imageUrl: p.image_url || initialPremierSpaces[idx % 4].imageUrl,
              badge: p.badge || initialPremierSpaces[idx % 4].badge,
              instantBook: p.instant_book ?? initialPremierSpaces[idx % 4].instantBook,
            }));
            setPlaces(mapped);
          }
        })
        .catch(() => {
          // Keep initialPremierSpaces fallback
        });
    }

    loadPlaces();
    const refresh = setInterval(loadPlaces, 15000);

    return () => {
      mounted = false;
      clearInterval(refresh);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E7E5DE] text-[11px] font-bold tracking-wider uppercase text-[#777C78]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#063C2F]" />
          <span>Architectural Sanctuaries & Athletic Arenas</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111512] max-w-4xl mx-auto leading-[1.15]">
          Find the right space for every plan.
        </h1>

        <p className="text-sm sm:text-base text-[#555A56] max-w-2xl mx-auto leading-relaxed">
          Discover and book trusted spaces for sports, work, creativity, and events across premier locations.
        </p>

        {/* Hero Visual Card with Featured Banner */}
        <div className="relative mt-8 rounded-3xl overflow-hidden border border-[#E7E5DE] shadow-xl aspect-[16/8] sm:aspect-[21/9] min-h-[320px]">
          <img
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1800&auto=format&fit=crop&q=80"
            alt="Arena Sports Complex Court 01"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Featured Arena Info Overlay */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-left text-white max-w-xl">
            <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Featured Arena
            </span>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight mt-2 text-white">
              Arena Sports Complex — Court 01
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1 hidden sm:block">
              West Jakarta (Puri Indah) • FIBA Parquet court with 500-seat spectator gallery
            </p>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="-mt-10 sm:-mt-12 relative z-20 px-2 sm:px-4">
          <HeroSearch />
        </div>
      </section>

      {/* Category Pills: Browse by Space Type */}
      <CategoryPills />

      {/* Curated Premier Spaces */}
      <section className="py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#777C78]">
              Excellence in Craft
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111512] mt-1">
              Curated Premier Spaces
            </h2>
          </div>
          <Link
            href="/explore"
            className="text-xs sm:text-sm font-semibold text-[#111512] hover:text-[#063C2F] flex items-center gap-1.5 transition-colors group"
          >
            <span>View all curated listings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {places.map((place) => (
            <PlaceCard key={place.id} {...place} />
          ))}
        </div>
      </section>

      {/* Hyperlocal Spaces */}
      <HyperlocalSpaces />

      {/* Why RentSpace */}
      <WhyRentSpace />

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}
