"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, Lock, Mail, Phone, User } from "lucide-react";
import BrandMark from "../../components/BrandMark";
import DarkModeToggle from "../../components/DarkModeToggle";
import { images } from "../../lib/demo-data";
import { register } from "../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      console.log("Registering as role:", role);
      const res = await register(name, email, password, role, phone);
      console.log("Register success:", res);
      if (role === "OWNER") {
        router.push("/dashboard/places");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#020617]">
      <header className="border-b border-[#E7E5DE] dark:border-[#334155] bg-[#FAF9F6] dark:bg-[#0E1223]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <Link href="/" className="text-sm font-medium text-[#111512] dark:text-[#F8FAFC] hover:text-[#063C2F] dark:hover:text-[#14B8A6]">Return to Discovery</Link>
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

        <section className="rounded-b-2xl bg-white dark:bg-[#0E1223] p-8 shadow-xl shadow-black/5 lg:rounded-r-2xl lg:rounded-bl-none sm:p-12">
          <div className="mx-auto max-w-xl">
            <div className="mb-8 flex items-center justify-between">
              <BrandMark compact />
              <DarkModeToggle />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#111512] dark:text-[#F8FAFC]">Create your RentSpace account.</h2>
            <p className="mt-2 text-[#555A56] dark:text-[#94A3B8]">Discover trusted spaces for sports, work, creativity, and events.</p>

            <div className="mt-8 grid grid-cols-2 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] p-1">
              <button
                type="button"
                onClick={() => setRole("CUSTOMER")}
                className={`rounded-lg py-3 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-[#063C2F] dark:focus-visible:ring-[#14B8A6] focus-visible:ring-offset-1 dark:focus-visible:ring-offset-[#0E1223] ${
                  role === "CUSTOMER" ? "bg-white dark:bg-[#0E1223] shadow-sm text-[#111512] dark:text-[#F8FAFC]" : "text-[#555A56] dark:text-[#94A3B8] hover:text-[#111512] dark:hover:text-[#F8FAFC]"
                }`}
              >
                Book Spaces (Customer)
              </button>
              <button
                type="button"
                onClick={() => setRole("OWNER")}
                className={`rounded-lg py-3 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-[#063C2F] dark:focus-visible:ring-[#14B8A6] focus-visible:ring-offset-1 dark:focus-visible:ring-offset-[#0E1223] ${
                  role === "OWNER" ? "bg-white dark:bg-[#0E1223] shadow-sm text-[#111512] dark:text-[#F8FAFC]" : "text-[#555A56] dark:text-[#94A3B8] hover:text-[#111512] dark:hover:text-[#F8FAFC]"
                }`}
              >
                List Spaces (Host / Owner)
              </button>
            </div>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
               <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">Full Name</span>
                  <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] px-4 py-3 focus-within:ring-2 focus-within:ring-[#063C2F] dark:focus-within:ring-[#14B8A6] focus-within:ring-offset-2 dark:focus-within:ring-offset-[#0E1223] transition-all">
                    <User className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
                    <input className="w-full bg-transparent outline-none placeholder:text-[#9CA19E] dark:placeholder:text-[#64748B] text-[#111512] dark:text-[#F8FAFC]" placeholder="e.g., Dimas Pratama" value={name} onChange={(e) => setName(e.target.value)} required />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">Work or Personal Email</span>
                  <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] px-4 py-3 focus-within:ring-2 focus-within:ring-[#063C2F] dark:focus-within:ring-[#14B8A6] focus-within:ring-offset-2 dark:focus-within:ring-offset-[#0E1223] transition-all">
                    <Mail className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
                    <input className="w-full bg-transparent outline-none placeholder:text-[#9CA19E] dark:placeholder:text-[#64748B] text-[#111512] dark:text-[#F8FAFC]" placeholder="dimas@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </span>
                </label>
                 <label className="block">
                   <span className="mb-2 block text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">Phone Number</span>
                   <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] px-4 py-3 focus-within:ring-2 focus-within:ring-[#063C2F] dark:focus-within:ring-[#14B8A6] focus-within:ring-offset-2 dark:focus-within:ring-offset-[#0E1223] transition-all">
                     <Phone className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
                     <input className="w-full bg-transparent outline-none placeholder:text-[#9CA19E] dark:placeholder:text-[#64748B] text-[#111512] dark:text-[#F8FAFC]" placeholder="e.g., 08123456789" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                   </span>
                 </label>
                 <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">Password</span>
                    <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] px-4 py-3 focus-within:ring-2 focus-within:ring-[#063C2F] dark:focus-within:ring-[#14B8A6] focus-within:ring-offset-2 dark:focus-within:ring-offset-[#0E1223] transition-all">
                      <Lock className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
                      <input className="w-full bg-transparent outline-none placeholder:text-[#9CA19E] dark:placeholder:text-[#64748B] text-[#111512] dark:text-[#F8FAFC]" placeholder="Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] hover:text-[#063C2F] dark:hover:text-[#14B8A6] flex-shrink-0 transition-colors focus-visible:ring-2 focus-visible:ring-[#063C2F] dark:focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E1223] rounded" aria-label={showPassword ? "Hide password" : "Show password"}>
                        <Eye className="h-5 w-5" />
                      </button>
                    </span>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#111512] dark:text-[#F8FAFC]">Confirm Password</span>
                      <span className="flex items-center gap-3 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] px-4 py-3 focus-within:ring-2 focus-within:ring-[#063C2F] dark:focus-within:ring-[#14B8A6] focus-within:ring-offset-2 dark:focus-within:ring-offset-[#0E1223] transition-all">
                        <Lock className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] flex-shrink-0" />
                        <input className="w-full bg-transparent outline-none placeholder:text-[#9CA19E] dark:placeholder:text-[#64748B] text-[#111512] dark:text-[#F8FAFC]" placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8] hover:text-[#063C2F] dark:hover:text-[#14B8A6] flex-shrink-0 transition-colors focus-visible:ring-2 focus-visible:ring-[#063C2F] dark:focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E1223] rounded" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                          <Eye className="h-5 w-5" />
                        </button>
                      </span>
                  </label>
                </div>
               {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <label className="flex gap-3 text-sm text-[#555A56] dark:text-[#94A3B8]">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#063C2F] dark:accent-[#14B8A6]" />
                <span>I agree to the RentSpace Terms of Service and Escrow Protection Policy.</span>
              </label>
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#063C2F] dark:bg-[#14B8A6] px-5 py-4 font-semibold text-white dark:text-[#0B0F1C] shadow-md hover:bg-[#075342] dark:hover:bg-[#0FD9B8] active:bg-[#042E25] dark:active:bg-[#0D9B88] disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#063C2F] dark:focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E1223] transition-all">
                {loading ? "Creating account..." : "Create Account"} <ArrowRight className="h-5 w-5" />
              </button>
            </form>
            <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4F3EF] dark:bg-[#020617] py-3 font-medium text-[#111512] dark:text-[#F8FAFC] hover:bg-[#E7E5DE] dark:hover:bg-[#475569] border border-transparent dark:border-[#334155] focus-visible:ring-2 focus-visible:ring-[#063C2F] dark:focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E1223] transition-all">
              <CheckCircle2 className="h-4 w-4 text-[#063C2F] dark:text-[#14B8A6]" /> Continue with Google
            </button>
                <p className="mt-8 text-center text-sm text-[#555A56] dark:text-[#94A3B8]">
                  Already have an account?{' '}
                  <Link href={role === "OWNER" ? "/login?role=owner" : "/login"} className="font-semibold text-[#111512] dark:text-[#F8FAFC] hover:text-[#063C2F] dark:hover:text-[#14B8A6] focus-visible:ring-2 focus-visible:ring-[#063C2F] dark:focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E1223]">Sign in</Link>
                </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E7E5DE] dark:border-[#334155] py-6 text-center text-sm text-[#555A56] dark:text-[#94A3B8]">
        © 2025 RentSpace Inc. Architectural grade sanctuary reservations.
      </footer>
    </div>
  );
}

