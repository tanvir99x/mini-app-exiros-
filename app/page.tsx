"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FarcasterUser = {
  fid: number;
  username: string;
  pfp_url: string;
};

type Stage = "installing" | "connect" | "loading";

export default function Home() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("installing");

  useEffect(() => {
    const timer = setTimeout(() => {
      const connected = localStorage.getItem("exiros_connected");
      if (connected === "true") {
        router.replace("/tasks");
      } else {
        setStage("connect");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  const connectFarcaster = async () => {
    setStage("loading");

    const fid = (window as any)?.farcaster?.fid;

    if (!fid) {
      alert("Open this app inside Farcaster / Warpcast");
      setStage("connect");
      return;
    }

    const res = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
      {
        headers: {
          api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY!,
        },
      }
    );

    const data = await res.json();
    const user = data.users[0];

    const farcasterUser: FarcasterUser = {
      fid: user.fid,
      username: user.username,
      pfp_url: user.pfp_url,
    };

    localStorage.setItem("exiros_connected", "true");
    localStorage.setItem(
      "exiros_farcaster",
      JSON.stringify(farcasterUser)
    );

    router.push("/tasks");
  };

  /* INSTALLING */
  if (stage === "installing") {
    return (
      <Screen>
        <img src="/exiros-logo.png" width={120} />
        <p>Initializing Exiros…</p>
      </Screen>
    );
  }

  /* LOADING */
  if (stage === "loading") {
    return (
      <Screen>
        <p>Connecting Farcaster…</p>
      </Screen>
    );
  }

  /* CONNECT */
  return (
    <Screen>
      <img src="/exiros-logo.png" width={90} />
      <h2>Connect Farcaster</h2>
      <p style={{ opacity: 0.7, fontSize: 14 }}>
        Your identity & XP will be linked
      </p>

      <button onClick={connectFarcaster} style={styles.button}>
        Connect
      </button>
    </Screen>
  );
}

/* UI */
function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: "100vh",
        background: "#0a0a0a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 20,
      }}
    >
      {children}
    </div>
  );
}

const styles = {
  button: {
    padding: "12px 20px",
    borderRadius: 14,
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    width: 260,
  },
};
