"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";
import { apiRequest } from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function NewPlacePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    category_id: "",
    capacity: "",
  });

  useEffect(() => {
    if (!loading && user?.role !== "OWNER") {
      router.push("/become-owner");
      return;
    }

    async function loadCategories() {
      try {
        const data = await apiRequest<{
          items: Category[];
        }>("/categories");
        setCategories(data.items);
      } catch (err) {
        console.error("Could not load categories");
      }
    }

    loadCategories();
  }, [user, loading, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    try {
      await apiRequest("/owner/places", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          category_id: formData.category_id,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
        }),
      });
      router.push("/dashboard/places");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create place.");
    } finally {
      setFormLoading(false);
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (user?.role !== "OWNER")
    return <div className="p-8 text-center">Redirecting...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111512]">List Your Space</h1>
        <p className="text-[#555A56] mt-2">
          Fill in the details to add your venue to RentSpace
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#E7E5DE] p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#111512] mb-2">
              Space Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Urban Arena Futsal"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5DE] bg-white text-[#111512] placeholder-[#777C78] focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-[#111512] mb-2">
              Category *
            </label>
            <select
              required
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5DE] bg-white text-[#111512] focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
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
            <label className="block text-sm font-semibold text-[#111512] mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your space, amenities, and features..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5DE] bg-white text-[#111512] placeholder-[#777C78] focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-[#111512] mb-2">
              Address *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Street address"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5DE] bg-white text-[#111512] placeholder-[#777C78] focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-[#111512] mb-2">
              City *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder="e.g., Jakarta"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5DE] bg-white text-[#111512] placeholder-[#777C78] focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-semibold text-[#111512] mb-2">
              Capacity (people)
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              placeholder="e.g., 50"
              min="1"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5DE] bg-white text-[#111512] placeholder-[#777C78] focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={formLoading}
            className="w-full py-3 rounded-xl bg-[#063C2F] hover:bg-[#075342] text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {formLoading ? "Creating..." : <>
              <Plus className="w-4 h-4" />
              Create Space
            </>}
          </button>
        </div>
      </form>
    </div>
  );
}
