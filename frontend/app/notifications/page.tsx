import React from "react";
import { Bell, CalendarClock, CheckCheck, CreditCard, QrCode, Settings2, ShieldCheck, Star } from "lucide-react";
import { images } from "../../lib/demo-data";

function NotificationItem({ icon, title, meta, body, action }: { icon: React.ReactNode; title: string; meta: string; body: string; action?: string }) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex gap-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4F3EF] text-[#063C2F]">{icon}</span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#A58A54]">{meta}</p>
          <h2 className="mt-2 text-xl font-bold">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#555A56]">{body}</p>
          {action && <button className="mt-4 rounded-xl bg-[#063C2F] px-4 py-2 text-sm font-semibold text-white">{action}</button>}
        </div>
      </div>
    </article>
  );
}

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Activity Feed & Access Keys</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Notifications</h1>
          <p className="mt-3 max-w-2xl text-[#555A56]">Stay updated on your booking turnstile passes, schedule reminders, venue status updates, and reviews.</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-xl bg-[#F4F3EF] px-4 py-3 text-sm"><CheckCheck className="mr-2 inline h-4 w-4" />Mark all as read</button>
          <button className="rounded-xl bg-[#F4F3EF] px-4 py-3 text-sm"><Settings2 className="mr-2 inline h-4 w-4" />Notification Settings</button>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {["All 6", "Bookings 3", "Access & Passes 1", "Reminders 1", "Venues 1"].map((tab, index) => (
          <button key={tab} className={`rounded-full px-5 py-2 text-sm font-medium ${index === 0 ? "bg-[#063C2F] text-white" : "bg-white"}`}>{tab}</button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <main className="space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Today <span className="text-sm font-normal text-[#777C78]">- Live updates & gate tickets</span></h2>
              <span className="text-xs uppercase tracking-wider text-[#777C78]">2 records</span>
            </div>
            <div className="space-y-4">
              <NotificationItem icon={<ShieldCheck className="h-5 w-5" />} meta="Access Clearance - 15 minutes ago" title="Booking Confirmed: Urban Arena Futsal" body="Your reservation for Court 01 on Friday, Oct 24 is confirmed. Your digital gate pass is ready." action="View Pass & Receipt" />
              <NotificationItem icon={<CreditCard className="h-5 w-5" />} meta="Escrow Settlement - 18 minutes ago" title="Payment Receipt #RS-992014" body="Payment of Rp 340.000 via QRIS Dynamic has been verified and placed into secure escrow." action="Download PDF" />
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Earlier This Week <span className="text-sm font-normal text-[#777C78]">- Archived dispatch logs</span></h2>
              <span className="text-xs uppercase tracking-wider text-[#777C78]">4 records</span>
            </div>
            <div className="space-y-4">
              <NotificationItem icon={<CalendarClock className="h-5 w-5" />} meta="Logistics & Ingress - 1 day ago" title="Upcoming session tomorrow: Lumina Daylight Loft" body="Equipment load-in begins at 09:45 WIB. Astrid Lindholm has shared freight elevator instructions." action="View Directions" />
              <NotificationItem icon={<Star className="h-5 w-5" />} meta="Community Reputation - 3 days ago" title="How was your session at Apex Grand Badminton Pavilion?" body="Share your experience with the athletic community to help maintain our verified venue standards." action="Write Review" />
              <NotificationItem icon={<Bell className="h-5 w-5" />} meta="Curated Discovery - Oct 12, 2025" title="New venue in Jakarta Selatan: Kanso Gallery Studio" body="A new minimalist warm wooden space is now available for editorial sessions and acoustic rehearsals." />
            </div>
          </section>
        </main>

        <aside className="space-y-6 lg:sticky lg:top-28">
          <div className="rounded-2xl bg-[#063C2F] p-6 text-white shadow-xl shadow-black/10">
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-[#BFE6D8]">Fast-track Turnstile Key</p>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs">Ready</span>
            </div>
            <h2 className="mt-8 text-2xl font-bold">Urban Arena Futsal</h2>
            <p className="text-white/70">Court 01 - Indoor Hardwood</p>
            <div className="mt-5 grid grid-cols-2 gap-4 border-y border-white/10 py-4 text-sm">
              <div><p className="text-white/60">Schedule</p><p className="font-semibold">Fri, 24 Oct - 19:00</p></div>
              <div><p className="text-white/60">Turnstile Bay</p><p className="font-semibold">South Gate B2</p></div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-white p-4 text-[#111512]">
              <div><p className="text-xs uppercase tracking-wider text-[#555A56]">NFC Token Identifier</p><p className="text-xl font-bold">RS-884-019</p></div>
              <QrCode className="h-10 w-10 text-[#063C2F]" />
            </div>
            <button className="mt-5 w-full rounded-xl bg-white py-3 font-semibold text-[#063C2F]">Add to Apple / Google Wallet</button>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Delivery Channels</h2>
            {["WhatsApp Instant Gate Pass", "Electronic PDF Receipts", "iCal & Google Synced"].map((item) => (
              <div key={item} className="mt-4 border-b border-[#E7E5DE] pb-4 last:border-0">
                <p className="font-medium">{item}</p>
                <p className="text-sm text-[#777C78]">Auto-enabled</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

