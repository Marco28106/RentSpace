"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, Lock, Mail, Phone, User } from "lucide-react";
import BrandMark from "../../components/BrandMark";
import { images } from "../../lib/demo-data";
import { register } from "../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    if (roleParam && ["CUSTOMER", "OWNER"].includes(roleParam.toUpperCase())) {
      setRole(roleParam.toUpperCase());
    }
  }, []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password, role, phone);
      router.push(role === "OWNER" ? "/dashboard/places" : "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="border-b border-[#E7E5DE]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <Link href="/" className="text-sm font-medium hover:text-[#063C2F]">Return to Discovery</Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="relative min-h-[640px] overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
          <img src={images.court} alt="Verified sports venue" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#063C2F]/70" />
          <div className="relative flex h-full flex-col justify-between p-8 text-white sm:p-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider">Verified Sanctuary</span>
              <span className="text-sm text-[#F0D49A]">Architectural Grade</span>
            </div>
            <div className="max-w-xl space-y-6">
              <div className="h-1 w-16 bg-[#F0D49A]" />
              <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
                Join thousands of athletes, creators, and teams booking verified physical spaces across Southeast Asia.
              </h1>
              <p className="text-lg text-white/85">
                From FIBA-spec parquet futsal arenas to acoustically treated master suites, RentSpace guarantees keyless entry and protected venue escrow.
              </p>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-[#F0D49A]">Featured Venue</p>
              <p className="font-semibold">Urban Arena Futsal - Olympic Standard Canadian Parquet</p>
            </div>
          </div>
        </section>

        <section className="rounded-b-2xl bg-white p-8 shadow-xl shadow-black/5 lg:rounded-r-2xl lg:rounded-bl-none sm:p-12">
          <div className="mx-auto max-w-xl">
            <div className="mb-8 flex items-center justify-between">
              <BrandMark compact />
              <span className="rounded-md bg-[#F4F3EF] px-4 py-2 text-xs font-semibold tracking-wider">PASS ENTRY V2.4</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Create your RentSpace account.</h2>
            <p className="mt-2 text-[#555A56]">Discover trusted spaces for sports, work, creativity, and events.</p>

            <div className="mt-8 grid grid-cols-2 rounded-xl bg-[#F4F3EF] p-1">
              <button
                type="button"
                onClick={() => setRole("CUSTOMER")}
                className={`rounded-lg py-3 text-sm font-medium transition-all ${
                  role === "CUSTOMER" ? "bg-white shadow-sm text-[#111512]" : "text-[#555A56]"
                }`}
              >
                Book Spaces (Customer)
              </button>
              <button
                type="button"
                onClick={() => setRole("OWNER")}
                className={`rounded-lg py-3 text-sm font-medium transition-all ${
                  role === "OWNER" ? "bg-white shadow-sm text-[#111512]" : "text-[#555A56]"
                }`}
              >
                List Spaces (Host / Owner)
              </button>
            </div>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                 <span className="mb-2 block text-sm font-medium">Full Name</span>
                 <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] px-4 py-3">
                   <User className="h-4 w-4 text-[#777C78]" />
                   <input className="w-full bg-transparent outline-none" placeholder="e.g., Dimas Pratama" value={name} onChange={(e) => setName(e.target.value)} required />
                 </span>
               </label>
               <label className="block">
                 <span className="mb-2 block text-sm font-medium">Work or Personal Email</span>
                 <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] px-4 py-3">
                   <Mail className="h-4 w-4 text-[#777C78]" />
                   <input className="w-full bg-transparent outline-none" placeholder="dimas@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                 </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Phone Number</span>
                  <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] px-4 py-3">
                    <Phone className="h-4 w-4 text-[#777C78]" />
                    <input className="w-full bg-transparent outline-none" placeholder="e.g., 08123456789" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </span>
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                 <label className="block">
                   <span className="mb-2 block text-sm font-medium">Password</span>
                   <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] px-4 py-3">
                     <Lock className="h-4 w-4 text-[#777C78]" />
                     <input className="w-full bg-transparent outline-none" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                     <Eye className="h-4 w-4 text-[#777C78]" />
                   </span>
                 </label>
                 <label className="block">
                   <span className="mb-2 block text-sm font-medium">Confirm Password</span>
                   <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] px-4 py-3">
                     <Lock className="h-4 w-4 text-[#777C78]" />
                     <input className="w-full bg-transparent outline-none" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                     <Eye className="h-4 w-4 text-[#777C78]" />
                   </span>
                 </label>
               </div>
               {error && <p className="text-sm text-red-600">{error}</p>}
              <label className="flex gap-3 text-sm">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#063C2F]" />
                <span>I agree to the RentSpace Terms of Service and Escrow Protection Policy.</span>
              </label>
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#063C2F] px-5 py-4 font-semibold text-white shadow-md hover:bg-[#075342] disabled:opacity-50">
                {loading ? "Creating account..." : "Create Account"} <ArrowRight className="h-5 w-5" />
              </button>
            </form>
            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4F3EF] py-4 font-medium">
              <CheckCircle2 className="h-4 w-4 text-[#063C2F]" /> Continue with Google
            </button>
            <p className="mt-8 text-center text-sm text-[#555A56]">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#111512] hover:text-[#063C2F]">Sign in</Link>
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

