"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, Check, Clock, Mail, Phone, ShieldCheck, Users } from "lucide-react";
import BookingSteps from "../../../components/BookingSteps";
import { images } from "../../../lib/demo-data";
import { useAuth } from "../../../context/AuthContext";
import { createBooking } from "../../../lib/api";

export default function ReviewBookingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [notes, setNotes] = useState("Please prepare 2 sets of scrimmage bibs and official size-4 futsal match ball.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateBooking = async () => {
    setLoading(true);
    setError("");
    try {
      const booking = await createBooking(
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "2026-10-24",
        "19:00",
        "21:00",
        notes
      );
      router.push(`/booking/payment?id=${booking.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-3 flex justify-between text-xs uppercase tracking-wider text-[#A58A54]">
          <span>Step 02 of 04</span>
          <span className="text-[#555A56]">Estimated checkout: ~1 min</span>
        </div>
        <BookingSteps current={2} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <section className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row">
            <img src={images.court} alt="Urban Arena" className="h-40 rounded-xl object-cover sm:w-48" />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A58A54]">Athletic Facility - Indoor Wood Flooring</p>
              <h1 className="mt-2 text-2xl font-bold">Urban Arena Futsal & Athletics Complex</h1>
              <p className="mt-2 text-sm text-[#555A56]">Futsal Court 01 - Puri Indah, Jakarta Barat</p>
              <p className="mt-4 text-sm">4.96 (128 reviews) - Instant Booking Active</p>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Schedule & Roster</h2>
              <button className="text-sm font-medium text-[#063C2F]">Change time</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [Calendar, "Reserved Date", "Friday, Oct 24, 2025", "Weekend Eve Slot"],
                [Clock, "Session Window", "19:00 - 21:00 WIB", "2.0 Hours Blocked"],
                [Users, "Capacity Cap", "10 Players", "Spectators allowed"],
              ].map(([Icon, label, value, hint]) => (
                <div key={String(label)} className="rounded-xl bg-[#F4F3EF] p-4">
                  <Icon className="mb-2 h-5 w-5 text-[#063C2F]" />
                  <p className="text-xs uppercase tracking-wider text-[#555A56]">{label as string}</p>
                  <p className="font-semibold">{value as string}</p>
                  <p className="text-xs text-[#777C78]">{hint as string}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Primary Contact Details</h2>
                <p className="text-sm text-[#555A56]">Booking vouchers and gate entry QR codes will be dispatched to this holder.</p>
              </div>
              <span className="rounded-full bg-[#F4F3EF] px-3 py-1 text-xs font-bold uppercase tracking-wider">Verified User</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="text-sm font-medium">Full Legal Name</span>
                <div className="mt-2 rounded-xl bg-[#F4F3EF] px-4 py-3">Dimas Pratama</div>
              </label>
              <label>
                <span className="text-sm font-medium">Email Address</span>
                <div className="mt-2 flex justify-between rounded-xl bg-[#F4F3EF] px-4 py-3">dimas.pratama@gmail.com <Mail className="h-4 w-4" /></div>
              </label>
              <label>
                <span className="text-sm font-medium">WhatsApp / Phone Number</span>
                <div className="mt-2 flex justify-between rounded-xl bg-[#F4F3EF] px-4 py-3">+62 812-8899-2311 <Phone className="h-4 w-4" /></div>
              </label>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Special Requests & Setup Notes</h2>
            <p className="mt-2 text-sm text-[#555A56]">Communicated directly to the venue operations manager prior to entry.</p>
            <textarea className="mt-4 h-28 w-full rounded-xl bg-[#F4F3EF] p-4 outline-none" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Please prepare 2 sets of scrimmage bibs..." />
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Enhance Your Session</h2>
            <div className="mt-4 space-y-3">
              {[
                ["Official Referee Service", "+Rp 100.000", true],
                ["Chilled Water Station & Dispensers", "Complimentary", true],
                ["4K Automated Overhead Video Recording", "+Rp 75.000", false],
              ].map(([title, price, checked]) => (
                <label key={title as string} className="flex items-center justify-between rounded-xl bg-[#F4F3EF] p-4">
                  <span className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={Boolean(checked)} className="h-5 w-5 accent-[#063C2F]" />
                    <span className="font-semibold">{title as string}</span>
                  </span>
                  <span className="font-bold">{price as string}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="rounded-2xl bg-white p-8 shadow-xl shadow-black/10">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Price Details</h2>
              <span className="rounded-md bg-[#F4F3EF] px-3 py-1 text-xs font-bold">2-HOUR RENTAL</span>
            </div>
            <div className="space-y-5 text-sm">
              {[
                ["Base Hourly Rate", "Rp 300.000", "Rp150.000 x 2 hrs"],
                ["Court Preparation & Pro Lighting", "Rp 25.000", "LED 500-lux tournament illumination"],
                ["RentSpace Concierge Fee (5%)", "Rp 15.000", "Host escrow & match liability cover"],
                ["Add-on: Certified Referee", "Rp 100.000", "2 hrs active whistle"],
              ].map(([label, value, hint]) => (
                <div key={label} className="flex justify-between gap-4">
                  <div><p>{label}</p><p className="text-xs text-[#777C78]">{hint}</p></div>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between rounded-xl bg-[#F4F3EF] p-5">
              <div><p className="text-xs uppercase tracking-wider text-[#555A56]">Total Payable</p><p className="text-xs text-[#777C78]">Includes local taxes</p></div>
              <p className="text-3xl font-bold">Rp 440.000</p>
            </div>
            {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button onClick={handleCreateBooking} disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#063C2F] py-4 font-semibold text-white hover:bg-[#075342] disabled:opacity-50">
              {loading ? "Creating Booking..." : "Continue to Payment"} <ArrowRight className="h-5 w-5" />
            </button>
            <div className="mt-6 space-y-2 text-xs text-[#555A56]">
              <p><ShieldCheck className="mr-2 inline h-4 w-4 text-[#A58A54]" />256-bit bank grade SSL encryption</p>
              <p><Check className="mr-2 inline h-4 w-4 text-[#A58A54]" />RentSpace Escrow Protection until kickoff</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

