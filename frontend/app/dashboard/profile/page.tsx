"use client";

import React, { useEffect, useState } from "react";
import { Bell, CalendarDays, CreditCard, Lock, LogOut, Plus, Shield, User, Wallet, Loader, type LucideIcon } from "lucide-react";
import { images } from "../../../lib/demo-data";
import { useAuth } from "../../../context/AuthContext";

function SettingsRow({ title, description, active = true }: { title: string; description: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#F4F3EF] dark:bg-[#0E1223] p-4">
      <div>
        <p className="font-semibold text-[#111512] dark:text-[#F8FAFC]">{title}</p>
        <p className="text-sm text-[#555A56] dark:text-[#94A3B8]">{description}</p>
      </div>
      <span className={`h-6 w-11 rounded-full p-1 ${active ? "bg-[#063C2F]" : "bg-[#D8D6CE] dark:bg-[#334155]"}`}>
        <span className={`block h-4 w-4 rounded-full bg-white ${active ? "ml-5" : ""}`} />
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const { user, logout, loading, refreshUser } = useAuth();
  const [memberSince] = useState(new Date().getFullYear());
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
    }
  }, [user]);

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-8 text-center bg-[#FAF9F6] dark:bg-[#020617] text-[#111512] dark:text-[#F8FAFC]">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
        <Loader className="w-8 h-8 animate-spin text-[#063C2F]" />
      </div>
    );
  }


  const displayName = user.name || "User";
  const email = user.email || "";
  const phone = user.phone || "Not provided";
  const role = user.role || "CUSTOMER";
  const rawAvatar = user.avatar_url;
  const avatarURL = rawAvatar
    ? rawAvatar.startsWith("http")
      ? rawAvatar
      : `http://localhost:8080${rawAvatar}`
    : images.avatar;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"}/auth/upload-avatar`, {
        method: "POST",
        credentials: "include",
        body: (() => {
          const formData = new FormData();
          formData.append("avatar", file);
          return formData;
        })(),
      });

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      if (data.success === false) throw new Error(data.message || "Upload failed");
      await refreshUser();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { updateProfile } = await import("../../../lib/api");
      await updateProfile(formData.name, formData.email, formData.phone);
      await refreshUser();
      setEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-[#0E1223]">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54]">Account Concierge / Settings & Identity</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-[#111512] dark:text-[#F8FAFC]">Account & Credentials</h1>
        <span className="rounded-full bg-[#F4F3EF] dark:bg-[#0E1223] dark:text-[#F8FAFC] dark:border dark:border-[#334155] px-4 py-2 text-xs font-semibold">ID Verified (Digital KTP & Biometric)</span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-5">
          <div className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 text-center shadow-sm border border-[#E7E5DE] dark:border-[#334155]">
            <img src={avatarURL} alt={displayName} className="mx-auto h-24 w-24 rounded-full object-cover cursor-pointer hover:opacity-80 transition" onClick={handleAvatarClick} />
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
            <h2 className="mt-4 text-xl font-bold text-[#111512] dark:text-[#F8FAFC]">{displayName}</h2>
            <p className="text-sm text-[#555A56] dark:text-[#94A3B8]">RentSpace Explorer - Member since {memberSince}</p>
            <span className="mt-3 inline-block rounded-full bg-[#F4F3EF] dark:bg-[#0E1223] dark:text-[#F8FAFC] dark:border dark:border-[#334155] px-3 py-1 text-xs text-[#A58A54]">{role === "OWNER" ? "Host Tier" : "Explorer Tier"}</span>
            <nav className="mt-6 space-y-2 text-left text-sm text-[#111512] dark:text-[#F8FAFC]">
              {[
                [User, "Personal Info", true],
                [Shield, "Account & Security", false],
                [Bell, "Notification Preferences", false],
                [CalendarDays, "My Bookings", false],
              ].map(([Icon, label, active]) => {
                const IconComponent = Icon as LucideIcon;
                return (
                  <button key={label as string} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 ${active ? "bg-[#063C2F] text-white" : "hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B]"}`}>
                    <span className="flex items-center gap-3"><IconComponent className="h-4 w-4" />{label as string}</span>
                    <span>›</span>
                  </button>
                );
              })}
            </nav>
            <button onClick={logout} className="mt-6 flex items-center gap-2 text-sm text-[#A34B45] dark:text-[#FB7185]"><LogOut className="h-4 w-4" />Sign Out {displayName}</button>
          </div>
          <div className="rounded-2xl bg-[#F4F3EF] dark:bg-[#0E1223] dark:border dark:border-[#334155] p-5">
            <Lock className="mb-3 h-6 w-6 text-[#063C2F]" />
            <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">Instant Access Pass</h3>
            <p className="mt-1 text-sm text-[#555A56] dark:text-[#94A3B8]">NFC turnstile QR Pass ready on WhatsApp and Apple Wallet.</p>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-sm border border-[#E7E5DE] dark:border-[#334155]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#777C78] dark:text-[#94A3B8]">Section 01</p>
            <h2 className="mt-2 text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">Personal Information</h2>
            <p className="mt-1 text-sm text-[#555A56] dark:text-[#94A3B8]">Manage verified spatial credentials, contact numbers, and legal reservation registry.</p>
            <div className="mt-6 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] p-5 sm:flex sm:items-center sm:justify-between border border-transparent dark:border-[#334155]">
              <div className="flex items-center gap-4">
                <img src={avatarURL} alt="Avatar" className="h-20 w-20 rounded-xl object-cover cursor-pointer hover:opacity-80 transition" onClick={handleAvatarClick} />
                <div><h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">Avatar & Face Recognition Pass</h3><p className="text-sm text-[#555A56] dark:text-[#94A3B8]">Recommended 800x800 px. Used for concierge check-ins.</p></div>
              </div>
              <button onClick={handleAvatarClick} disabled={uploading} className="mt-4 rounded-xl bg-[#063C2F] px-4 py-2 text-sm font-semibold text-white sm:mt-0 disabled:opacity-50">{uploading ? "Uploading..." : "Upload New Photo"}</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {editing ? (
                <>
                  <label className="block">
                    <span className="text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">Full Legal Name</span>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-2 w-full rounded-xl bg-[#F4F3EF] dark:bg-[#020617] dark:border dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC] px-4 py-3 outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">Email Address</span>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-2 w-full rounded-xl bg-[#F4F3EF] dark:bg-[#020617] dark:border dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC] px-4 py-3 outline-none" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">Phone / WhatsApp</span>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="mt-2 w-full rounded-xl bg-[#F4F3EF] dark:bg-[#020617] dark:border dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC] px-4 py-3 outline-none" />
                  </label>
                  <div className="sm:col-span-2 flex gap-3">
                    <button onClick={handleSaveProfile} disabled={saving} className="rounded-xl bg-[#063C2F] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
                    <button onClick={() => setEditing(false)} className="rounded-xl bg-[#F4F3EF] dark:bg-[#020617] dark:border dark:border-[#334155] dark:text-[#F8FAFC] px-4 py-2 text-sm font-semibold">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  {[
                    ["Full Legal Name", formData.name],
                    ["Preferred Display Name", formData.name.split(" ")[0]],
                    ["Email Address", formData.email],
                    ["Phone / WhatsApp", formData.phone || "Not provided"],
                    ["Account Type", role === "OWNER" ? "Host / Owner" : "Customer / Renter"],
                  ].map(([label, value]) => (
                    <label key={label} className="block">
                      <span className="text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">{label}</span>
                      <div className="mt-2 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] dark:border dark:border-[#334155] px-4 py-3 text-[#555A56] dark:text-[#94A3B8]">{value}</div>
                    </label>
                  ))}
                  <button onClick={() => setEditing(true)} className="sm:col-span-2 rounded-xl bg-[#063C2F] px-4 py-2 text-sm font-semibold text-white">Edit Profile</button>
                </>
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-sm border border-[#E7E5DE] dark:border-[#334155]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#777C78] dark:text-[#94A3B8]">Section 02</p>
            <h2 className="mt-2 text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">Account Security</h2>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-[#F4F3EF] dark:bg-[#020617] dark:border dark:border-[#334155] p-4">
                <div><p className="font-semibold text-[#111512] dark:text-[#F8FAFC]">Two-Factor Authentication (2FA)</p><p className="text-sm text-[#555A56] dark:text-[#94A3B8]">Enabled via Authenticator App & SMS OTP.</p></div>
                <span className="rounded-full bg-[#063C2F] px-4 py-2 text-xs font-semibold text-white">Active & Guarded</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F4F3EF] dark:bg-[#020617] dark:border dark:border-[#334155] p-4">
                <div><p className="font-semibold text-[#111512] dark:text-[#F8FAFC]">Password</p><p className="text-sm text-[#555A56] dark:text-[#94A3B8]">Last updated 3 months ago.</p></div>
                <button className="rounded-lg bg-white dark:bg-[#0E1223] dark:border dark:border-[#334155] dark:text-[#F8FAFC] px-4 py-2 text-sm">Change Password</button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-sm border border-[#E7E5DE] dark:border-[#334155]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#777C78] dark:text-[#94A3B8]">Section 03</p>
            <h2 className="mt-2 text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">Notification Preferences</h2>
            <div className="mt-5 space-y-3">
              <SettingsRow title="Booking Updates & Turnstile Passes" description="Immediate doorpin codes, NFC tokens, and arrival directions via WhatsApp." />
              <SettingsRow title="Calendar Sync Invites" description="Auto-send .ics calendar invites for production crews and team members." />
              <SettingsRow title="Architectural Curations & Venue Drops" description="Exclusive preview access to newly listed penthouses and acoustic studios." active={false} />
            </div>
          </section>

          <section className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-sm border border-[#E7E5DE] dark:border-[#334155]">
            <div className="flex items-center justify-between">
              <div><p className="text-xs font-bold uppercase tracking-wider text-[#777C78] dark:text-[#94A3B8]">Section 04</p><h2 className="mt-2 text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">Payment Methods & Payouts</h2></div>
              <button className="rounded-lg bg-[#F4F3EF] dark:bg-[#1A1E2F] px-4 py-2 text-sm text-[#111512] dark:text-[#F8FAFC] hover:bg-[#E7E5DE] dark:hover:bg-[#2D3547]"><Plus className="mr-1 inline h-4 w-4" />Add Method</button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] p-5 border border-[#E7E5DE] dark:border-[#334155]"><CreditCard className="mb-3 h-6 w-6 text-[#063C2F] dark:text-[#14B8A6]" /><p className="font-bold text-[#111512] dark:text-[#F8FAFC]">Visa Platinum **** 4291</p><p className="mt-8 text-xs text-[#777C78] dark:text-[#94A3B8]">Expires 11/27</p></div>
              <div className="rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] p-5 border border-[#E7E5DE] dark:border-[#334155]"><Wallet className="mb-3 h-6 w-6 text-[#A58A54] dark:text-[#F59E0B]" /><p className="font-bold text-[#111512] dark:text-[#F8FAFC]">GoPay E-Wallet</p><p className="mt-8 text-xs text-[#777C78] dark:text-[#94A3B8]">+62 812 **** 2311</p></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

