"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarCheck, Grid2X2, Heart, Share2 } from "lucide-react"
import PlaceCard from "../../../components/PlaceCard"
import { getFavorites, removeFavorite } from "../../../lib/api"

export default function SavedSpacesPage() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const data = await getFavorites()
      setFavorites(data.items || [])
    } catch (err) {
      console.error("Failed to load favorites", err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (placeId: string) => {
    try {
      await removeFavorite(placeId)
      setFavorites((prev) => prev.filter((f) => f.place_id !== placeId))
    } catch (err) {
      console.error("Failed to remove favorite", err)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0F1C] text-[#111512] dark:text-[#F8FAFC]">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54] dark:text-[#F59E0B]">Personal Collection - {favorites.length} properties shortlisted</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-[#063C2F] dark:text-[#14B8A6]">Saved Spaces</h1>
          <p className="mt-4 max-w-2xl text-lg text-[#555A56] dark:text-[#94A3B8]">
            Curated collection of your favorite athletic arenas, creative lofts, and event sanctuaries held for upcoming sessions.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] px-4 py-3 text-sm font-medium text-[#111512] dark:text-[#F8FAFC] hover:bg-[#E7E5DE] dark:hover:bg-[#2D3547]"><Share2 className="mr-2 inline h-4 w-4" />Share Shortlist</button>
          <button className="rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] px-4 py-3 text-[#111512] dark:text-[#F8FAFC] hover:bg-[#E7E5DE] dark:hover:bg-[#2D3547]"><Grid2X2 className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["All Spaces " + favorites.length, "Sports & Athletic", "Photo & Daylight Studios", "Executive Suites"].map((tab) => (
            <button key={tab} className="rounded-full px-5 py-2 text-sm font-medium bg-[#F4F3EF] dark:bg-[#1A1E2F] text-[#111512] dark:text-[#F8FAFC] hover:bg-[#E7E5DE] dark:hover:bg-[#2D3547]">{tab.split(" ")[0]}</button>
          ))}
        </div>
        <p className="text-sm text-[#555A56] dark:text-[#94A3B8]">Sorted by Recently Saved</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-3 text-center py-8 text-[#555A56] dark:text-[#94A3B8]">Loading saved spaces...</div>
        ) : favorites.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-[#555A56] dark:text-[#94A3B8]">
            No saved spaces yet. Browse places and click Save to add them here.
            <Link href="/explore" className="ml-2 text-[#063C2F] dark:text-[#14B8A6] font-semibold hover:underline">Explore places</Link>
          </div>
        ) : (
          favorites.map((fav) => (
            <div key={fav.place_id} className="relative group">
              <PlaceCard 
                id={fav.place?.id} 
                title={fav.place?.name} 
                category={fav.place?.category?.name} 
                city={fav.place?.city} 
                price={fav.place?.pricing?.[0]?.price || 0}
                rating={fav.place?.review_summary?.average_rating || 0}
                reviewCount={fav.place?.review_summary?.review_count || 0}
                imageUrl={fav.place?.images?.[0]?.image_url || null}
              />
              <button 
                onClick={() => handleRemoveFavorite(fav.place_id)}
                className="absolute top-3 right-3 rounded-full bg-white/90 dark:bg-[#0B0F1C]/90 p-2 hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Remove from saved"
              >
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              </button>
            </div>
          ))
        )}
        <section className="rounded-2xl bg-[#063C2F] dark:bg-[#14B8A6] p-8 text-white dark:text-[#0B0F1C] lg:col-span-2">
          <div className="flex h-full min-h-[260px] flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#BFE6D8] dark:text-[#0B0F1C]">Priority Holding Hold</p>
            <h2 className="mt-4 max-w-lg text-3xl font-bold">Locks expire within 48 hours of reservation inquiry.</h2>
            <p className="mt-3 max-w-xl text-white/75 dark:text-[#0B0F1C]/75">Spaces in your personal collection maintain real-time slot synchronization. Book early to secure guaranteed production slots during peak weekend intervals.</p>
            <button className="mt-8 w-fit rounded-xl bg-white dark:bg-[#0B0F1C] px-6 py-3 font-semibold text-[#063C2F] dark:text-[#14B8A6] hover:bg-[#F4F3EF] dark:hover:bg-[#1A1E2F]">Discover More <ArrowRight className="ml-2 inline h-4 w-4" /></button>
          </div>
        </section>
        <section className="rounded-2xl bg-[#F4F3EF] dark:bg-[#1A1E2F] p-6 border border-[#E7E5DE] dark:border-[#334155]">
          <CalendarCheck className="mb-5 h-7 w-7 text-[#A58A54] dark:text-[#F59E0B]" />
          <h2 className="text-xl font-bold text-[#111512] dark:text-[#F8FAFC]">Batch Sync Availability</h2>
          <p className="mt-2 text-sm text-[#555A56] dark:text-[#94A3B8]">Cross-check open time slots for all 4 venues against your Google or Apple Calendar simultaneously.</p>
          <button className="mt-6 w-full rounded-xl bg-white dark:bg-[#0E1223] px-4 py-3 text-sm font-semibold text-[#111512] dark:text-[#F8FAFC] hover:bg-[#F4F3EF] dark:hover:bg-[#1A1E2F] border border-[#E7E5DE] dark:border-[#334155]">Check Calendar Matches</button>
        </section>
      </div>
    </div>
  )
}
