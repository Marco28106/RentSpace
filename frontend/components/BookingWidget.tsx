"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, ShieldCheck, Loader, ArrowRight } from "lucide-react";
import { formatIDR } from "../lib/demo-data";
import { createBooking, getAvailability } from "../lib/api";

interface BookingWidgetProps {
  placeId: string;
  pricePerHour: number;
  hostPhone: string;
  hostName: string;
}

export default function BookingWidget({ placeId, pricePerHour, hostPhone, hostName }: BookingWidgetProps) {
  const router = useRouter();
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("14:00");
  const [attendees, setAttendees] = useState(6);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<any[]>([]);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (!date) return;
    (async () => {
      try {
        const data = await getAvailability(placeId, date);
        setAvailability(data.slots || []);
      } catch (err) {
        console.error("Failed to load availability", err);
      }
    })();
  }, [date, placeId]);

  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    let hours = endH - startH + (endM - startM) / 60;
    return Math.max(hours, 0);
  };

  const hours = calculateHours();
  const basePrice = pricePerHour * hours;
  const cleaningFee = Math.ceil(basePrice * 0.05);
  const conciergeFee = Math.ceil(basePrice * 0.03);
  const total = basePrice + cleaningFee + conciergeFee;

  const slotUnavailable = availability.some(
    (slot) => slot.start === startTime && slot.end === endTime && !slot.available
  );

  const handleContactHost = () => {
    const message = `Halo ${hostName}, saya tertarik untuk booking tempat Anda pada ${date} jam ${startTime}-${endTime} untuk ${attendees} orang. Total: ${formatIDR(total)}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${hostPhone}?text=${encodedMessage}`, "_blank");
  };

  const handleBooking = async () => {
    if (!date || !startTime || !endTime) {
      alert("Pilih tanggal dan waktu");
      return;
    }
    setLoading(true);
    try {
      const result = await createBooking(placeId, date, startTime, endTime, `${attendees} attendees`);
      router.push(`/booking/payment?id=${result.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Booking gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-xl shadow-black/10 border border-[#E7E5DE] dark:border-[#334155]">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">{formatIDR(pricePerHour)}</span>
            <span className="text-sm text-[#777C78] dark:text-[#94A3B8]">/hour</span>
          </div>
        </div>

        <div className="mt-5 space-y-3 rounded-xl border border-[#E7E5DE] dark:border-[#334155] p-4 text-sm bg-[#F4F3EF] dark:bg-[#1A1E2F]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#111512] dark:text-[#F8FAFC]">
              <Calendar className="h-4 w-4" />
              Date
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg bg-white dark:bg-[#0E1223] dark:border dark:border-[#334155] dark:text-[#F8FAFC] px-3 py-1 text-xs"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#111512] dark:text-[#F8FAFC]">
              <Clock className="h-4 w-4" />
              Time
            </span>
            <div className="flex gap-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="rounded-lg bg-white dark:bg-[#0E1223] dark:border dark:border-[#334155] dark:text-[#F8FAFC] px-2 py-1 text-xs w-20"
              />
              <span className="text-[#111512] dark:text-[#F8FAFC]">-</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="rounded-lg bg-white dark:bg-[#0E1223] dark:border dark:border-[#334155] dark:text-[#F8FAFC] px-2 py-1 text-xs w-20"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#111512] dark:text-[#F8FAFC]">
              <Users className="h-4 w-4" />
              Attendees
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAttendees(Math.max(1, attendees - 1))}
                className="rounded px-2 py-1 bg-white dark:bg-[#0E1223] dark:border dark:border-[#334155] hover:bg-[#E7E5DE] dark:hover:bg-[#1A1E2F]"
              >
                -
              </button>
              <span className="w-6 text-center text-[#111512] dark:text-[#F8FAFC]">{attendees}</span>
              <button
                onClick={() => setAttendees(attendees + 1)}
                className="rounded px-2 py-1 bg-white dark:bg-[#0E1223] dark:border dark:border-[#334155] hover:bg-[#E7E5DE] dark:hover:bg-[#1A1E2F]"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm text-[#111512] dark:text-[#F8FAFC]">
          <div className="flex justify-between">
            <span>{formatIDR(pricePerHour)} x {hours.toFixed(1)} jam</span>
            <span>{formatIDR(basePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Cleaning & setup (5%)</span>
            <span>{formatIDR(cleaningFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>Concierge service (3%)</span>
            <span>{formatIDR(conciergeFee)}</span>
          </div>
          <div className="border-t border-[#E7E5DE] dark:border-[#334155] pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>{formatIDR(total)}</span>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={loading || slotUnavailable}
          className="mt-5 w-full rounded-xl bg-[#063C2F] dark:bg-[#14B8A6] px-5 py-4 text-center font-semibold text-white dark:text-[#0B0F1C] hover:bg-[#075342] dark:hover:bg-[#0FD9B8] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : slotUnavailable ? (
            "Slot tidak tersedia"
          ) : (
            "Reserve & Pay"
          )}
        </button>

        <button
          onClick={handleContactHost}
          className="mt-3 w-full rounded-xl bg-[#25D366] px-5 py-3 text-center font-semibold text-white hover:bg-[#20BA58]"
        >
          Contact Host via WhatsApp
        </button>

        <p className="mt-3 text-center text-xs text-[#777C78] dark:text-[#94A3B8]">Pembayaran diproses via Midtrans. Pemilik punya 24h untuk konfirmasi.</p>

        <div className="mt-5 space-y-2 text-xs text-[#555A56] dark:text-[#94A3B8]">
          <p className="flex gap-2">
            <ShieldCheck className="h-4 w-4 flex-shrink-0 text-[#063C2F] dark:text-[#14B8A6]" />
            <span>Gratis cancel hingga 24 jam sebelumnya.</span>
          </p>
          <p className="flex gap-2">
            <ShieldCheck className="h-4 w-4 flex-shrink-0 text-[#063C2F] dark:text-[#14B8A6]" />
            <span>Konfirmasi instant tersedia.</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
