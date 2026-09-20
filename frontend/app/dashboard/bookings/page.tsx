import React from "react";
import Link from "next/link";
import { CalendarDays, HelpCircle, MapPin, MessageSquare, Plane, QrCode, Search, Star } from "lucide-react";
import { images } from "../../../lib/demo-data";

export default function BookingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Reservation Management</p>
      <div className="mt-2 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-[#063C2F]">My Bookings</h1>
          <p className="mt-4 max-w-2xl text-xl text-[#555A56]">Manage your upcoming reservations, view past venue bookings, and access digital check-in passes.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#F4F3EF] p-4">
          <div><p className="text-2xl font-bold">2</p><p className="text-sm">Active Passes</p></div>
          <div><p className="text-2xl font-bold">Ready</p><p className="text-sm">Keyless Access</p></div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-[#F4F3EF] p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2">
          {["Upcoming 2", "Completed 8", "Cancelled 1"].map((item, index) => (
            <button key={item} className={`rounded-xl px-5 py-3 text-sm font-medium ${index === 0 ? "bg-white shadow-sm" : ""}`}>{item}</button>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-[#777C78]"><Search className="h-4 w-4" />Search reference or venue...</div>
          <button className="rounded-xl bg-white px-4 py-3 text-sm">Date: Nearest first</button>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {[
          [images.court, "Urban Arena Futsal & Athletics Complex - Court 01", "Confirmed - Upcoming", "Friday, Oct 24, 2025", "Rp 340.000", true],
          [images.studio, "Lumina Daylight Loft & Creative Studio", "Confirmed", "Saturday, Nov 08, 2025", "Rp 1.575.000", false],
        ].map(([image, title, status, date, price, primary]) => (
          <article key={title as string} className="overflow-hidden rounded-2xl bg-white shadow-sm lg:grid lg:grid-cols-[420px_1fr]">
            <div className="relative min-h-[260px]">
              <img src={image as string} alt={title as string} className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-[#063C2F] px-4 py-2 text-sm font-semibold text-white">{status as string}</span>
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#555A56]">Futsal & Athletic - Puri Indah, Jakarta Barat</p>
              <h2 className="mt-3 text-3xl font-bold">{title as string}</h2>
              <div className="mt-5 grid gap-3 rounded-xl bg-[#F4F3EF] p-4 sm:grid-cols-3">
                <div><CalendarDays className="mb-1 h-5 w-5" /><p className="font-semibold">{date as string}</p><p className="text-sm text-[#555A56]">19:00 - 21:00 WIB</p></div>
                <div><Star className="mb-1 h-5 w-5" /><p className="font-semibold">Facility Specs</p><p className="text-sm text-[#555A56]">Court 01 - Included gear</p></div>
                <div><p className="font-semibold">Payment Total</p><p>{price as string}</p><p className="text-sm text-[#555A56]">Paid via QRIS Instant</p></div>
              </div>
              <div className="mt-5 rounded-xl bg-[#E8F0ED] px-4 py-3 text-sm text-[#063C2F]">
                Digital gate code activates 15 minutes before slot at Entrance B-2.
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link href="/booking/detail" className="rounded-xl bg-[#063C2F] px-5 py-3 font-semibold text-white">View Details</Link>
                <button className="rounded-xl bg-[#F4F3EF] px-5 py-3 font-semibold"><Plane className="mr-2 inline h-4 w-4" />Directions</button>
                <button className="ml-auto text-sm">Cancel Booking</button>
                <button className="text-sm"><HelpCircle className="mr-1 inline h-4 w-4" />Help</button>
              </div>
            </div>
          </article>
        ))}

        <article className="flex flex-col gap-4 rounded-2xl bg-[#F4F3EF] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white"><Search className="h-7 w-7" /></span>
            <div><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">Completed</span><h2 className="mt-2 text-2xl font-bold">Apex Grand Badminton Pavilion</h2><p className="text-[#555A56]">BSD City, Tangerang - Synthetic Court 04 - Ref: #RS-772901</p></div>
          </div>
          <div className="flex gap-3"><button className="rounded-xl bg-white px-5 py-3">Book Again</button><button className="rounded-xl bg-white px-5 py-3"><Star className="mr-1 inline h-4 w-4" />Leave a Review</button></div>
        </article>

        <div className="flex flex-col gap-4 rounded-2xl bg-[#F4F3EF] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-2xl font-bold">Need bespoke modifications or corporate invoicing?</h2><p className="text-[#555A56]">Our spatial concierge is on call 24/7 to adjust operational requirements.</p></div>
          <button className="rounded-xl bg-[#063C2F] px-6 py-3 font-semibold text-white"><MessageSquare className="mr-2 inline h-4 w-4" />Contact Concierge Desk</button>
        </div>
      </div>
    </div>
  );
}

