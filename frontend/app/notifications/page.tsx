"use client";

import React, { useEffect, useState } from "react";
import { Bell, CalendarClock, CheckCheck, CreditCard, QrCode, Settings2, ShieldCheck, Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Notification, listNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../../lib/api";
import Link from "next/link";

function NotificationItem({ notification, onRead }: { notification: Notification; onRead: (id: string) => void }) {
  const handleRead = () => {
    if (!notification.is_read) {
      onRead(notification.id);
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    booking: <ShieldCheck className="h-5 w-5" />,
    payment: <CreditCard className="h-5 w-5" />,
    reminder: <CalendarClock className="h-5 w-5" />,
    review: <Star className="h-5 w-5" />,
  };

  return (
    <article className={`rounded-2xl p-6 shadow-sm cursor-pointer transition ${notification.is_read ? "bg-[#F4F3EF] dark:bg-[#1A1E2F]" : "bg-white dark:bg-[#0E1223]"}`} onClick={handleRead}>
      <div className="flex gap-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] text-[#063C2F] dark:text-[#14B8A6]">{iconMap[notification.type] || <Bell className="h-5 w-5" />}</span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#A58A54] dark:text-[#F59E0B]">{new Date(notification.created_at).toLocaleString()}</p>
          <h2 className="mt-2 text-xl font-bold text-[#111512] dark:text-[#F8FAFC]">{notification.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#555A56] dark:text-[#94A3B8]">{notification.message}</p>
        </div>
        {!notification.is_read && <span className="h-3 w-3 rounded-full bg-[#063C2F] dark:bg-[#14B8A6] flex-shrink-0 mt-2" />}
      </div>
    </article>
  );
}

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    loadNotifications();
    const interval = setInterval(loadNotifications, 15000);
    return () => clearInterval(interval);
  }, [loading]);

  const loadNotifications = async () => {
    try {
      const data = await listNotifications();
      setNotifications(data.items || []);
      setUnreadCount(data.unread_count || 0);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setFetching(false);
    }
  };

  const handleMarkAsRead = async (notifId: string) => {
    try {
      await markNotificationAsRead(notifId);
      setNotifications(notifications.map(n => n.id === notifId ? { ...n, is_read: true } : n));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-8 text-center">Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0F1C] text-[#111512] dark:text-[#F8FAFC]">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A58A54] dark:text-[#F59E0B]">Activity Feed & Access Keys</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Notifications</h1>
          <p className="mt-3 max-w-2xl text-[#555A56] dark:text-[#94A3B8]">Stay updated on your booking turnstile passes, schedule reminders, venue status updates, and reviews.</p>
        </div>
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button onClick={handleMarkAllRead} className="rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] px-4 py-3 text-sm text-[#111512] dark:text-[#F8FAFC] hover:bg-[#E7E5DE] dark:hover:bg-[#2D3547]"><CheckCheck className="mr-2 inline h-4 w-4" />Mark all as read ({unreadCount})</button>
          )}
           <Link href="/dashboard/settings" className="flex items-center rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] px-4 py-3 text-sm text-[#111512] dark:text-[#F8FAFC] hover:bg-[#E7E5DE] dark:hover:bg-[#2D3547]">
             <Settings2 className="mr-2 inline h-4 w-4" />
             Notification Settings
           </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <main className="space-y-8">
          {fetching ? (
            <div className="text-center text-[#555A56] dark:text-[#94A3B8]">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-[#777C78] dark:text-[#64748B] mb-4" />
              <p className="text-[#555A56] dark:text-[#94A3B8]">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map(notif => (
                <NotificationItem key={notif.id} notification={notif} onRead={handleMarkAsRead} />
              ))}
            </div>
          )}
        </main>

        <aside className="space-y-6 lg:sticky lg:top-28">
          <div className="rounded-2xl bg-[#063C2F] dark:bg-[#14B8A6] p-6 text-white dark:text-[#0B0F1C] shadow-xl shadow-black/10">
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-[#BFE6D8] dark:text-[#0B0F1C]">Notification Status</p>
              <span className={`rounded-full border px-3 py-1 text-xs ${unreadCount > 0 ? "border-red-300 bg-red-100 text-red-700 dark:border-red-600 dark:bg-red-900/30 dark:text-red-400" : "border-white/20 dark:border-[#0B0F1C]/20 text-white dark:text-[#0B0F1C]"}`}>
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
              </span>
            </div>
            <div className="mt-8">
              <p className="text-white/70 dark:text-[#0B0F1C]/70">Total notifications</p>
              <p className="text-4xl font-bold">{notifications.length}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-sm border border-[#E7E5DE] dark:border-[#334155]">
            <h2 className="text-xl font-bold text-[#111512] dark:text-[#F8FAFC]">Delivery Channels</h2>
            {["WhatsApp Instant Gate Pass", "Electronic PDF Receipts", "iCal & Google Synced"].map((item) => (
              <div key={item} className="mt-4 border-b border-[#E7E5DE] dark:border-[#334155] pb-4 last:border-0">
                <p className="font-medium text-[#111512] dark:text-[#F8FAFC]">{item}</p>
                <p className="text-sm text-[#777C78] dark:text-[#94A3B8]">Auto-enabled</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

