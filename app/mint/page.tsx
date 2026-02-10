export default function Mint() {
  return (
    <main className="min-h-screen text-white p-4">
      <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 space-y-4">
        <h1 className="text-xl font-bold">NFT Mint</h1>

        <div className="aspect-square rounded-2xl bg-black/40 flex items-center justify-center">
          <span className="opacity-50">NFT Preview</span>
        </div>

        <button
          disabled
          className="w-full py-3 rounded-xl bg-gray-600 text-sm"
        >
          Mint (Coming Soon)
        </button>
      </div>
    </main>
  );
}
