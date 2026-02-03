"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type User = {
  username: string;
  fid: number;
  wallet: string;
  xp: number;
};

type MenuItem = {
  name: string;
  icon: string;
};

export default function TasksPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ USER IS NEVER NULL → NO TYPESCRIPT ERROR
  const [user, setUser] = useState<User>({
    username: "username",
    fid: 12345,
    wallet: "0xAbc…1234",
    xp: 0,
  });

  const xp = user.xp; // ✅ always a number

  const tasks = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "Coming Soon",
  }));

  const menuIcons: MenuItem[] = [
    { name: "Home", icon: "/icons/home.svg" },
    { name: "Mints", icon: "/icons/mints.svg" },
    { name: "Wallet", icon: "/icons/wallet.svg" },
    { name: "Menu", icon: "/icons/menu.svg" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND */}
      <Image
        src="/bg-tasks.jpg"
        alt="Background"
        fill
        priority
        style={{
          objectFit: "cover",
          filter: "blur(12px) brightness(0.45)",
        }}
      />

      {/* MAIN CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: 14,
          paddingBottom: 120,
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/exiros-logo.png" width={36} height={36} />
          <div>
            <div style={{ fontWeight: 800 }}>Exiros</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>Tasks</div>
          </div>
        </div>

        {/* TASK LIST */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: "rgba(18,18,18,0.7)",
                borderRadius: 16,
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {task.id}. {task.name}
              </div>
              <button
                disabled
                style={{
                  background: "rgba(79,70,229,0.35)",
                  border: "none",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: 12,
                  opacity: 0.6,
                }}
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 20,
          }}
        />
      )}

      {/* RIGHT MENU */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 320,
          backgroundColor: "#0f0f0f",
          zIndex: 30,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800 }}>Account</div>

        {/* USER */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: 14,
            marginTop: 16,
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.6 }}>Farcaster</div>
          <div style={{ fontWeight: 700 }}>@{user.username}</div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>FID {user.fid}</div>
        </div>

        {/* WALLET */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: 14,
            marginTop: 12,
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.6 }}>Wallet (Base)</div>
          <div style={{ fontWeight: 700 }}>{user.wallet}</div>
        </div>

        {/* XP — ✅ FIXED */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: 14,
            marginTop: 12,
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.6 }}>XP</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{xp} XP</div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            ≈ ${(xp / 100).toFixed(2)}
          </div>
        </div>

        {/* XP CONVERSION */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: 14,
            marginTop: 12,
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.6 }}>XP Conversion</div>
          <div style={{ fontSize: 16, fontWeight: 800 }}>XP → USDT</div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>Coming soon</div>
        </div>

        <button
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: "auto",
            width: "100%",
            padding: 12,
            borderRadius: 14,
            border: "none",
            backgroundColor: "#4f46e5",
            color: "white",
            fontWeight: 800,
          }}
        >
          Close
        </button>
      </div>

      {/* BOTTOM MENU */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 10,
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15,15,15,0.9)",
            borderRadius: 18,
            display: "flex",
            justifyContent: "space-around",
            padding: "12px 8px",
          }}
        >
          {menuIcons.map((item, i) => (
            <button
              key={i}
              onClick={() => item.name === "Menu" && setMenuOpen(true)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <img
                src={item.icon}
                width={22}
                height={22}
                style={{ filter: "invert(1)" }}
              />
              <div style={{ fontSize: 11 }}>{item.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
