import React from "react";
import { Bell, CalendarDays, CreditCard, Lock, LogOut, Plus, Shield, User, Wallet, type LucideIcon } from "lucide-react";
import { images } from "../../../lib/demo-data";

function SettingsRow({ title, description, active = true }: { title: string; description: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#F4F3EF] p-4">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-[#555A56]">{description}</p>
      </div>
      <span className={`h-6 w-11 rounded-full p-1 ${active ? "bg-[#063C2F]" : "bg-[#D8D6CE]"}`}>
        <span className={`block h-4 w-4 rounded-full bg-white ${active ? "ml-5" : ""}`} />
      </span>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Account Concierge / Settings & Identity</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-bold tracking-tight">Account & Credentials</h1>
        <span className="rounded-full bg-[#F4F3EF] px-4 py-2 text-xs font-semibold">ID Verified (Digital KTP & Biometric)</span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-5">
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <img src={images.avatar} alt="Dimas Pratama" className="mx-auto h-24 w-24 rounded-full object-cover" />
            <h2 className="mt-4 text-xl font-bold">Dimas Pratama</h2>
            <p className="text-sm text-[#555A56]">RentSpace Explorer - Member since 2023</p>
            <span className="mt-3 inline-block rounded-full bg-[#F4F3EF] px-3 py-1 text-xs text-[#A58A54]">Premier Tier Concierge</span>
            <nav className="mt-6 space-y-2 text-left text-sm">
              {[
                [User, "Personal Info", true],
                [Shield, "Account & Security", false],
                [Bell, "Notification Preferences", false],
                [CalendarDays, "My Bookings", false],
              ].map(([Icon, label, active]) => {
                const IconComponent = Icon as LucideIcon;
                return (
                  <button key={label as string} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 ${active ? "bg-[#063C2F] text-white" : "hover:bg-[#F4F3EF]"}`}>
                    <span className="flex items-center gap-3"><IconComponent className="h-4 w-4" />{label as string}</span>
                    <span>›</span>
                  </button>
                );
              })}
            </nav>
            <button className="mt-6 flex items-center gap-2 text-sm text-[#A34B45]"><LogOut className="h-4 w-4" />Sign Out Dimas Pratama</button>
          </div>
          <div className="rounded-2xl bg-[#F4F3EF] p-5">
            <Lock className="mb-3 h-6 w-6 text-[#063C2F]" />
            <h3 className="font-bold">Instant Access Pass</h3>
            <p className="mt-1 text-sm text-[#555A56]">NFC turnstile QR Pass ready on WhatsApp and Apple Wallet.</p>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#777C78]">Section 01</p>
            <h2 className="mt-2 text-2xl font-bold">Personal Information</h2>
            <p className="mt-1 text-sm text-[#555A56]">Manage verified spatial credentials, contact numbers, and legal reservation registry.</p>
            <div className="mt-6 rounded-xl bg-[#F4F3EF] p-5 sm:flex sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img src={images.avatar} alt="Avatar" className="h-20 w-20 rounded-xl object-cover" />
                <div><h3 className="font-bold">Avatar & Face Recognition Pass</h3><p className="text-sm text-[#555A56]">Recommended 800x800 px. Used for concierge check-ins.</p></div>
              </div>
              <button className="mt-4 rounded-xl bg-[#063C2F] px-4 py-2 text-sm font-semibold text-white sm:mt-0">Upload New Photo</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Full Legal Name", "Dimas Pratama"],
                ["Preferred Display Name", "Dimas"],
                ["Email Address", "dimas.pratama@gmail.com"],
                ["Phone / WhatsApp", "+62 812-8899-2311"],
                ["Date of Birth", "14 / 08 / 1994"],
                ["Primary City Hub", "Jakarta, Indonesia"],
              ].map(([label, value]) => (
                <label key={label} className="block">
                  <span className="text-sm font-medium">{label}</span>
                  <div className="mt-2 rounded-xl bg-[#F4F3EF] px-4 py-3 text-[#555A56]">{value}</div>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#777C78]">Section 02</p>
            <h2 className="mt-2 text-2xl font-bold">Account Security</h2>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-[#F4F3EF] p-4">
                <div><p className="font-semibold">Two-Factor Authentication (2FA)</p><p className="text-sm text-[#555A56]">Enabled via Authenticator App & SMS OTP.</p></div>
                <span className="rounded-full bg-[#063C2F] px-4 py-2 text-xs font-semibold text-white">Active & Guarded</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F4F3EF] p-4">
                <div><p className="font-semibold">Password</p><p className="text-sm text-[#555A56]">Last updated 3 months ago.</p></div>
                <button className="rounded-lg bg-white px-4 py-2 text-sm">Change Password</button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#777C78]">Section 03</p>
            <h2 className="mt-2 text-2xl font-bold">Notification Preferences</h2>
            <div className="mt-5 space-y-3">
              <SettingsRow title="Booking Updates & Turnstile Passes" description="Immediate doorpin codes, NFC tokens, and arrival directions via WhatsApp." />
              <SettingsRow title="Calendar Sync Invites" description="Auto-send .ics calendar invites for production crews and team members." />
              <SettingsRow title="Architectural Curations & Venue Drops" description="Exclusive preview access to newly listed penthouses and acoustic studios." active={false} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div><p className="text-xs font-bold uppercase tracking-wider text-[#777C78]">Section 04</p><h2 className="mt-2 text-2xl font-bold">Payment Methods & Payouts</h2></div>
              <button className="rounded-lg bg-[#F4F3EF] px-4 py-2 text-sm"><Plus className="mr-1 inline h-4 w-4" />Add Method</button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F4F3EF] p-5"><CreditCard className="mb-3 h-6 w-6 text-[#063C2F]" /><p className="font-bold">Visa Platinum **** 4291</p><p className="mt-8 text-xs text-[#777C78]">Expires 11/27</p></div>
              <div className="rounded-xl bg-[#F4F3EF] p-5"><Wallet className="mb-3 h-6 w-6 text-[#A58A54]" /><p className="font-bold">GoPay E-Wallet</p><p className="mt-8 text-xs text-[#777C78]">+62 812 **** 2311</p></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

