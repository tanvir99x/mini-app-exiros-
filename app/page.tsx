import TaskCard from "../components/TaskCard";
import { TASKS } from "../lib/tasks";
import BottomNav from "../components/BottomNav";
import BlurBackground from "../components/BlurBackground";
import Splash from "../components/Splash";



export default function Home() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* Animated blur background */}
      <BlurBackground />

      <div className="p-4 space-y-4 pb-24 relative z-10">
        {/* NFT Banner */}
        <div className="rounded-3xl p-6 bg-white/10 backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-bold">Upcoming NFT Mint</h2>
          <p className="text-sm opacity-70">Coming soon</p>
        </div>

        {/* Tasks */}
        <h3 className="text-lg font-bold">Live Tasks</h3>

        {TASKS.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Bottom navigation */}
      <BottomNav />
    </main>
  );
}
