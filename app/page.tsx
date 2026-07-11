import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex gap-4 p-6 bg-red-400 shadow-xl rounded-3xl border-2 border-gold">
        <span className="text-emerald-dark font-bold text-2xl">مبل تک</span>
        <span className="text-gold text-lg">✦</span>
      </div>
    </div>
  );
}
