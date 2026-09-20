import React from "react";
import Link from "next/link";
import { ArrowRight, Banknote, Calendar, ChevronDown, Clock, CreditCard, Lock, QrCode, ShieldCheck, Wallet } from "lucide-react";
import BookingSteps from "../../../components/BookingSteps";
import { images } from "../../../lib/demo-data";

export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em]">Checkout Process</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Finalize Reservation</h1>
        </div>
        <BookingSteps current={3} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl bg-[#F4F3EF] p-5">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-[#063C2F]"><Lock className="h-5 w-5" /></span>
              <div><p className="font-semibold">Slots Locked for Checkout</p><p className="text-sm text-[#555A56]">Complete settlement before court release.</p></div>
            </div>
            <div className="text-right"><p className="text-xs uppercase tracking-wider text-[#555A56]">Expires in</p><p className="text-2xl font-bold text-[#A67C32]">14:56</p></div>
          </div>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Select Payment Method</h2>
            <p className="mt-2 text-[#555A56]">Encrypted transactions processed via Bank Indonesia certified gateway.</p>

            <div className="mt-6 rounded-2xl bg-[#F4F3EF] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="h-5 w-5 rounded-full border-4 border-[#063C2F]" />
                  <div>
                    <p className="text-xl font-bold">QRIS Dynamic <span className="rounded-md bg-[#F4D7A1] px-2 py-1 text-xs font-semibold">Instant</span></p>
                    <p className="text-sm text-[#555A56]">Instant settlement via GoPay, OVO, DANA, BCA Mobile, and mobile banking.</p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5" />
              </div>
              <div className="mt-5 grid gap-5 rounded-xl bg-white p-5 sm:grid-cols-[220px_1fr]">
                <div className="rounded-xl bg-[#F4F3EF] p-5 text-center">
                  <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-lg bg-white text-[#063C2F]">
                    <QrCode className="h-28 w-28" />
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider">Scan with any banking app</p>
                  <p className="mt-1 text-sm font-semibold">National QR Standard</p>
                </div>
                <div className="space-y-4 text-sm">
                  {[
                    "Open your preferred e-wallet or banking application.",
                    "Point your camera toward the dynamic QR frame.",
                    "Confirm total payment of Rp 340.000. Settlement verifies within 3 seconds.",
                  ].map((item, index) => (
                    <p key={item} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4F3EF] text-xs font-bold">{index + 1}</span>
                      <span>{item}</span>
                    </p>
                  ))}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["BCA Mobile", "GoPay", "ShopeePay", "Livin Mandiri"].map((item) => (
                      <span key={item} className="rounded-md bg-[#F4F3EF] px-3 py-1 text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {[
              [Banknote, "Virtual Account / Bank Transfer", "BCA, Mandiri, BNI, BRI automated reconciliation"],
              [Wallet, "Direct E-Wallet", "App deep link to GoPay, ShopeePay, OVO, DANA"],
              [CreditCard, "Credit / Debit Card", "Visa, Mastercard, JCB, American Express"],
            ].map(([Icon, title, desc]) => (
              <button key={title as string} className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#F4F3EF] p-5 text-left">
                <span className="flex items-center gap-4">
                  <span className="h-5 w-5 rounded-full bg-white" />
                  <span><span className="block text-xl font-bold">{title as string}</span><span className="text-sm text-[#555A56]">{desc as string}</span></span>
                </span>
                <ChevronDown className="h-5 w-5" />
              </button>
            ))}

            <button className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#F4F3EF] p-5 text-left">
              <span className="text-xl font-bold">Apply Promo Code or Gift Voucher</span>
              <ChevronDown className="h-5 w-5" />
            </button>

            <div className="mt-8 grid gap-4 text-sm text-[#555A56] sm:grid-cols-3">
              <p><ShieldCheck className="mr-2 inline h-4 w-4 text-[#A58A54]" />Bank Indonesia Licensed</p>
              <p><ShieldCheck className="mr-2 inline h-4 w-4 text-[#A58A54]" />PCI-DSS Level 1 Encrypted</p>
              <p><Lock className="mr-2 inline h-4 w-4 text-[#A58A54]" />Instant Escrow Protection</p>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-black/10">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#555A56]">Reservation Summary</h2>
              <span className="rounded-md bg-[#F4F3EF] px-3 py-1 text-xs font-bold">Booking ID: RS-2025-88492</span>
            </div>
            <div className="mt-5 flex gap-4 rounded-xl bg-[#F4F3EF] p-3">
              <img src={images.court} alt="Urban Arena" className="h-24 w-28 rounded-lg object-cover" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#A58A54]">FIBA & FIFA Spec Court</p>
                <h3 className="text-xl font-bold">Urban Arena Futsal</h3>
                <p className="text-sm text-[#555A56]">Puri Indah, West Jakarta</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 border-b border-[#E7E5DE] pb-6 text-sm">
              <p className="flex justify-between"><span><Calendar className="mr-2 inline h-4 w-4" />Reserved Date</span><span>Friday, Oct 24, 2025</span></p>
              <p className="flex justify-between"><span><Clock className="mr-2 inline h-4 w-4" />Time Interval</span><span>19:00 - 21:00 WIB</span></p>
              <p className="flex justify-between"><span>Pitch Designation</span><span>Court 1</span></p>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex justify-between"><span>Court Rental</span><span>Rp 300.000</span></p>
              <p className="flex justify-between"><span>Night LED Floodlighting</span><span>Rp 30.000</span></p>
              <p className="flex justify-between"><span>RentSpace Service Fee</span><span>Rp 10.000</span></p>
              <p className="flex justify-between"><span>VAT & Tax</span><span>Rp 0</span></p>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-wider">Total Amount Due</p>
              <p className="mt-1 text-4xl font-bold">Rp 340.000</p>
            </div>
            <Link href="/booking/confirmation" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#063C2F] py-4 text-lg font-bold text-white hover:bg-[#075342]">
              Pay Now - Rp 340.000 <ArrowRight className="h-5 w-5" />
            </Link>
            <div className="mt-5 rounded-xl bg-[#F4F3EF] p-4 text-sm text-[#555A56]">
              RentSpace Escrow Guarantee: Funds are held securely and only released to the venue host after check-in.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

