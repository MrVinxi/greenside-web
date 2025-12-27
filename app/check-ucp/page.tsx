"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CheckUcp() {
  const [discordId, setDiscordId] = useState("");
  const [res, setRes] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRes({ type: "", msg: "" });
    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setRes({ type: "success", msg: data.message });
    } catch (err: any) {
      setRes({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 font-sans overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-full bg-indigo-600/5 blur-[100px]"></div>
      
      <div className="w-full max-w-md bg-[#0f172a]/90 backdrop-blur-2xl border border-blue-500/20 rounded-[2.5rem] p-8 shadow-2xl relative z-10 animate-fade-in-up">
        <div className="flex justify-center mb-4 text-4xl">🔍</div>
        <h2 className="text-2xl font-black text-center text-white mb-8 tracking-tighter italic">RECOVERY ACCOUNT</h2>
        
        <form onSubmit={handleCheck} className="space-y-6">
          {res.msg && (
            <div className={`p-4 rounded-2xl text-xs border animate-fade-in ${res.type === 'success' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
              {res.msg}
            </div>
          )}
          <input 
            type="text" placeholder="Masukkan ID Discord Anda..." required
            className="w-full bg-[#020617] border border-blue-900/30 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all shadow-inner"
            value={discordId} onChange={e => setDiscordId(e.target.value)}
          />
          <button className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-2xl font-bold tracking-widest shadow-lg shadow-blue-900/40 transition-all active:scale-95">
            {loading ? "SEARCHING..." : "SEND INFO TO DISCORD"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[10px] text-gray-500 hover:text-blue-400 font-bold tracking-[0.2em] transition-colors">← KEMBALI KE MENU UTAMA</Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}