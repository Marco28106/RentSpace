"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Banknote, CalendarClock, CheckCircle2, ShieldCheck, Shuffle, Sparkles } from "lucide-react";
import { images } from "../../lib/demo-data";

export default function BecomeOwnerPage() {
  const router = useRouter();

  function handleBecomeOwner() {
    router.push("/register?role=owner");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="rounded-full bg-[#F4F3EF] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#A58A54]">Host & Venue Partner Program</span>
          <h1 className="mt-5 max-w-xl text-5xl font-bold leading-tight tracking-tight">List your space on RentSpace and maximize your venue revenue.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#555A56]">
            Join Indonesia's premier marketplace for physical sanctuaries, from Olympic-standard sports arenas to daylight photography lofts and executive suites.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleBecomeOwner}
              className="rounded-xl bg-[#063C2F] px-6 py-3 font-semibold text-white hover:bg-[#075342] inline-flex items-center"
            >
              Register as Owner
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </button>
            <button className="rounded-xl bg-white px-6 py-3 font-semibold shadow-sm">Calculate Your Venue Earnings</button>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6">
            <div><p className="text-2xl font-bold">98.4%</p><p className="text-xs text-[#555A56]">Host Satisfaction</p></div>
            <div><p className="text-2xl font-bold">4.8x</p><p className="text-xs text-[#555A56]">Yield Increase</p></div>
            <div><p className="text-2xl font-bold">100%</p><p className="text-xs text-[#555A56]">Guaranteed Escrow</p></div>
          </div>
        </div>
        <div className="relative min-h-[560px]">
          <div className="absolute right-8 top-0 w-[70%] overflow-hidden rounded-2xl shadow-xl">
            <img src={images.court} alt="Arena Sports Complex" className="h-80 w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-5 text-white">
              <p className="text-xs uppercase tracking-wider">Athletic Infrastructure</p>
              <h2 className="text-xl font-bold">Arena Sports Complex</h2>
            </div>
          </div>
          <div className="absolute bottom-6 left-4 w-[62%] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <img src={images.studio} alt="Lumina Studio" className="h-56 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs uppercase tracking-wider text-[#A58A54]">Photo Loft</p>
              <h2 className="text-xl font-bold">Lumina Studio</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Designed for property owners</p><h2 className="mt-3 text-3xl font-bold">Engineered for seamless operations</h2></div>
          <p className="max-w-md text-sm text-[#555A56]">Every integration is designed to run silently in the background, eliminating manual coordination while maximizing yield.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            [Sparkles, "Automated Gate & Turnstile Integration", "Smart IoT QR turnstile codes distributed automatically."],
            [Banknote, "Guaranteed Escrow Payouts", "No unpaid slots or late cancellations."],
            [Shuffle, "Dynamic Scheduling & CalSync", "Avoid double-bookings with instant two-way sync."],
            [ShieldCheck, "Curated High-Value Clientele", "Verified athletes, registered productions, and enterprise partners."],
          ].map(([Icon, title, text]) => (
            <div key={title as string} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4F3EF]"><Icon className="h-5 w-5 text-[#063C2F]" /></span>
              <h3 className="mt-5 font-bold">{title as string}</h3>
              <p className="mt-2 text-sm text-[#555A56]">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-black/5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#A58A54]">Venue Revenue Simulator</p>
          <h2 className="mt-2 text-2xl font-bold">Calculate Your Potential Yield</h2>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {["Futsal Arena", "Daylight Loft", "Executive Suite"].map((item, index) => (
              <button key={item} className={`rounded-lg px-4 py-2 text-sm ${index === 0 ? "bg-[#063C2F] text-white" : "bg-[#F4F3EF]"}`}>{item}</button>
            ))}
          </div>
          <div className="mt-8 space-y-6">
            <div><div className="flex justify-between text-sm"><span>Units / Capacity</span><span>1 Court</span></div><input type="range" defaultValue="1" min="1" max="5" className="mt-3 w-full accent-[#063C2F]" /></div>
            <div><div className="flex justify-between text-sm"><span>Estimated Hours / Week</span><span>25 hrs</span></div><input type="range" defaultValue="25" min="5" max="60" className="mt-3 w-full accent-[#063C2F]" /></div>
          </div>
          <div className="mt-8 rounded-2xl bg-[#F4F3EF] p-6">
            <p className="text-xs uppercase tracking-wider text-[#555A56]">Estimated Monthly Earnings</p>
            <p className="mt-2 text-5xl font-bold leading-tight">Rp 15.000.000 - Rp 22.500.000</p>
            <button className="mt-5 rounded-xl bg-[#063C2F] px-5 py-3 font-semibold text-white">Claim Estimate</button>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#A58A54]">Host Onboarding</p>
          <h2 className="mt-2 text-3xl font-bold">Simple 3-step activation</h2>
          <p className="mt-2 text-[#555A56]">Publish once, automate permanently. Our onboarding concierge ensures listings convert fast.</p>
          <div className="mt-6 space-y-4">
            {[
              ["Publish Your Space Profile", "Upload high-res photos, floor dimensions, amenities, and hourly pricing."],
              ["Automate Your Availability", "Set custom operational hours and maintenance buffers."],
              ["Receive Bookings & Grow", "Welcome verified guests while automatic payments disburse to your account."],
            ].map(([title, text], index) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-[#F4F3EF] p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#063C2F] text-sm font-bold text-white">0{index + 1}</span>
                <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm text-[#555A56]">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Owner Endorsements</p>
        <h2 className="mt-3 text-center text-3xl font-bold">Proven results across Indonesia</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            ["Hendra Wijaya", "RentSpace transformed our weekday off-peak court occupancy by 68% with automated turnstile access."],
            ["Astrid Lindholm", "The caliber of production teams RentSpace brings has made booking completely effortless."],
          ].map(([name, quote]) => (
            <blockquote key={name} className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-[#555A56]">"{quote}"</p>
              <p className="mt-6 font-bold">{name}</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl bg-[#063C2F] px-6 py-16 text-center text-white shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#BFE6D8]">Zero upfront cost</p>
        <h2 className="mx-auto mt-3 max-w-xl text-4xl font-bold">Ready to elevate your venue?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">List your space in minutes and let RentSpace handle discovery, access credentials, and secure escrow payouts.</p>
        <button
          onClick={handleBecomeOwner}
          className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-[#063C2F] inline-flex items-center"
        >
          Register as Owner
          <ArrowRight className="ml-2 inline h-4 w-4" />
        </button>
      </section>
    </div>
  );
}

