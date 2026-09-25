"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  CheckCircle2,
  Heart,
  MapPin,
  Share2,
  Star,
  Wifi,
} from "lucide-react"
import { formatIDR } from "../../../lib/demo-data"
import PlaceCard from "../../../components/PlaceCard"
import PlaceGallery from "../../../components/PlaceGallery"
import BookingWidget from "../../../components/BookingWidget"
import ReviewsSection from "../../../components/ReviewsSection"
import HostCard from "../../../components/HostCard"
import { getPlace } from "../../../lib/api"
import { SkeletonDetail } from "../../../components/SkeletonLoader"

export default function PlaceDetailPage({ params }: { params: { id: string } }) {
  const [place, setPlace] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    loadPlaceDetails()
  }, [params.id])

  const loadPlaceDetails = async () => {
    try {
      const data = await getPlace(params.id)
      setPlace(data)
    } catch (err) {
      console.error("Failed to load place", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SkeletonDetail />
      </div>
    )
  }

  if (!place) {
    return <div className="mx-auto max-w-7xl px-4 py-8">Place not found</div>
  }

  const pricePerHour = place.price || place.pricing?.[0]?.price || 0
  const host = place.owner || {}

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0F1C] text-[#111512] dark:text-[#F8FAFC]">
      {/* Breadcrumb & Actions */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#555A56] dark:text-[#94A3B8]">
        <span>Home / Spaces / {place.city} / {place.name}</span>
        <div className="flex gap-2">
          <button className="rounded-full bg-white dark:bg-[#0E1223] px-3 py-1.5 shadow-sm border border-[#E7E5DE] dark:border-[#334155] hover:bg-[#F4F3EF] dark:hover:bg-[#1A1E2F]">
            <Share2 className="mr-1 inline h-3.5 w-3.5" />
            Share
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`rounded-full px-3 py-1.5 shadow-sm border transition ${
              isSaved
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                : "bg-white dark:bg-[#0E1223] border-[#E7E5DE] dark:border-[#334155]"
            }`}
          >
            <Heart className={`mr-1 inline h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#F4F3EF] dark:bg-[#1A1E2F] px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-[#E7E5DE] dark:border-[#334155]">
          {place.category?.name || "Category"}
        </span>
        {place.owner?.superhost && (
          <span className="rounded-full bg-[#FFF3CD] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A58A54]">
            ⭐ Superhost
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-3">{place.name}</h1>

      {/* Meta Info */}
      <p className="flex flex-wrap items-center gap-3 text-sm text-[#555A56] dark:text-[#94A3B8] mb-8">
        <span>
          <Star className="mr-1 inline h-4 w-4 fill-[#A58A54] text-[#A58A54]" />
          {place.review_summary?.average_rating?.toFixed(1)} ({place.review_summary?.review_count} reviews)
        </span>
        <span>•</span>
        <span>
          <MapPin className="mr-1 inline h-4 w-4" />
          {place.city}
        </span>
        <span>•</span>
        <span>{place.area || "-"} / {place.type || "-"}</span>
      </p>

      {/* Gallery */}
      <PlaceGallery images={place.images?.map((img: any) => img.image_url) || []} title={place.name} />

      {/* Main Grid */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Host Card */}
          <HostCard
            hostName={host.name || "Host"}
            hostAvatar={host.avatar_url}
            hostPhone={host.phone || ""}
            responseRate={host.response_rate || 100}
            verified={host.verified || false}
            superhost={host.superhost || false}
            joinDate={host.join_date || ""}
            reviewCount={place.review_summary?.review_count || 0}
          />

          {/* Pricing Section */}
          <section className="rounded-2xl bg-white dark:bg-[#0E1F2A] p-6 shadow-colored-md border border-[#E7E5DE] dark:border-[#334155]">
            <h2 className="font-display text-2xl font-bold">Pricing &amp; Availability</h2>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-brand">{formatIDR(pricePerHour)}</span>
              <span className="text-sm text-[#555A56] dark:text-[#94A3B8]">/hour</span>
            </div>
            {/* Optional: show daily schedule if needed – kept for backward compatibility */}
            {place.pricing?.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {place.pricing.map((p: any, i: number) => (
                  <div key={i} className="rounded-lg bg-gradient-to-br from-[#F4F3EF] to-[#FAF9F6] dark:from-[#1A1E2F] dark:to-[#0E1223] p-3 text-center border border-[#E7E5DE] dark:border-[#334155]">
                    <p className="text-xs font-semibold uppercase text-[#777C78] dark:text-[#94A3B8]">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][p.day_of_week] || 'Day'}</p>
                    <p className="font-display text-lg font-bold text-brand">{new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(p.price)}</p>
                  </div>
                ))}
              </div>
            )}
          </section>


          {/* Spatial Highlights */}
          <section className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-colored-md border border-[#E7E5DE] dark:border-[#334155]">
            <h2 className="font-display text-2xl font-bold">Spatial Highlights</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {place.highlights?.map((h: any, idx: number) => (
                <div key={idx} className="rounded-xl bg-gradient-to-br from-[#F4F3EF] to-[#FAF9F6] dark:from-[#1A1E2F] dark:to-[#0E1223] p-4 border border-[#E7E5DE] dark:border-[#334155] hover:shadow-colored-md transition-all duration-200">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-brand" />
                  <p className="font-semibold text-[#111512] dark:text-[#F8FAFC]">{h.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#555A56] dark:text-[#94A3B8]">{h.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* About The Space */}
          <section className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-colored-md border border-[#E7E5DE] dark:border-[#334155]">
            <h2 className="font-display text-2xl font-bold">About The Space</h2>
            <p className="mt-4 leading-relaxed text-[#555A56] dark:text-[#94A3B8]">{place.description}</p>
            <div className="mt-5 grid gap-3 rounded-xl bg-gradient-to-br from-[#F4F3EF] to-[#FAF9F6] dark:from-[#1A1E2F] dark:to-[#0E1223] p-4 text-sm sm:grid-cols-4 border border-[#E7E5DE] dark:border-[#334155]">
              {place.specs?.map((spec: string, i: number) => (
                <div key={i} className="font-semibold text-[#111512] dark:text-[#F8FAFC]">{spec}</div>
              ))}
            </div>
          </section>

          {/* Amenities & Facilities */}
          <section className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-colored-md border border-[#E7E5DE] dark:border-[#334155]">
            <h2 className="font-display text-2xl font-bold">Included Amenities &amp; Facilities</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {place.facilities?.map((f: any, i: number) => (
                <div key={i} className="flex gap-3 text-sm p-3 rounded-lg hover:bg-[#F4F3EF] dark:hover:bg-[#1A1E2F] transition-colors duration-200">
                  <Wifi className="mt-0.5 h-4 w-4 text-brand flex-shrink-0" />
                  <span className="text-[#111512] dark:text-[#F8FAFC]">{f.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Studio Location */}
          <section className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-colored-md border border-[#E7E5DE] dark:border-[#334155]">
            <h2 className="font-display text-2xl font-bold">Studio Location</h2>
            <p className="mt-2 text-sm text-[#555A56] dark:text-[#94A3B8]">{place.address}</p>
            <div className="mt-4 flex h-56 items-center justify-center rounded-xl bg-gradient-to-br from-[#E9E7E1] to-[#F4F3EF] dark:from-[#1A1E2F] dark:to-[#0E1223] text-sm text-[#555A56] dark:text-[#94A3B8] border border-[#E7E5DE] dark:border-[#334155]">
              <MapPin className="mr-2 h-5 w-5 text-brand" /> {place.name} - Map View
            </div>
          </section>

          {/* Reviews */}
          <ReviewsSection placeId={place.id} />
        </div>

        {/* Right Column – Sticky Booking */}
        <div className="lg:sticky lg:top-20 self-start">
          <BookingWidget
            placeId={place.id}
            pricePerHour={pricePerHour}
            hostPhone={host.phone || ""}
            hostName={host.name || ""}
          />
        </div>
      </div>

      {/* Related Spaces */}
      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Alternative {place.category?.name || "Studios"} in {place.city?.split(",")[1] || "Jakarta"}</h2>
            <p className="mt-2 text-sm text-[#555A56] dark:text-[#94A3B8]">Explore verified high‑ceiling daylight production lofts within 5 km.</p>
          </div>
          <Link href="/explore" className="text-sm font-semibold text-brand dark:text-[#14B8A6] hover:underline hover:underline-offset-2 transition-all">View all studios →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Placeholder related spaces */}
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-[#E7E5DE] dark:border-[#334155] hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-[#F4F3EF] dark:bg-[#1A1E2F] flex items-center justify-center">
                <span className="text-[#777C78] dark:text-[#94A3B8]">Space Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#111512] dark:text-[#F8FAFC]">Alternative Space {i}</h3>
                <p className="text-sm text-[#555A56] dark:text-[#94A3B8] mt-1">Similar venue in {place.city}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-brand">Rp 300.000</span>
                  <Link href="/explore" className="text-xs font-semibold text-[#063C2F] dark:text-[#14B8A6] hover:underline">View →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
