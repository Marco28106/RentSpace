import React from "react";
import Link from "next/link";
import { CalendarDays, Download, MapPin, MessageSquare, QrCode, ShieldCheck } from "lucide-react";
import { images } from "../../../lib/demo-data";

export default function BookingDetailPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Booking Detail</p>
          <h1 className="mt-3 text-4xl font-bold">Urban Arena Futsal - Court 01</h1>
          <p className="mt-2 text-[#555A56]">Reference #RS-992014 - Confirmed and ready for access.</p>
        </div>
        <span className="w-fit rounded-full bg-[#063C2F] px-4 py-2 text-sm font-semibold text-white">Confirmed</span>
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <img src={images.court} alt="Urban Arena" className="h-72 w-full object-cover" />
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              ["Date", "Friday, Oct 24, 2025"],
              ["Time", "19:00 - 21:00 WIB"],
              ["Players", "10 Players"],
              ["Paid", "Rp 340.000"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-[#F4F3EF] p-4">
                <p className="text-xs uppercase tracking-wider text-[#777C78]">{label}</p>
                <p className="mt-1 font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <section className="rounded-2xl bg-[#063C2F] p-6 text-center text-white">
          <QrCode className="mx-auto h-36 w-36" />
          <p className="mt-4 text-xs uppercase tracking-wider text-white/70">Turnstile Pass</p>
          <h2 className="text-2xl font-bold">RS-884-019</h2>
          <p className="mt-2 text-sm text-white/70">Activates 15 minutes before your slot.</p>
        </section>
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Arrival Instructions</h2>
          <div className="mt-5 space-y-4 text-[#555A56]">
            <p><MapPin className="mr-2 inline h-5 w-5 text-[#063C2F]" />Enter from South Gate B2 and scan the QR pass at the reception kiosk.</p>
            <p><ShieldCheck className="mr-2 inline h-5 w-5 text-[#063C2F]" />Bring non-marking indoor shoes. Bench-side water station is included.</p>
            <p><CalendarDays className="mr-2 inline h-5 w-5 text-[#063C2F]" />Free cancellation is available until 24 hours before game time.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#063C2F] px-5 py-3 font-semibold text-white"><Download className="mr-2 inline h-4 w-4" />Download Receipt</button>
            <button className="rounded-xl bg-[#F4F3EF] px-5 py-3 font-semibold"><MessageSquare className="mr-2 inline h-4 w-4" />Message Host</button>
            <Link href="/dashboard/bookings" className="rounded-xl bg-[#F4F3EF] px-5 py-3 font-semibold">Back to My Bookings</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

