"use client";

import { useState } from "react";
import ProfilePanel from "./ProfilePanel";
import Link from "next/link";

<Link href="/mint">Mint</Link>


export default function BottomNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-20 w-full max-w-[420px]">
        <div className="mx-3 mb-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10">
          <div className="flex justify-between px-6 py-3 text-xs font-medium">
            <button className="opacity-60">Mint</button>
            <button className="text-purple-400 font-bold scale-110">Home</button>
            <button
              onClick={() => setOpen(true)}
              className="opacity-60"
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      <ProfilePanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
