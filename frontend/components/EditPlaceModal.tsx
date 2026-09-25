"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Trash2 } from "lucide-react";
import { updatePlace, getOwnerPlace, deletePlace } from "../lib/api";

export default function EditPlaceModal({
  placeId,
  onClose,
  onUpdated,
}: {
  placeId: string;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const res = await getOwnerPlace(placeId);
        setData(res);
        if (res.images?.[0]?.image_url) {
          setImagePreview(res.images[0].image_url);
        }
      } catch (e) {
        setError("Failed to load place");
      }
    }
    fetchPlace();
  }, [placeId]);

  const handleChange = (field: string, value: any) => {
    setData({ ...data, [field]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await updatePlace(placeId, {
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        category_id: data.category_id,
        capacity: data.capacity,
        status: data.status,
      });
      onUpdated();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this place? This action cannot be undone.")) return;
    setLoading(true);
    try {
      await deletePlace(placeId);
      onUpdated();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#777C78] hover:text-[#111512]"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Place</h2>
        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
              value={data.name}
              onChange={e => handleChange("name", e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
              value={data.category_id}
              onChange={e => handleChange("category_id", e.target.value)}
              placeholder="e.g., Futsal, Studio, etc."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
              rows={3}
              value={data.description}
              onChange={e => handleChange("description", e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
              value={data.address}
              onChange={e => handleChange("address", e.target.value)}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
              value={data.city}
              onChange={e => handleChange("city", e.target.value)}
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium mb-1">Capacity</label>
            <input
              type="number"
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
              value={data.capacity ?? ""}
              onChange={e => handleChange("capacity", e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#063C2F]"
              value={data.status}
              onChange={e => handleChange("status", e.target.value)}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#E7E5DE]">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#063C2F] text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#075342] disabled:opacity-50 transition-colors"
            >
              <Check className="w-4 h-4" /> Save Changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 text-white py-2 px-4 rounded-xl flex items-center gap-2 hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
