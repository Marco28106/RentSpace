"use client";

import React, { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, FileText, Loader, CheckCircle2, AlertCircle, CreditCard } from "lucide-react";
import { createBooking, getPlace, PlaceResponse } from "../../../lib/api";
import BrandMark from "../../../components/BrandMark";

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<"booking" | "payment">("booking");

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

  const validateField = (field: string, value: string) => {
    const errors = { ...fieldErrors };
    
    switch (field) {
      case "bookingDate":
        if (!value) {
          errors.bookingDate = "Booking date is required";
        } else if (new Date(value) < new Date(new Date().setHours(0, 0, 0, 0))) {
          errors.bookingDate = "Date cannot be in the past";
        } else {
          delete errors.bookingDate;
        }
        break;
      case "startTime":
        if (!value) {
          errors.startTime = "Start time is required";
        } else {
          delete errors.startTime;
        }
        break;
      case "endTime":
        if (!value) {
          errors.endTime = "End time is required";
        } else if (calculateDuration() <= 0) {
          errors.endTime = "End time must be after start time";
        } else {
          delete errors.endTime;
        }
        break;
    }
    
    setFieldErrors(errors);
  };

  const isBookingValid = () => {
    return bookingDate && startTime && endTime && duration > 0 && Object.keys(fieldErrors).length === 0;
  };

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
      <div className="min-h-screen bg-[#FAF5FF] dark:bg-[#020617] flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-[#7C3AED]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF5FF] dark:bg-[#020617]">
      <header className="border-b border-[#DDD6FE] dark:border-[#334155] bg-white dark:bg-[#0E1223]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <Link
            href="/explore"
            className="flex items-center gap-2 text-sm font-medium text-[#4C1D95] dark:text-[#F8FAFC] hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {error && !success && (
          <div className="mb-6 mx-auto max-w-3xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3 rounded-2xl bg-[#FEE2E2] dark:bg-red-900/20 border-2 border-[#DC2626] p-4">
              <AlertCircle className="h-5 w-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-[#DC2626]">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 mx-auto max-w-3xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3 rounded-2xl bg-[#D1FAE5] dark:bg-green-900/20 border-2 border-[#16A34A] p-4">
              <CheckCircle2 className="h-5 w-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-[#16A34A]">Booking created successfully! Redirecting...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#4C1D95] dark:text-white mb-2">Book Your Space</h1>
              <p className="text-lg text-[#475569] dark:text-[#94A3B8]">{place?.name || "Loading..."}</p>
            </div>

            {step === "booking" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="booking-date" className="mb-2 block text-sm font-semibold text-[#4C1D95] dark:text-white">
                    Booking Date <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className={`flex items-center gap-3 rounded-2xl bg-white dark:bg-[#0E1223] border-2 px-4 py-4 transition-all duration-200 ${fieldErrors.bookingDate ? "border-[#DC2626] focus-within:ring-2 focus-within:ring-[#DC2626]" : "border-[#DDD6FE] dark:border-[#334155] focus-within:ring-2 focus-within:ring-[#7C3AED]"}`}>
                    <Calendar className="h-5 w-5 text-[#A78BFA] flex-shrink-0" />
                    <input
                      id="booking-date"
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      onBlur={(e) => validateField("bookingDate", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-transparent outline-none text-[#4C1D95] dark:text-white"
                      required
                    />
                  </div>
                  {fieldErrors.bookingDate && <p className="mt-2 text-sm text-[#DC2626]">{fieldErrors.bookingDate}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="start-time" className="mb-2 block text-sm font-semibold text-[#4C1D95] dark:text-white">
                      Start Time <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className={`flex items-center gap-3 rounded-2xl bg-white dark:bg-[#0E1223] border-2 px-4 py-4 transition-all duration-200 ${fieldErrors.startTime ? "border-[#DC2626] focus-within:ring-2 focus-within:ring-[#DC2626]" : "border-[#DDD6FE] dark:border-[#334155] focus-within:ring-2 focus-within:ring-[#7C3AED]"}`}>
                      <Clock className="h-5 w-5 text-[#A78BFA] flex-shrink-0" />
                      <input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        onBlur={(e) => validateField("startTime", e.target.value)}
                        className="w-full bg-transparent outline-none text-[#4C1D95] dark:text-white"
                        required
                      />
                    </div>
                    {fieldErrors.startTime && <p className="mt-2 text-sm text-[#DC2626]">{fieldErrors.startTime}</p>}
                  </div>

                  <div>
                    <label htmlFor="end-time" className="mb-2 block text-sm font-semibold text-[#4C1D95] dark:text-white">
                      End Time <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className={`flex items-center gap-3 rounded-2xl bg-white dark:bg-[#0E1223] border-2 px-4 py-4 transition-all duration-200 ${fieldErrors.endTime ? "border-[#DC2626] focus-within:ring-2 focus-within:ring-[#DC2626]" : "border-[#DDD6FE] dark:border-[#334155] focus-within:ring-2 focus-within:ring-[#7C3AED]"}`}>
                      <Clock className="h-5 w-5 text-[#A78BFA] flex-shrink-0" />
                      <input
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        onBlur={(e) => validateField("endTime", e.target.value)}
                        className="w-full bg-transparent outline-none text-[#4C1D95] dark:text-white"
                        required
                      />
                    </div>
                    {fieldErrors.endTime && <p className="mt-2 text-sm text-[#DC2626]">{fieldErrors.endTime}</p>}
                  </div>
                </div>

                {duration > 0 && (
                  <div className="rounded-2xl bg-[#F3E8FF] dark:bg-[#4C1D95]/20 border-2 border-[#A78BFA] p-4">
                    <p className="text-sm font-medium text-[#4C1D95] dark:text-[#A78BFA]">
                      Duration: <span className="font-bold">{Math.floor(duration / 60)}h {duration % 60}m</span>
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-[#4C1D95] dark:text-white">
                    Notes (Optional)
                  </label>
                  <div className="flex gap-3 rounded-2xl bg-white dark:bg-[#0E1223] border-2 border-[#DDD6FE] dark:border-[#334155] px-4 py-4 focus-within:ring-2 focus-within:ring-[#7C3AED]">
                    <FileText className="h-5 w-5 text-[#A78BFA] flex-shrink-0 mt-1" />
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any special requests or requirements..."
                      className="w-full bg-transparent outline-none text-[#4C1D95] dark:text-white placeholder:text-[#475569] dark:placeholder:text-[#64748B] resize-none h-24"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isBookingValid()}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#16A34A] px-6 py-5 text-lg font-bold text-white shadow-lg hover:bg-[#15803D] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? <><Loader className="h-5 w-5 animate-spin" />Processing...</> : <><CheckCircle2 className="h-5 w-5" />Confirm Booking</>}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-2xl border-2 border-[#DDD6FE] dark:border-[#334155] bg-white dark:bg-[#0E1223] p-6 shadow-xl">
              <h2 className="text-xl font-bold text-[#4C1D95] dark:text-white mb-6">Booking Summary</h2>
              {place && <div className="mb-6 pb-6 border-b-2 border-[#ECEEF9] dark:border-[#334155]"><p className="text-sm font-semibold text-[#A78BFA] mb-1">Place</p><p className="text-base font-bold text-[#4C1D95] dark:text-white">{place.name}</p></div>}
              <div className="space-y-4 mb-6 pb-6 border-b-2 border-[#ECEEF9] dark:border-[#334155]">
                {bookingDate && <div className="flex justify-between items-center"><span className="text-sm text-[#475569] dark:text-[#94A3B8]">Date</span><span className="text-sm font-semibold text-[#4C1D95] dark:text-white">{new Date(bookingDate).toLocaleDateString("id-ID", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</span></div>}
                {startTime && endTime && <div className="flex justify-between items-center"><span className="text-sm text-[#475569] dark:text-[#94A3B8]">Time</span><span className="text-sm font-semibold text-[#4C1D95] dark:text-white">{startTime} - {endTime}</span></div>}
                <div className="flex justify-between items-center"><span className="text-sm text-[#475569] dark:text-[#94A3B8]">Duration</span><span className={`text-sm font-semibold ${duration > 0 ? "text-[#7C3AED]" : "text-[#475569] dark:text-[#94A3B8]"}`}>{duration > 0 ? `${Math.floor(duration / 60)}h ${duration % 60}m` : "—"}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm text-[#475569] dark:text-[#94A3B8]">Hourly Rate</span><span className="text-sm font-semibold text-[#4C1D95] dark:text-white">{place?.pricing && place.pricing.length > 0 ? `IDR ${place.pricing[0].price.toLocaleString("id-ID")}` : "—"}</span></div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] p-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold text-white">Total</span>
                  <div className="text-right"><p className="text-3xl font-bold text-white">IDR {totalAmount.toLocaleString("id-ID")}</p>{duration > 0 && <p className="text-xs text-white/80 mt-1">~IDR {Math.round(totalAmount / (duration / 60)).toLocaleString("id-ID")}/hour</p>}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}