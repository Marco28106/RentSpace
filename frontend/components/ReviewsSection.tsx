"use client";

import React, { useState, useEffect } from "react";
import { Star, Upload, Loader } from "lucide-react";
import { getReviews, postReview, Review } from "../lib/api";
import { images } from "../lib/demo-data";

interface ReviewsSectionProps {
  placeId: string;
  bookingId?: string;
}

export default function ReviewsSection({ placeId, bookingId }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);

  useEffect(() => {
    loadReviews();
  }, [placeId]);

  const loadReviews = async () => {
    try {
      const data = await getReviews(placeId);
      setReviews(data.items || []);
    } catch (err) {
      console.error("Failed to load reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos((prev) => [...prev, ...files].slice(0, 5));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreview((prev) => [...prev, ...previews].slice(0, 5));
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreview((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmitReview = async () => {
    if (!text.trim()) {
      alert("Tulis ulasan terlebih dahulu");
      return;
    }

    setPosting(true);
    try {
      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("text", text);
      if (bookingId) formData.append("booking_id", bookingId);
      photos.forEach((photo) => formData.append("photos", photo));

      const newReview = await postReview(placeId, formData);
      setReviews((prev) => [newReview, ...prev]);
      setRating(5);
      setText("");
      setPhotos([]);
      setPhotoPreview([]);
      alert("Ulasan berhasil diposting");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Submit ulasan gagal");
    } finally {
      setPosting(false);
    }
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return { stars, count, percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0 };
  });

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0";

  return (
    <section className="mt-12 rounded-2xl bg-white dark:bg-[#0E1223] p-6 shadow-sm border border-[#E7E5DE] dark:border-[#334155]">
      <h2 className="text-2xl font-bold text-[#111512] dark:text-[#F8FAFC]">Reviews & Feedback</h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-[#111512] dark:text-[#F8FAFC]">{averageRating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(Number(averageRating)) ? "fill-[#A58A54] text-[#A58A54]" : "text-[#D8D6CE] dark:text-[#334155]"}`} />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-[#555A56] dark:text-[#94A3B8]">Based on {reviews.length} verified reviews</p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-[#A58A54] text-[#A58A54]" />
                  ))}
                </div>
                <div className="h-2 w-24 rounded-full bg-[#E7E5DE] dark:bg-[#334155] overflow-hidden">
                  <div
                    className="h-full bg-[#A58A54]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-[#777C78] dark:text-[#94A3B8]">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {bookingId && (
            <div className="rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] p-4 border border-[#E7E5DE] dark:border-[#334155]">
              <h3 className="font-bold text-[#111512] dark:text-[#F8FAFC] mb-4">Share Your Experience</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111512] dark:text-[#F8FAFC] mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating
                            ? "fill-[#A58A54] text-[#A58A54]"
                            : "text-[#D8D6CE] dark:text-[#334155]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111512] dark:text-[#F8FAFC] mb-2">Review</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full rounded-lg bg-white dark:bg-[#0E1223] dark:border dark:border-[#334155] dark:text-[#F8FAFC] px-4 py-3 text-sm"
                  rows={4}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111512] dark:text-[#F8FAFC] mb-2">Photos (max 5)</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {photoPreview.map((preview, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition text-white"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {photos.length < 5 && (
                    <label className="w-20 h-20 rounded-lg border-2 border-dashed border-[#D8D6CE] dark:border-[#334155] flex items-center justify-center cursor-pointer hover:bg-[#E7E5DE] dark:hover:bg-[#1A1E2F] transition">
                      <Upload className="h-5 w-5 text-[#777C78] dark:text-[#94A3B8]" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmitReview}
                disabled={posting}
                className="w-full rounded-lg bg-[#063C2F] dark:bg-[#14B8A6] px-4 py-2 font-semibold text-white dark:text-[#0B0F1C] hover:bg-[#075342] dark:hover:bg-[#0FD9B8] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {posting ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Review"
                )}
              </button>
            </div>
          )}

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 text-[#555A56] dark:text-[#94A3B8]">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-[#555A56] dark:text-[#94A3B8]">No reviews yet</div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="rounded-lg bg-[#F4F3EF] dark:bg-[#1A1E2F] p-4 border border-[#E7E5DE] dark:border-[#334155]">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={review.user_avatar || images.avatar}
                      alt={review.user_name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#111512] dark:text-[#F8FAFC]">{review.user_name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? "fill-[#A58A54] text-[#A58A54]" : "text-[#D8D6CE] dark:text-[#334155]"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#777C78] dark:text-[#94A3B8]">
                          {new Date(review.created_at).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#555A56] dark:text-[#94A3B8] mb-3">{review.text}</p>
                  {review.photos && review.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="h-16 w-16 rounded object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
