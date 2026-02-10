export const CONTRACT_ADDRESS =
  "0xa132D4b6BD06F2FC2C24b26b9a8292cF32610d13";

export const CONTRACT_ABI = [
  {
    inputs: [{ name: "taskId", type: "uint256" }],
    name: "completeTask",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "uint256" }
    ],
    name: "completedTasks",
    outputs: [{ type: "bool" }],
    stateMutability: "view",
    type: "function"
  }
];
