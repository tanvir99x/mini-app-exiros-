import type { Address } from "viem";

export const CONTRACT_ADDRESS: Address =
  "0xa132D4b6BD06F2FC2C24b26b9a8292cF32610d13";

export const CONTRACT_ABI = [
  {
    type: "function",
    name: "completeTask",
    stateMutability: "payable",
    inputs: [{ name: "taskId", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "completedTasks",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "taskId", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;
