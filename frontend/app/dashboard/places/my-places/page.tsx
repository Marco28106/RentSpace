"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Plus, MapPin, Users, DollarSign, Star } from "lucide-react";
import { apiRequest } from "../../../../lib/api";
import { useAuth } from "../../../../context/AuthContext";
import { formatIDR } from "../../../../lib/demo-data";

type Place = {
  id: string;
  name: string;
  city: string;
  capacity?: number;
  price: number;
  image_url?: string;
  images?: Array<{ image_url: string }>;
  rating?: number;
  review_count?: number;
  category?: { name: string };
};

export default function MyPlacesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user?.role !== "OWNER") {
      router.push("/become-owner");
      return;
    }

    loadPlaces();
  }, [user, loading, router]);

  async function loadPlaces() {
    try {
      setLoadingPlaces(true);
      const data = await apiRequest<{
        items: Place[];
      }>("/owner/places");
      setPlaces(data.items || []);
      setError("");
    } catch (err) {
      setError("Failed to load places");
      console.error(err);
    } finally {
      setLoadingPlaces(false);
    }
  }

  async function deletePlace(placeId: string) {
    try {
      await apiRequest(`/owner/places/${placeId}`, { method: "DELETE" });
      setPlaces(places.filter((p) => p.id !== placeId));
      setDeleteConfirm(null);
    } catch (err) {
      setError("Failed to delete place");
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111512] dark:text-[#F8FAFC]">My Places</h1>
            <p className="text-sm text-[#555A56] dark:text-[#94A3B8] mt-1">Manage your listed spaces</p>
          </div>
                <button
                 onClick={() => router.push("/dashboard/places/edit")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#063C2F] dark:bg-[#14B8A6] text-white hover:bg-[#075342] dark:hover:bg-[#0D9488] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>List New Place</span>
                </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {loadingPlaces ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] h-80 animate-pulse" />
            ))}
          </div>
        ) : places.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#555A56] dark:text-[#94A3B8] mb-4">No places listed yet</p>
            <button
              onClick={() => router.push("/dashboard/places")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#063C2F] dark:bg-[#14B8A6] text-white hover:bg-[#075342]"
            >
              <Plus className="w-4 h-4" />
              List Your First Place
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <div
                key={place.id}
                className="rounded-xl border border-[#E7E5DE] dark:border-[#334155] overflow-hidden bg-white dark:bg-[#0E1223] hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="aspect-[4/3] w-full bg-[#F4F3EF] dark:bg-[#1E293B] overflow-hidden">
                  {place.image_url || (place.images && place.images.length > 0) ? (
                    <img
                      src={place.image_url || place.images?.[0]?.image_url}
                      alt={place.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                      No image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-[#111512] dark:text-[#F8FAFC] truncate">
                      {place.name}
                    </h3>
                    <p className="text-xs text-[#555A56] dark:text-[#94A3B8] flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {place.city}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 text-sm">
                    {place.category && (
                      <p className="text-xs text-[#777C78] dark:text-[#94A3B8]">
                        {place.category.name}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-[#111512] dark:text-[#F8FAFC]">
                      <span className="font-semibold">Rp {(place.price || 0).toLocaleString('id-ID')}</span>
                      <span className="text-xs text-[#555A56] dark:text-[#94A3B8]">/hour</span>
                    </div>
                    {place.capacity && (
                      <div className="flex items-center gap-2 text-[#555A56] dark:text-[#94A3B8]">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{place.capacity} pax</span>
                      </div>
                    )}
                    {place.rating && (
                      <div className="flex items-center gap-1 text-[#555A56] dark:text-[#94A3B8]">
                        <Star className="w-4 h-4 fill-[#A58A54] text-[#A58A54]" />
                        <span className="text-sm">{place.rating.toFixed(1)}</span>
                        <span className="text-xs">({place.review_count || 0})</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-[#E7E5DE] dark:border-[#334155]">
                    <button
                      onClick={() => router.push(`/dashboard/places/edit/${place.id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#063C2F] dark:bg-[#14B8A6] text-white text-sm font-medium hover:bg-[#075342] dark:hover:bg-[#0D9488] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(place.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#0E1223] rounded-2xl p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#111512] dark:text-[#F8FAFC] mb-2">
              Delete Place?
            </h3>
            <p className="text-sm text-[#555A56] dark:text-[#94A3B8] mb-6">
              This action cannot be undone. All bookings and data will be deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#E7E5DE] dark:border-[#334155] text-[#111512] dark:text-[#F8FAFC] hover:bg-[#F4F3EF] dark:hover:bg-[#1A1E2F] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePlace(deleteConfirm)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
