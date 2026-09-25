"use client";

import React, { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, FileText, Loader } from "lucide-react";
import { createBooking, getPlace, PlaceResponse } from "../../lib/api";
import BrandMark from "../../components/BrandMark";

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const placeId = params.placeId as string;

  const [place, setPlace] = useState<PlaceResponse | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!placeId) return;
    getPlace(placeId)
      .then((p) => {
        setPlace(p);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setBookingDate(tomorrow.toISOString().split("T")[0]);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load place"));
  }, [placeId]);

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;
    const diff = endMins - startMins;
    return diff > 0 ? diff : 0;
  };

  const duration = calculateDuration();

  const calculateTotal = () => {
    if (!place || duration === 0) return 0;
    const hourlyPrice = place.pricing && place.pricing.length > 0 ? place.pricing[0].price : 0;
    return Math.ceil((duration / 60) * hourlyPrice);
  };

  const totalAmount = calculateTotal();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!bookingDate || !startTime || !endTime) {
      setError("Please fill in all required fields.");
      return;
    }

    if (duration === 0) {
      setError("End time must be after start time.");
      return;
    }

    setLoading(true);
    try {
      const booking = await createBooking(placeId, bookingDate, startTime, endTime, notes);
      console.log("Booking created:", booking);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/booking/confirmation?bookingId=${booking.id}`);
      }, 1500);
    } catch (err) {
      console.error("Booking error:", err);
      setError(err instanceof Error ? err.message : "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  }

  if (!place && !error) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617] flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-[#063C2F] dark:text-[#14B8A6]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      <header className="border-b border-[#E7E5DE] dark:border-[#334155] bg-[#FAF9F6] dark:bg-[#0E1223]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <Link
            href="/explore"
            className="flex items-center gap-2 text-sm font-medium text-[#111512] dark:text-[#F8FAFC] hover:text-[#063C2F] dark:hover:text-[#14B8A6]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {error && !success && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-700 dark:text-green-300">Booking created successfully! Redirecting...</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-2">Book Your Space</h1>
            <p className="text-[#555A56] dark:text-[#94A3B8] mb-8">
              {place?.name || "Loading..."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">
                  Booking Date
                </span>
                <div className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] px-4 py-3 focus-within:ring-2 focus-within:ring-[#063C2F] dark:focus-within:ring-[#14B8A6]">
                  <Calendar className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-transparent outline-none text-[#111512] dark:text-[#F8FAFC]"
                    required
                  />
                </div>
              </label>

              {/* Start Time */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">
                  Start Time
                </span>
                <div className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] px-4 py-3 focus-within:ring-2 focus-within:ring-[#063C2F] dark:focus-within:ring-[#14B8A6]">
                  <Clock className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#111512] dark:text-[#F8FAFC]"
                    required
                  />
                </div>
              </label>

              {/* End Time */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">
                  End Time
                </span>
                <div className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] px-4 py-3 focus-within:ring-2 focus-within:ring-[#063C2F] dark:focus-within:ring-[#14B8A6]">
                  <Clock className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#111512] dark:text-[#F8FAFC]"
                    required
                  />
                </div>
              </label>

              {/* Notes */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">
                  Notes (Optional)
                </span>
                <div className="flex gap-3 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] px-4 py-3 focus-within:ring-2 focus-within:ring-[#063C2F] dark:focus-within:ring-[#14B8A6]">
                  <FileText className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0 mt-1" />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any special requests..."
                    className="w-full bg-transparent outline-none text-[#111512] dark:text-[#F8FAFC] placeholder:text-[#9CA19E] dark:placeholder:text-[#64748B] resize-none h-20"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#063C2F] dark:bg-[#14B8A6] px-5 py-4 font-semibold text-white dark:text-[#0B0F1C] shadow-md hover:bg-[#075342] dark:hover:bg-[#0FD9B8] active:scale-95 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-2xl border border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] p-6">
              <h2 className="text-lg font-bold text-[#111512] dark:text-[#F8FAFC] mb-4">Booking Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-[#E7E5DE] dark:border-[#334155]">
                <div className="flex justify-between">
                  <span className="text-sm text-[#555A56] dark:text-[#94A3B8]">Duration</span>
                  <span className="text-sm font-semibold text-[#111512] dark:text-[#F8FAFC]">
                    {duration} mins
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#555A56] dark:text-[#94A3B8]">Hourly Rate</span>
                  <span className="text-sm font-semibold text-[#111512] dark:text-[#F8FAFC]">
                    {place?.pricing && place.pricing.length > 0
                      ? `IDR ${place.pricing[0].price.toLocaleString("id-ID")}`
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold text-[#111512] dark:text-[#F8FAFC]">Total</span>
                <span className="text-2xl font-bold text-[#063C2F] dark:text-[#14B8A6]">
                  IDR {totalAmount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
