"use client";

import { useEffect, useState } from "react";

export default function Splash() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center space-y-4 animate-pulse">
        <div className="text-4xl font-bold text-purple-500">EXIROS</div>
        <div className="text-sm opacity-60">Building on Base</div>
      </div>
    </div>
  );
}
