"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CalendarDays, Download, MapPin, MessageSquare, QrCode, ShieldCheck } from "lucide-react";
import { images } from "../../../lib/demo-data";
import { getBooking, getPayment, type BookingResponse, type PaymentResponse } from "../../../lib/api";

export default function BookingDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;
    const load = async () => {
      try {
        const [bookingData, paymentData] = await Promise.all([
          getBooking(bookingId),
          getPayment(bookingId),
        ]);
        setBooking(bookingData);
        setPayment(paymentData);
      } catch (err) {
        console.error("Failed to load booking", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [bookingId]);

  if (!bookingId) return <div className="mx-auto max-w-5xl px-4 py-8 text-center">Booking ID missing</div>;
  if (loading) return <div className="mx-auto max-w-5xl px-4 py-8 text-center">Loading booking...</div>;
  if (!booking) return <div className="mx-auto max-w-5xl px-4 py-8 text-center">Booking not found</div>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Booking Detail</p>
          <h1 className="mt-3 text-4xl font-bold">Booking #{booking.id.slice(0, 8)}</h1>
          <p className="mt-2 text-[#555A56]">Reference #{booking.id.slice(0, 12)} - {booking.status}</p>
        </div>
        <span className={`w-fit rounded-full px-4 py-2 text-sm font-semibold text-white ${booking.status === "CONFIRMED" ? "bg-[#063C2F]" : "bg-[#777C78]"}`}>{booking.status}</span>
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="h-72 w-full bg-[#F4F3EF] flex items-center justify-center">
          <p className="text-[#777C78]">Place Image</p>
        </div>
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              ["Date", booking.booking_date],
              ["Time", `${booking.start_time} - ${booking.end_time}`],
              ["Duration", `${booking.duration_minutes} mins`],
              ["Paid", `Rp ${booking.total_amount.toLocaleString("id-ID")}`],
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
          <h2 className="text-2xl font-bold">{booking.id.slice(0, 12)}</h2>
          <p className="mt-2 text-sm text-white/70">Activates 15 minutes before your slot.</p>
        </section>
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Arrival Instructions</h2>
          <div className="mt-5 space-y-4 text-[#555A56]">
            <p><MapPin className="mr-2 inline h-5 w-5 text-[#063C2F]" />Enter from reception and scan the QR pass at the kiosk.</p>
            <p><ShieldCheck className="mr-2 inline h-5 w-5 text-[#063C2F]" />Payment status: {payment?.status || "PENDING"}</p>
            <p><CalendarDays className="mr-2 inline h-5 w-5 text-[#063C2F]" />Free cancellation available until 24 hours before.</p>
          </div>
          {booking.notes && (
            <div className="mt-4 rounded-xl bg-[#F4F3EF] p-4">
              <p className="text-sm font-semibold">Notes:</p>
              <p className="text-sm text-[#555A56]">{booking.notes}</p>
            </div>
          )}
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

