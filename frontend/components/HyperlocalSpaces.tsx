import React from "react";
import Link from "next/link";
import { ChevronRight, Navigation } from "lucide-react";

interface HyperlocalItem {
  id: string;
  distance: string;
  area: string;
  title: string;
  description: string;
  price: number;
}

const nearbySpaces: HyperlocalItem[] = [
  {
    id: "nearby-1",
    distance: "1.2 km away",
    area: "Senayan, Central Jakarta",
    title: "Gelora Daylight Multipurpose Court",
    description:
      "Outdoor synthetic turf suitable for futsal 5v5 and circuit conditioning drills.",
    price: 120000,
  },
  {
    id: "nearby-2",
    distance: "2.4 km away",
    area: "Gunawarman, Kebayoran",
    title: "Kura Ceramic & Workshop Studio",
    description:
      "Handcrafted clay pottery wheel station, natural skylights, and wet sinks for private masterclasses.",
    price: 185000,
  },
  {
    id: "nearby-3",
    distance: "3.8 km away",
    area: "Menteng, Jakarta",
    title: "Cendana Heritage Salon & Library",
    description:
      "Colonial architecture parlor with soundproof partitions ideal for book launches and offsite retreats.",
    price: 420000,
  },
];

export default function HyperlocalSpaces() {
  return (
    <section className="my-16 bg-[#F4F3EF] rounded-3xl p-6 sm:p-10 border border-[#E7E5DE]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#777C78]">
            <Navigation className="w-3.5 h-3.5 text-[#063C2F]" />
            <span>Hyperlocal Discovery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111512] mt-1">
            Spaces near you
          </h2>
        </div>
        <p className="text-sm text-[#555A56] max-w-md">
          Find a place that fits your plans within 5 km of your current location.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nearbySpaces.map((item) => {
          const formattedPrice = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(item.price);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-[#E7E5DE] shadow-sm flex flex-col justify-between hover:border-[#D8D6CE] transition-all"
            >
              <div>
                {/* Distance and Area */}
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-[#E8F0ED] text-[#063C2F] font-semibold text-[11px]">
                    {item.distance}
                  </span>
                  <span className="text-[#777C78] truncate text-[11px]">
                    {item.area}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#111512] line-clamp-1 mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#555A56] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & CTA */}
              <div className="mt-5 pt-3 border-t border-[#F4F3EF] flex items-center justify-between">
                <div className="text-sm font-bold text-[#111512]">
                  {formattedPrice} <span className="text-xs text-[#777C78] font-normal">/ hr</span>
                </div>
                <Link
                  href={`/places/${item.id}`}
                  className="text-xs font-semibold text-[#063C2F] hover:underline flex items-center gap-0.5"
                >
                  <span>Book Next Slot</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
