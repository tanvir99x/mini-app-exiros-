"use client";

import { useAccount, useWriteContract } from "wagmi";
import { NFT_ABI, NFT_ADDRESS } from "../../lib/nft";

export default function Mint() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const mint = () => {
    writeContract({
      address: NFT_ADDRESS,
      abi: NFT_ABI,
      functionName: "mint",
      value: BigInt("50000000000000"), // MUST match mintPrice
    });
  };

  return (
    <main className="min-h-screen text-white p-4">
      <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 space-y-5">
        <h1 className="text-xl font-bold">Exiros NFT</h1>

        <div className="aspect-square rounded-2xl bg-black/40 flex items-center justify-center text-sm opacity-60">
          EXIROS NFT
        </div>

        <button
          onClick={mint}
          disabled={!address}
          className="w-full py-3 rounded-xl bg-purple-600 font-semibold active:bg-purple-700"
        >
          Mint NFT
        </button>
      </div>
    </main>
  );
}
