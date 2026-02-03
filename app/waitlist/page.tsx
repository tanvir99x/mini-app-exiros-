"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function WaitlistPage() {
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("user");

  useEffect(() => {
    const storedUser = localStorage.getItem("exiros_user");
    const waitlist = localStorage.getItem("exiros_waitlist");

    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u?.username) setUsername(u.username);
      } catch {}
    }

    if (waitlist === "true") {
      setJoined(true);
    }
  }, []);

  const joinWaitlist = () => {
    localStorage.setItem("exiros_waitlist", "true");
    setJoined(true);
  };

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
        alt="bg"
        fill
        priority
        style={{
          objectFit: "cover",
          filter: "blur(14px) brightness(0.45)",
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 20,
        }}
      >
        {/* LOGO */}
        <img
          src="/exiros-logo.png"
          alt="Exiros"
          width={72}
          height={72}
          style={{ marginBottom: 10 }}
        />

        {/* TITLE */}
        <div style={{ fontSize: 22, fontWeight: 900 }}>
          Early Access
        </div>

        <div style={{ fontSize: 14, opacity: 0.7, maxWidth: 320 }}>
          Exiros is opening rewards, XP conversion, and onchain perks
          to early users first.
        </div>

        {/* USER CARD */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: 18,
            padding: 16,
            width: "100%",
            maxWidth: 320,
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            Logged in as
          </div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>
            @{username}
          </div>
        </div>

        {/* ACTION */}
        {!joined ? (
          <button
            onClick={joinWaitlist}
            style={{
              width: "100%",
              maxWidth: 320,
              padding: "14px 16px",
              borderRadius: 16,
              border: "none",
              backgroundColor: "#4f46e5",
              color: "white",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 12px 30px rgba(79,70,229,0.4)",
            }}
          >
            Join Early User Waitlist
          </button>
        ) : (
          <div
            style={{
              backgroundColor: "rgba(79,70,229,0.15)",
              border: "1px solid rgba(79,70,229,0.4)",
              borderRadius: 16,
              padding: 16,
              width: "100%",
              maxWidth: 320,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800 }}>
              🎉 You’re in!
            </div>
            <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>
              We’ll unlock rewards and perks for you soon.
            </div>
          </div>
        )}

        {/* FOOTER NOTE */}
        <div style={{ fontSize: 12, opacity: 0.5, marginTop: 20 }}>
          Exiros Beta · Rewards coming soon
        </div>
      </div>
    </div>
  );
}
