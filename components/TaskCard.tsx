"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/contract";

export default function TaskCard({ task }: any) {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const { data: completed } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "completedTasks",
    args: address ? [address, task.id] : undefined,
  });

  const handleClick = () => {
    if (!task.live || completed) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "completeTask",
      args: [task.id],
      value: BigInt(task.feeWei),
    });
  };

  return (
    <div
      className={`rounded-2xl p-4 backdrop-blur-xl border transition
        ${completed
          ? "bg-green-500/10 border-green-400/20"
          : "bg-white/10 border-white/10 active:scale-[0.98]"}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{task.logo}</span>

        <div className="flex-1">
          <h3 className="font-bold">{task.title}</h3>
          <p className="text-sm opacity-70">
            {completed ? "Completed" : task.live ? `XP ${task.xp}` : "Coming soon"}
          </p>
        </div>

        <button
          onClick={handleClick}
          disabled={!task.live || completed}
          className={`px-4 py-2 rounded-full text-sm font-semibold
            ${completed
              ? "bg-green-600"
              : task.live
              ? "bg-purple-600 active:bg-purple-700"
              : "bg-gray-600"}`}
        >
          {completed ? "Done" : task.live ? "Start" : "Locked"}
        </button>
      </div>
    </div>
  );
}
