import React from "react";
import { ArrowRight, CalendarCheck, Grid2X2, Heart, Share2 } from "lucide-react";
import PlaceCard from "../../../components/PlaceCard";
import { savedSpaces } from "../../../lib/demo-data";

export default function SavedSpacesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Personal Collection - 4 properties shortlisted</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-[#063C2F]">Saved Spaces</h1>
          <p className="mt-4 max-w-2xl text-lg text-[#555A56]">
            Curated collection of your favorite athletic arenas, creative lofts, and event sanctuaries held for upcoming sessions.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-xl bg-[#F4F3EF] px-4 py-3 text-sm font-medium"><Share2 className="mr-2 inline h-4 w-4" />Share Shortlist</button>
          <button className="rounded-xl bg-[#F4F3EF] px-4 py-3"><Grid2X2 className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["All Spaces 4", "Sports & Athletic 2", "Photo & Daylight Studios 1", "Executive Suites 1"].map((tab, index) => (
            <button key={tab} className={`rounded-full px-5 py-2 text-sm font-medium ${index === 0 ? "bg-[#063C2F] text-white" : "bg-[#F4F3EF]"}`}>{tab}</button>
          ))}
        </div>
        <p className="text-sm text-[#555A56]">Sorted by Recently Saved</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {savedSpaces.slice(0, 3).map((place) => <PlaceCard key={place.id} {...place} />)}
        <PlaceCard {...savedSpaces[3]} />
        <section className="rounded-2xl bg-[#063C2F] p-8 text-white lg:col-span-2">
          <div className="flex h-full min-h-[260px] flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#BFE6D8]">Priority Holding Hold</p>
            <h2 className="mt-4 max-w-lg text-3xl font-bold">Locks expire within 48 hours of reservation inquiry.</h2>
            <p className="mt-3 max-w-xl text-white/75">Spaces in your personal collection maintain real-time slot synchronization. Book early to secure guaranteed production slots during peak weekend intervals.</p>
            <button className="mt-8 w-fit rounded-xl bg-white px-6 py-3 font-semibold text-[#063C2F]">Discover More <ArrowRight className="ml-2 inline h-4 w-4" /></button>
          </div>
        </section>
        <section className="rounded-2xl bg-[#F4F3EF] p-6">
          <CalendarCheck className="mb-5 h-7 w-7 text-[#A58A54]" />
          <h2 className="text-xl font-bold">Batch Sync Availability</h2>
          <p className="mt-2 text-sm text-[#555A56]">Cross-check open time slots for all 4 venues against your Google or Apple Calendar simultaneously.</p>
          <button className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold">Check Calendar Matches</button>
        </section>
      </div>

      <section className="mt-10 flex flex-col gap-5 rounded-2xl bg-[#F4F3EF] p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white"><Heart className="h-6 w-6 text-[#063C2F]" /></span>
          <div><h2 className="text-2xl font-bold">Need spaces for a custom tournament or production shoot?</h2><p className="text-[#555A56]">RentSpace Private Concierge handles full-day arena buyouts and customized logistics.</p></div>
        </div>
        <button className="rounded-xl bg-[#063C2F] px-6 py-3 font-semibold text-white">Contact Concierge</button>
      </section>
    </div>
  );
}

