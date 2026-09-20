"use client";
import React, { useEffect, useState } from "react";

type Status = {
  ok: boolean;
  msg: string;
};

const apiBase =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export default function HealthCheck() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch(`${apiBase}/health`)
      .then((res) => {
        if (!res.ok) throw new Error("API unreachable");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setStatus({ ok: true, msg: data?.message || "ok" });
      })
      .catch((err) => {
        if (!mounted) return;
        setStatus({ ok: false, msg: err?.message || "unreachable" });
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="ml-4">
      {!status && <span className="text-gray-600">Checking API…</span>}
      {status && status.ok && (
        <span className="px-3 py-1 rounded-full bg-green-50 text-green-700">
          API: {status.msg}
        </span>
      )}
      {status && !status.ok && (
        <span className="px-3 py-1 rounded-full bg-red-50 text-red-700">
          API: {status.msg}
        </span>
      )}
    </div>
  );
}
