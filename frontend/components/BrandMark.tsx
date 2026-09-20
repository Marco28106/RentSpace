import React from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#063C2F] text-white">
        <Building2 className="h-3.5 w-3.5" />
      </span>
      {!compact && <span className="text-lg font-bold tracking-tight">RentSpace</span>}
    </Link>
  );
}

