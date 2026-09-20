import React from "react";
import Link from "next/link";
import { CalendarDays, Check, Download, MapPin, QrCode, ShieldCheck } from "lucide-react";
import BookingSteps from "../../../components/BookingSteps";
import { images } from "../../../lib/demo-data";

export default function BookingConfirmationPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <BookingSteps current={4} />

      <section className="mt-12 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#063C2F] text-white shadow-xl shadow-[#063C2F]/20">
          <Check className="h-10 w-10" />
        </div>
        <span className="mt-5 inline-block rounded-full bg-[#F4F3EF] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#A58A54]">
          Reservation Confirmed
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Booking Confirmed</h1>
        <p className="mx-auto mt-3 max-w-xl text-[#555A56]">
          Your reservation at Urban Arena Futsal has been successfully secured and registered with the venue host.
        </p>
      </section>

      <section className="mx-auto mt-10 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between bg-[#F4F3EF] px-6 py-5">
          <p className="text-sm uppercase tracking-wider">Reference: <span className="font-bold tracking-normal text-[#111512]">#RS-992014</span></p>
          <span className="rounded-full bg-[#063C2F] px-4 py-1.5 text-sm font-semibold text-white">Status: Confirmed</span>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <img src={images.court} alt="Urban Arena" className="h-28 w-32 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#A58A54]">Athletic Sanctuaries - Court 01</p>
              <h2 className="text-2xl font-bold">Urban Arena Futsal & Athletics Complex</h2>
              <p className="mt-1 text-sm text-[#555A56]"><MapPin className="mr-1 inline h-4 w-4" />Puri Indah, Kembangan, Jakarta Barat</p>
            </div>
            <div className="text-right">
              <p className="rounded-md bg-[#F4F3EF] px-3 py-1 text-xs uppercase tracking-wider">Standard Match Rate</p>
              <p className="mt-2 text-2xl font-bold">Rp 170.000<span className="text-sm font-normal text-[#777C78]">/hr</span></p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-y border-[#E7E5DE] py-6 sm:grid-cols-4">
            {[
              ["Date", "Friday", "Oct 24, 2025"],
              ["Time Window", "19:00 - 21:00", "2.0 Hours (WIB)"],
              ["Roster Limit", "10 Players", "Full Pitch Access"],
              ["Total Paid", "Rp 340.000", "Paid via QRIS"],
            ].map(([label, value, hint]) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-wider text-[#555A56]">{label}</p>
                <p className="mt-1 text-xl font-bold">{value}</p>
                <p className="text-sm text-[#777C78]">{hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-[180px_1fr]">
            <div className="rounded-xl bg-[#F4F3EF] p-5 text-center">
              <QrCode className="mx-auto h-28 w-28 text-[#063C2F]" />
              <p className="mt-2 text-xs font-bold uppercase tracking-wider">Gate Pass Key</p>
            </div>
            <div>
              <span className="rounded-md bg-[#F4F3EF] px-3 py-1 text-xs font-bold uppercase tracking-wider">Fast-track Entry</span>
              <h3 className="mt-3 text-xl font-bold">Turnstile & Reception Access Pass</h3>
              <p className="mt-2 text-[#555A56]">
                Scan this digital credential at the front reception kiosk or display it directly to the gate attendant.
              </p>
              <p className="mt-3 text-sm text-[#555A56]">Host: Hendra Wijaya (+62 812-3344-5566)</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 bg-[#F4F3EF] px-6 py-4 text-sm">
          <span className="font-medium"><CalendarDays className="mr-2 inline h-4 w-4" />Synchronize Schedule:</span>
          <button className="rounded-lg bg-white px-4 py-2">Google Calendar</button>
          <button className="rounded-lg bg-white px-4 py-2">Apple Calendar</button>
          <button className="rounded-lg bg-white px-4 py-2"><Download className="mr-1 inline h-4 w-4" />Download PDF Receipt</button>
        </div>
      </section>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {[
          ["Court Rules", "Non-marking indoor shoes required. Complimentary drinking water cooler at bench side."],
          ["Parking & Lockers", "Free basement parking for up to 5 cars with reservation ID."],
          ["Cancellation Policy", "Full refund available until 24 hours before game time."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl bg-white p-5 shadow-sm">
            <ShieldCheck className="mb-3 h-6 w-6 text-[#063C2F]" />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm text-[#555A56]">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 h-56 overflow-hidden rounded-2xl bg-[#E9E7E1]">
        <div className="h-full w-full bg-gradient-to-br from-[#D8D6CE] to-[#E7E5DE] flex items-center justify-center">
          <p className="text-[#777C78]">Map will display venue location</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/dashboard/bookings" className="rounded-xl bg-[#063C2F] px-8 py-4 font-semibold text-white hover:bg-[#075342]">View in My Bookings</Link>
        <Link href="/explore" className="rounded-xl bg-[#F4F3EF] px-8 py-4 font-semibold">Back to Explore</Link>
      </div>
    </div>
  );
}

