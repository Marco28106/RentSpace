"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, AtSign, Eye, Lock, Star } from "lucide-react";
import BrandMark from "../../components/BrandMark";
import { images } from "../../lib/demo-data";
import { login } from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="border-b border-[#E7E5DE] bg-[#FAF9F6]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <Link href="/" className="text-sm font-medium text-[#111512] hover:text-[#063C2F]">
            Return to Discovery
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="relative min-h-[520px] overflow-hidden rounded-t-2xl bg-[#063C2F] lg:rounded-l-2xl lg:rounded-tr-none">
          <img src={images.studio} alt="Lumina daylight loft" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#063C2F]/65" />
          <div className="relative flex h-full flex-col justify-between p-8 text-white sm:p-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                Verified Sanctuary
              </span>
              <span className="rounded-full bg-[#063C2F]/70 px-4 py-2 text-sm">
                Acoustics & Daylight Grade A
              </span>
            </div>
            <div className="space-y-6">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F0D49A]">
                Curation Monograph 04
              </div>
              <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
                Spaces designed to inspire athletic excellence and refined creative focus.
              </h1>
              <div className="flex flex-col gap-4 border-t border-white/25 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">Lumina Daylight Loft & Creative Studio</p>
                  <p className="text-sm text-white/80">Kebayoran Baru - Jakarta Selatan</p>
                </div>
                <div className="rounded-xl bg-[#063C2F]/80 px-4 py-2 text-sm font-semibold">
                  <Star className="mr-1 inline h-4 w-4 fill-[#F0D49A] text-[#F0D49A]" />
                  4.98 (142)
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-b-2xl bg-white p-8 shadow-xl shadow-black/5 lg:rounded-r-2xl lg:rounded-bl-none sm:p-12">
          <div className="mx-auto flex h-full max-w-xl flex-col justify-center">
            <div className="mb-10 flex items-center justify-between">
              <BrandMark compact />
              <span className="rounded-full bg-[#F4F3EF] px-4 py-2 text-xs font-semibold tracking-wider">
                Member Portal
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome back.</h2>
            <p className="mt-3 max-w-md text-[#555A56]">
              Enter your credentials to manage bookings, check turnstile passes, and access your spaces.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
               <label className="block">
                 <span className="mb-2 flex justify-between text-sm font-medium">
                   Email Address <span className="font-normal text-[#777C78]">Business or Personal</span>
                 </span>
                 <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] px-4 py-4">
                   <AtSign className="h-5 w-5 text-[#777C78]" />
                   <input className="w-full bg-transparent outline-none" placeholder="name@domain.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                 </span>
               </label>
               <label className="block">
                 <span className="mb-2 block text-sm font-medium">Password</span>
                 <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] px-4 py-4">
                   <Lock className="h-5 w-5 text-[#777C78]" />
                   <input className="w-full bg-transparent outline-none" placeholder="••••••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                   <Eye className="h-5 w-5 text-[#777C78]" />
                 </span>
               </label>
               {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#063C2F]" />
                  Remember me for 30 days
                </label>
                <Link href="#" className="font-medium hover:text-[#063C2F]">Forgot password?</Link>
              </div>
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#063C2F] px-5 py-4 font-semibold text-white shadow-md transition hover:bg-[#075342] disabled:opacity-50">
                {loading ? "Signing in..." : "Sign In"} <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="my-8 flex items-center gap-4 text-xs uppercase tracking-wider text-[#555A56]">
              <span className="h-px flex-1 bg-[#E7E5DE]" /> Or continue with <span className="h-px flex-1 bg-[#E7E5DE]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-xl bg-[#F4F3EF] py-4 font-medium">Google</button>
              <button className="rounded-xl bg-[#F4F3EF] py-4 font-medium">Apple</button>
            </div>
            <p className="mt-8 text-center text-sm text-[#555A56]">
              Don't have an account yet?{" "}
              <Link href="/register" className="font-semibold text-[#111512] hover:text-[#063C2F]">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E7E5DE] py-6 text-center text-sm text-[#555A56]">
        © 2025 RentSpace Inc. Architectural grade sanctuary reservations.
      </footer>
    </div>
  );
}

