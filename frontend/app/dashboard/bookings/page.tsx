"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, HelpCircle, MapPin, MessageSquare, Plane, QrCode, Search, Star } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { listBookings, cancelBooking, type BookingResponse } from "../../../lib/api";

export default function BookingsPage() {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    loadBookings();
  }, [loading]);

  const loadBookings = async () => {
    try {
      setFetching(true);
      setError("");
      const data = await listBookings(1, 20);
      setBookings(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setFetching(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      setCancelling(bookingId);
      await cancelBooking(bookingId);
      setBookings(bookings.filter(b => b.id !== bookingId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to cancel booking");
    } finally {
      setCancelling(null);
    }
  };

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-8 text-center">Loading...</div>;

  const upcoming = bookings.filter(b => b.status === "CONFIRMED" || b.status === "PENDING");
  const completed = bookings.filter(b => b.status === "COMPLETED");
  const cancelled = bookings.filter(b => b.status === "CANCELLED");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Reservation Management</p>
      <div className="mt-2 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-[#063C2F]">My Bookings</h1>
          <p className="mt-4 max-w-2xl text-xl text-[#555A56]">Manage your upcoming reservations, view past venue bookings, and access digital check-in passes.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#F4F3EF] p-4">
          <div><p className="text-2xl font-bold">{upcoming.length}</p><p className="text-sm">Active Passes</p></div>
          <div><p className="text-2xl font-bold">{upcoming.length > 0 ? "Ready" : "None"}</p><p className="text-sm">Keyless Access</p></div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-[#F4F3EF] p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2">
          {[["Upcoming", upcoming.length], ["Completed", completed.length], ["Cancelled", cancelled.length]].map(([label, count]) => (
            <button key={label} className="rounded-xl px-5 py-3 text-sm font-medium bg-white shadow-sm">{label} {count}</button>
          ))}
        </div>
      </div>

      {error && <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}
      {fetching && <div className="mt-6 text-center text-[#555A56]">Loading bookings...</div>}

      <div className="mt-6 space-y-6">
        {bookings.length === 0 && !fetching && (
          <div className="text-center py-12">
            <p className="text-[#555A56]">No bookings yet. Start exploring spaces!</p>
            <Link href="/explore" className="mt-4 inline-block rounded-xl bg-[#063C2F] px-6 py-3 font-semibold text-white">Browse Spaces</Link>
          </div>
        )}
        {bookings.map(booking => (
          <article key={booking.id} className="overflow-hidden rounded-2xl bg-white shadow-sm lg:grid lg:grid-cols-[420px_1fr]">
            <div className="relative min-h-[260px] bg-[#F4F3EF]">
              <div className="absolute inset-0 flex items-center justify-center text-[#777C78]">Place Image</div>
              <span className="absolute left-4 top-4 rounded-full bg-[#063C2F] px-4 py-2 text-sm font-semibold text-white">{booking.status}</span>
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#555A56]">{booking.place_id}</p>
              <h2 className="mt-3 text-3xl font-bold">Booking #{booking.id.slice(0, 8)}</h2>
              <div className="mt-5 grid gap-3 rounded-xl bg-[#F4F3EF] p-4 sm:grid-cols-3">
                <div><CalendarDays className="mb-1 h-5 w-5" /><p className="font-semibold">{booking.booking_date}</p><p className="text-sm text-[#555A56]">{booking.start_time} - {booking.end_time}</p></div>
                <div><Star className="mb-1 h-5 w-5" /><p className="font-semibold">{booking.duration_minutes} mins</p><p className="text-sm text-[#555A56]">Duration</p></div>
                <div><p className="font-semibold">Rp {booking.total_amount.toLocaleString()}</p><p className="text-sm text-[#555A56]">Total</p></div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link href={`/booking/detail?id=${booking.id}`} className="rounded-xl bg-[#063C2F] px-5 py-3 font-semibold text-white">View Details</Link>
                {booking.status === "CONFIRMED" && (
                  <button onClick={() => handleCancel(booking.id)} disabled={cancelling === booking.id} className="rounded-xl bg-red-100 px-5 py-3 font-semibold text-red-700 disabled:opacity-50">
                    {cancelling === booking.id ? "Cancelling..." : "Cancel"}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

