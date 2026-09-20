import React from "react";
import Link from "next/link";
import {
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Star,
  Users,
  Wifi,
} from "lucide-react";
import PlaceCard from "../../../components/PlaceCard";
import { formatIDR, images, savedSpaces } from "../../../lib/demo-data";

export default function PlaceDetailPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#555A56]">
        <span>Home / Studios / Jakarta Selatan / Lumina Daylight Loft</span>
        <div className="flex gap-2">
          <button className="rounded-full bg-white px-3 py-1.5 shadow-sm"><Share2 className="mr-1 inline h-3.5 w-3.5" />Share</button>
          <button className="rounded-full bg-white px-3 py-1.5 shadow-sm"><Heart className="mr-1 inline h-3.5 w-3.5" />Save</button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#F4F3EF] px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Daylight Photo & Production Loft</span>
        <span className="rounded-full bg-[#F4F3EF] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A58A54]">Superhost</span>
      </div>
      <h1 className="max-w-5xl text-3xl font-bold tracking-tight sm:text-5xl">Lumina Daylight Loft & Creative Studio</h1>
      <p className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#555A56]">
        <span><Star className="mr-1 inline h-4 w-4 fill-[#A58A54] text-[#A58A54]" />4.98 (94 verified reviews)</span>
        <span>•</span>
        <span><MapPin className="mr-1 inline h-4 w-4" />Kemang, Jakarta Selatan</span>
        <span>•</span>
        <span>180 m2 / P3 Studio</span>
      </p>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-2xl">
          <img src={images.studio} alt="Main studio" className="h-full min-h-[360px] w-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[images.studioAlt, images.meeting, images.gallery, images.court].map((image, index) => (
            <div key={image} className="relative overflow-hidden rounded-2xl bg-[#F4F3EF]">
              <img src={image} alt={`Venue gallery ${index + 1}`} className="h-full min-h-[170px] w-full object-cover" />
              {index === 3 && (
                <button className="absolute bottom-3 right-3 rounded-lg bg-white px-3 py-2 text-xs font-semibold shadow">
                  <Camera className="mr-1 inline h-4 w-4" /> View all 24 photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={images.host} alt="Host" className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">Hosted by Astrid Lindholm</p>
                  <p className="text-sm text-[#555A56]">Studio Director & Architect - 100% response rate</p>
                </div>
              </div>
              <button className="rounded-xl bg-[#F4F3EF] px-4 py-2 text-xs font-semibold">Contact Host</button>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Spatial Highlights</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Natural Northern Light", "Continuous diffused daylight from 6-meter clerestory windows."],
                ["Seamless Loading", "Dedicated industrial freight elevator to studio doors plus private parking bay."],
                ["Full Equipment Suite", "Profoto lights, paper backdrops, beauty grip, and C-stands."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl bg-[#F4F3EF] p-4">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-[#063C2F]" />
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#555A56]">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">About The Space</h2>
            <p className="mt-4 leading-relaxed text-[#555A56]">
              Conceived as an architectural sanctuary for discerning commercial campaigns, editorial portraiture, and executive offsites. Lumina Daylight Loft blends industrial volume with refined tactile finishes. The expansive 180-square-meter floor plan is grounded by honed natural limestone flooring that remains naturally cool and glare-free throughout Jakarta's peak afternoon hours.
            </p>
            <div className="mt-5 grid gap-3 rounded-xl bg-[#F4F3EF] p-4 text-sm sm:grid-cols-4">
              {["Ceiling height: 5.8 m", "Power supply: 16 kVA", "Cyclorama wall: 6m x 5m", "Sound noise: NC-30 Silent"].map((item) => (
                <div key={item} className="font-semibold">{item}</div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Included Amenities & Facilities</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {["Ultra High-Speed Wi-Fi", "Dual Multi-Split Inverter AC", "Dedicated Makeup & Styling Bay", "Private Dressing Room", "White Infinity Cyclorama", "Reinforced Production Parking"].map((item) => (
                <div key={item} className="flex gap-3 text-sm">
                  <Wifi className="mt-0.5 h-4 w-4 text-[#063C2F]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Studio Location</h2>
            <p className="mt-1 text-sm text-[#555A56]">Jl. Kemang Timur No. 42B, Bangka, Mampang Prapatan</p>
            <div className="mt-4 flex h-56 items-center justify-center rounded-xl bg-[#E9E7E1] text-sm text-[#555A56]">
              <MapPin className="mr-2 h-5 w-5 text-[#063C2F]" /> Lumina Daylight Loft - 3 min from COMO Park Kemang
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-black/10">
            <div className="flex items-end justify-between">
              <div><span className="text-2xl font-bold">{formatIDR(350000)}</span><span className="text-sm text-[#777C78]">/hour</span></div>
              <div className="text-sm"><Star className="inline h-4 w-4 fill-[#A58A54] text-[#A58A54]" /> 4.98 (94)</div>
            </div>
            <div className="mt-5 space-y-3 rounded-xl border border-[#E7E5DE] p-4 text-sm">
              <div className="flex justify-between"><span><Calendar className="mr-2 inline h-4 w-4" />Date</span><span>Thursday, Oct 24, 2025</span></div>
              <div className="flex justify-between"><span><Clock className="mr-2 inline h-4 w-4" />Time slot</span><span>10:00 - 14:00</span></div>
              <div className="flex justify-between"><span><Users className="mr-2 inline h-4 w-4" />Attendees</span><span>6 people</span></div>
            </div>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><span>Rp350.000 x 4 hours</span><span>Rp1.400.000</span></div>
              <div className="flex justify-between"><span>Cleaning & setup fee</span><span>Rp100.000</span></div>
              <div className="flex justify-between"><span>RentSpace concierge service</span><span>Rp75.000</span></div>
              <div className="border-t border-[#E7E5DE] pt-3 flex justify-between font-bold"><span>Total amount</span><span>Rp1.575.000</span></div>
            </div>
            <Link href="/booking/review" className="mt-5 block rounded-xl bg-[#063C2F] px-5 py-4 text-center font-semibold text-white hover:bg-[#075342]">
              Reserve & Continue
            </Link>
            <p className="mt-3 text-center text-xs text-[#777C78]">You won't be charged yet. Arrival has 24h to accept.</p>
            <div className="mt-5 space-y-2 text-xs text-[#555A56]">
              <p><ShieldCheck className="mr-2 inline h-4 w-4 text-[#063C2F]" />Free cancellation up to 24h before booking.</p>
              <p><ShieldCheck className="mr-2 inline h-4 w-4 text-[#063C2F]" />Instant confirmation ready.</p>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Alternative Daylight Studios in Jakarta</h2>
            <p className="text-sm text-[#555A56]">Explore verified high-ceiling daylight production lofts within 5 km.</p>
          </div>
          <Link href="/explore" className="text-sm font-semibold text-[#063C2F]">View all studios</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {savedSpaces.slice(0, 3).map((place) => <PlaceCard key={place.id} {...place} />)}
        </div>
      </section>
    </div>
  );
}

