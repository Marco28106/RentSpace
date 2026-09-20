export const images = {
  futsal:
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80",
  court:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop&q=80",
  studio:
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
  studioAlt:
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&auto=format&fit=crop&q=80",
  meeting:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
  badminton:
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&auto=format&fit=crop&q=80",
  gallery:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&auto=format&fit=crop&q=80",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
  host:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
};

export const primaryVenue = {
  id: "urban-arena-futsal",
  name: "Urban Arena Futsal & Athletics Complex",
  shortName: "Urban Arena Futsal",
  category: "FUTSAL & ATHLETIC",
  location: "Puri Indah, Jakarta Barat",
  address: "Jl. Puri Indah Raya No. 12, Kembangan",
  rating: 4.96,
  reviews: 128,
  price: 150000,
  date: "Friday, Oct 24, 2025",
  time: "19:00 - 21:00 WIB",
  duration: "2.0 Hours",
  reference: "RS-992014",
};

export const savedSpaces = [
  {
    id: "lumina-daylight-loft",
    title: "Lumina Daylight Loft & Creative Studio",
    category: "DAYLIGHT PHOTO STUDIO",
    location: "Kemang, South Jakarta - 1.4 km away",
    price: 350000,
    rating: 4.98,
    reviewCount: 94,
    imageUrl: images.studio,
    badge: "INSTANT BOOK",
  },
  {
    id: "urban-arena-futsal",
    title: "Urban Arena Futsal & Athletics Complex",
    category: "FUTSAL & ATHLETIC",
    location: "Jakarta Barat - 3.2 km away",
    price: 150000,
    rating: 4.9,
    reviewCount: 128,
    imageUrl: images.futsal,
    badge: "FIBA CERTIFIED",
  },
  {
    id: "apex-badminton",
    title: "Apex Grand Badminton Pavilion",
    category: "BADMINTON ARENA",
    location: "BSD City - 5.0 km away",
    price: 110000,
    rating: 4.89,
    reviewCount: 156,
    imageUrl: images.badminton,
    badge: "BWF APPROVED MATS",
  },
  {
    id: "summit-boardroom",
    title: "Summit Boardroom & Executive Suite",
    category: "EXECUTIVE BOARDROOM",
    location: "Kuningan, South Jakarta - 1.8 km away",
    price: 250000,
    rating: 4.91,
    reviewCount: 42,
    imageUrl: images.meeting,
    badge: "CONCIERGE SUPPORTED",
  },
];

export function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

