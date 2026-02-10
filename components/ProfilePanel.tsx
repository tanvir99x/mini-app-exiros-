"use client";

import { useAccount, useReadContracts, useReadContract } from "wagmi";
import type { Address } from "viem";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/contract";
import { NFT_ABI, NFT_ADDRESS } from "../lib/nft";
import { TASKS } from "../lib/tasks";


export default function ProfilePanel({ open, onClose }: any) {
  const { address } = useAccount();

  // ✅ Read task completion states (SAFE)
  const { data } = useReadContracts({
    contracts: address
      ? TASKS.map((task) => ({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "completedTasks",
          args: [address, task.id],
        }))
      : [],
  });

  // ✅ Read NFT balance (SAFE – single hook)
  const { data: nftBalance } = useReadContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  // XP calculation
  const xp = (data || []).reduce(
    (sum, r, i) => (r?.result ? sum + TASKS[i].xp : sum),
    0
  );

  const completed = (data || []).filter((r) => r?.result).length;
  const maxXP = TASKS.reduce((s, t) => s + t.xp, 0);
  const progress = Math.min((xp / maxXP) * 100, 100);

  return (
    <div
      className={`fixed inset-0 z-30 transition
      ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition
        ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-[88%] max-w-[360px]
        bg-gradient-to-b from-black via-black/95 to-black
        backdrop-blur-xl border-l border-white/10
        transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 space-y-6">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-600/30 flex items-center justify-center text-lg font-bold">
              {address ? address.slice(2, 4).toUpperCase() : "?"}
            </div>
            <div>
              <p className="text-sm opacity-60">Wallet</p>
              <p className="font-mono text-sm">
                {address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : "Not connected"}
              </p>
            </div>
          </div>

          {/* XP Card */}
          <div className="rounded-2xl bg-white/10 border border-white/10 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-60">XP</span>
              <span className="font-semibold text-purple-400">{xp}</span>
            </div>

            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs opacity-50">
              {completed} / {TASKS.length} tasks completed
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 p-4 text-center">
              <p className="text-xs opacity-60">Completed</p>
              <p className="text-lg font-bold">{completed}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 text-center">
              <p className="text-xs opacity-60">Level</p>
              <p className="text-lg font-bold">
                {Math.floor(xp / 50) + 1}
              </p>
            </div>
          </div>

          {/* NFTs */}
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-sm opacity-60">Owned NFTs</p>
            <p className="text-lg font-bold">
              {nftBalance ? nftBalance.toString() : 0}
            </p>
          </div>

          {/* Future */}
          <div className="text-xs opacity-40">
            XP → USDT conversion coming soon
          </div>
        </div>
      </div>
    </div>
  );
}
