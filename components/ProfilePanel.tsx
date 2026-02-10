"use client";

import { useAccount, useReadContracts } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/contract";
import { TASKS } from "../lib/tasks";

export default function ProfilePanel({ open, onClose }: any) {
  const { address } = useAccount();

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

  // Calculate XP safely
  const xp = (data || []).reduce((total, result, index) => {
    return result?.result ? total + TASKS[index].xp : total;
  }, 0);

  const completedCount = (data || []).filter(
    (r) => r?.result
  ).length;

  return (
    <div
      className={`fixed inset-0 z-30 transition
        ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition
          ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-[85%] max-w-[360px]
          bg-black/90 backdrop-blur-xl border-l border-white/10
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 space-y-5">
          <h2 className="text-lg font-bold">Profile</h2>

          {/* Wallet */}
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-sm opacity-60">Wallet</p>
            <p className="font-mono text-sm">
              {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Not connected"}
            </p>
          </div>

          {/* XP */}
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-sm opacity-60">XP</p>
            <p className="text-2xl font-bold text-purple-400">
              {xp}
            </p>
          </div>

          {/* Completed Tasks */}
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-sm opacity-60">Completed Tasks</p>
            <p className="text-lg font-semibold">
              {completedCount}
            </p>
          </div>

          <div className="text-sm opacity-50">
            XP → USDT (Coming soon)
          </div>
        </div>
      </div>
    </div>
  );
}
