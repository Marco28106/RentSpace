"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out. We'll get back to you soon!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-[#063C2F] dark:text-[#14B8A6] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-12">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-[#063C2F] dark:text-[#14B8A6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">Email</h3>
                <p className="text-[#555A56] dark:text-[#94A3B8]">support@rentspace.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-[#063C2F] dark:text-[#14B8A6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">Phone</h3>
                <p className="text-[#555A56] dark:text-[#94A3B8]">+62 21 XXXX XXXX</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-[#063C2F] dark:text-[#14B8A6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC]">Office</h3>
                <p className="text-[#555A56] dark:text-[#94A3B8]">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0E1223] border border-[#E7E5DE] dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC]"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0E1223] border border-[#E7E5DE] dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC]"
              required
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0E1223] border border-[#E7E5DE] dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC]"
              required
            />
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl bg-[#063C2F] dark:bg-[#14B8A6] text-white dark:text-[#0F172A] font-semibold hover:bg-[#075342] dark:hover:bg-[#0D9488] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
