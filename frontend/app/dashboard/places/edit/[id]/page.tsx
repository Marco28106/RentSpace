"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader } from "lucide-react";
import { apiRequest } from "../../../../../lib/api";
import { useAuth } from "../../../../../context/AuthContext";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type PlaceData = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  district?: string;
  category_id: string;
  capacity?: number;
  price: number;
};

export default function EditPlacePage() {
  const router = useRouter();
  const params = useParams();
  const placeId = params.id as string;
  const { user, loading: authLoading } = useAuth();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<PlaceData>({
    id: "",
    name: "",
    description: "",
    address: "",
    city: "",
    district: "",
    category_id: "",
    capacity: 0,
    price: 0,
  });

  useEffect(() => {
    if (!authLoading && user?.role !== "OWNER") {
      router.push("/become-owner");
      return;
    }

    async function loadData() {
      try {
        setLoading(true);
        const [place, cats] = await Promise.all([
          apiRequest<PlaceData>(`/owner/places/${placeId}`),
          apiRequest<{ items: Category[] }>("/categories"),
        ]);
        
        setFormData(place);
        setCategories(cats.items || []);
        setError("");
      } catch (err) {
        setError("Failed to load place data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (placeId) {
      loadData();
    }
  }, [placeId, authLoading, user, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.address || !formData.city) {
      setError("Please fill all required fields");
      return;
    }

    if (formData.price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    try {
      setSaving(true);
      setError("");
      
      await apiRequest(`/owner/places/${placeId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          category_id: formData.category_id,
          capacity: formData.capacity || null,
          price: formData.price,
        }),
      });
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/places/my-places");
      }, 1500);
    } catch (err) {
      setError("Failed to update place");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0B0F1C] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-[#063C2F] dark:text-[#14B8A6] mx-auto mb-4" />
          <p className="text-[#555A56] dark:text-[#94A3B8]">Loading place details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F1C]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#063C2F] dark:text-[#14B8A6] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-[#111512] dark:text-[#F8FAFC] mb-8">Edit Place</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm">
              Place updated successfully! Redirecting...
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#111512] dark:text-[#F8FAFC] mb-2">
              Place Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Urban Arena Futsal"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] text-[#111512] dark:text-[#F8FAFC] placeholder-[#9CA19E] focus:outline-none focus:border-[#063C2F] transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-[#111512] dark:text-[#F8FAFC] mb-2">
              Category *
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] text-[#111512] dark:text-[#F8FAFC] focus:outline-none focus:border-[#063C2F] transition-colors"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#111512] dark:text-[#F8FAFC] mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your space..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] text-[#111512] dark:text-[#F8FAFC] placeholder-[#9CA19E] focus:outline-none focus:border-[#063C2F] transition-colors resize-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-[#111512] dark:text-[#F8FAFC] mb-2">
              Address *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Full address"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] text-[#111512] dark:text-[#F8FAFC] placeholder-[#9CA19E] focus:outline-none focus:border-[#063C2F] transition-colors"
            />
          </div>

          {/* City & District */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#111512] dark:text-[#F8FAFC] mb-2">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Jakarta"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] text-[#111512] dark:text-[#F8FAFC] placeholder-[#9CA19E] focus:outline-none focus:border-[#063C2F] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111512] dark:text-[#F8FAFC] mb-2">
                District
              </label>
              <input
                type="text"
                value={formData.district || ""}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="Optional"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] text-[#111512] dark:text-[#F8FAFC] placeholder-[#9CA19E] focus:outline-none focus:border-[#063C2F] transition-colors"
              />
            </div>
          </div>

          {/* Capacity & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#111512] dark:text-[#F8FAFC] mb-2">
                Capacity (pax)
              </label>
              <input
                type="number"
                value={formData.capacity || ""}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                placeholder="100"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] text-[#111512] dark:text-[#F8FAFC] placeholder-[#9CA19E] focus:outline-none focus:border-[#063C2F] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111512] dark:text-[#F8FAFC] mb-2">
                Price /hour (Rp) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                placeholder="50000"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5DE] dark:border-[#334155] bg-white dark:bg-[#0E1223] text-[#111512] dark:text-[#F8FAFC] placeholder-[#9CA19E] focus:outline-none focus:border-[#063C2F] transition-colors"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-[#E7E5DE] dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC] hover:bg-[#F4F3EF] dark:hover:bg-[#1A1E2F] transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#063C2F] dark:bg-[#14B8A6] text-white hover:bg-[#075342] dark:hover:bg-[#0D9488] disabled:opacity-50 transition-colors font-semibold"
            >
              {saving && <Loader className="w-4 h-4 animate-spin" />}
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
