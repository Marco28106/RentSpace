"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface PlaceGalleryProps {
  images: string[];
  title: string;
}

export default function PlaceGallery({ images, title }: PlaceGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl bg-[#F4F3EF] dark:bg-[#1A1E2F] group">
          <img
            src={images[currentIndex]}
            alt={`${title} - slide ${currentIndex + 1}`}
            className="h-full min-h-[400px] w-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500 ease-out"
            onClick={() => setShowLightbox(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 dark:bg-[#0E1223]/95 backdrop-blur-md p-2.5 hover:bg-white dark:hover:bg-[#1E293B] hover:shadow-lg active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-[#111512] dark:text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 dark:bg-[#0E1223]/95 backdrop-blur-md p-2.5 hover:bg-white dark:hover:bg-[#1E293B] hover:shadow-lg active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-[#111512] dark:text-white" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 auto-rows-[100px] lg:auto-rows-[110px]">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={image}
              className={`relative overflow-hidden rounded-xl bg-[#F4F3EF] dark:bg-[#1A1E2F] cursor-pointer transition-all duration-200 hover:shadow-lg group ${
                index === currentIndex ? "ring-2 ring-brand dark:ring-[#14B8A6] scale-105" : "hover:scale-105"
              }`}
              onClick={() => goToSlide(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && goToSlide(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover group-hover:brightness-110 transition-all duration-300"
              />
              {index === 3 && images.length > 4 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLightbox(true);
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm"
                  aria-label={`View all ${images.length} photos`}
                >
                  <div className="flex flex-col items-center gap-1.5 text-white">
                    <Camera className="h-5 w-5" />
                    <span className="text-xs font-semibold">+{images.length - 4}</span>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {showLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-5xl px-4 py-6">
            <img
              src={images[currentIndex]}
              alt={`Lightbox ${currentIndex + 1}`}
              className="h-auto max-h-[80vh] w-full object-contain rounded-xl"
            />
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute -right-4 top-4 text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full"
              aria-label="Close lightbox"
            >
              <span className="text-3xl font-light">×</span>
            </button>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md p-2.5 hover:bg-white/30 text-white transition-all focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous image in lightbox"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md p-2.5 hover:bg-white/30 text-white transition-all focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next image in lightbox"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
