"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun, Bell, Lock, LogOut, Loader } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, loadingLogout } = useAuth();
  const [notifications, setNotifications] = useState({
    emailBooking: true,
    emailReview: true,
    pushNotifications: true,
    weeklyDigest: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rentspace_notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  const handleNotificationChange = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem("rentspace_notifications", JSON.stringify(updated));
    toast.success("Notification settings updated");
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0F172A]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard/profile"
            className="p-2 rounded-lg hover:bg-[#F4F3EF] dark:hover:bg-[#1E293B] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#111512] dark:text-white" />
          </Link>
          <h1 className="text-3xl font-bold text-[#111512] dark:text-white">Settings</h1>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Appearance */}
          <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E7E5DE] dark:border-[#334155] p-6">
            <h2 className="text-lg font-bold text-[#111512] dark:text-white mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Appearance
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#111512] dark:text-white">Dark Mode</p>
                  <p className="text-sm text-[#555A56] dark:text-[#94A3B8] mt-1">
                    Switch between light and dark theme
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    theme === "dark"
                      ? "bg-[#063C2F] text-white hover:bg-[#075342]"
                      : "bg-[#F4F3EF] text-[#111512] hover:bg-[#E8E6DE]"
                  }`}
                >
                  {theme === "dark" ? (
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      On
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Off
                    </div>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E7E5DE] dark:border-[#334155] p-6">
            <h2 className="text-lg font-bold text-[#111512] dark:text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="space-y-4">
              {[
                { key: "emailBooking", label: "Booking Updates", desc: "Email when you get new bookings" },
                { key: "emailReview", label: "Reviews & Ratings", desc: "Email when guests leave reviews" },
                { key: "pushNotifications", label: "Push Notifications", desc: "Real-time notifications on your device" },
                { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary of your activity each week" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F4F3EF] dark:hover:bg-[#334155] transition-colors">
                  <div>
                    <p className="font-medium text-[#111512] dark:text-white">{label}</p>
                    <p className="text-sm text-[#555A56] dark:text-[#94A3B8]">{desc}</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[key as keyof typeof notifications]}
                      onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                      className="w-5 h-5 accent-[#063C2F] dark:accent-[#14B8A6] rounded"
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Security */}
          <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E7E5DE] dark:border-[#334155] p-6">
            <h2 className="text-lg font-bold text-[#111512] dark:text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left p-3 rounded-lg hover:bg-[#F4F3EF] dark:hover:bg-[#334155] transition-colors border border-[#E7E5DE] dark:border-[#334155]">
                <p className="font-medium text-[#111512] dark:text-white">Change Password</p>
                <p className="text-sm text-[#555A56] dark:text-[#94A3B8] mt-1">Update your password regularly</p>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-[#F4F3EF] dark:hover:bg-[#334155] transition-colors border border-[#E7E5DE] dark:border-[#334155]">
                <p className="font-medium text-[#111512] dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-[#555A56] dark:text-[#94A3B8] mt-1">Add an extra layer of security</p>
              </button>
            </div>
          </section>

          {/* Account */}
          <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E7E5DE] dark:border-[#334155] p-6">
            <h2 className="text-lg font-bold text-[#111512] dark:text-white mb-4 flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Account
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                disabled={loadingLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 text-white font-medium transition-colors"
              >
                {loadingLogout && <Loader className="w-4 h-4 animate-spin" />}
                <span>{loadingLogout ? "Logging out..." : "Logout"}</span>
              </button>
              <button className="w-full px-4 py-3 rounded-lg border border-[#DC2626] text-[#DC2626] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D] font-medium transition-colors">
                Delete Account
              </button>
            </div>
          </section>

          {/* Footer Info */}
          <div className="text-center text-sm text-[#555A56] dark:text-[#94A3B8] py-4">
            <p>RentSpace v1.0.0 • {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
