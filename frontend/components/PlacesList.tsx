"use client";
import React, { useEffect, useState } from "react";
import PlaceCard from "./PlaceCard";

type Place = {
  id: string;
  name: string;
  city?: string;
  price?: number;
  image_url?: string | null;
};

const apiBase =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export default function PlacesList() {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch(`${apiBase}/places`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        const items = data?.data?.items || data?.items || [];
        setPlaces(items);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || "Failed to load");
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!places) return <div className="text-gray-600">Loading places…</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((p) => (
        <PlaceCard
          key={p.id}
          id={p.id}
          title={p.name}
          city={p.city}
          price={p.price || 0}
          imageUrl={p.image_url || null}
        />
      ))}
    </div>
  );
}
