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
    <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 md:p-6 font-sans overflow-hidden">
      <div className="absolute top-[-15%] right-[-10%] w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[110px] animate-pulse"></div>
      
      <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_0_80px_-15px_rgba(99,102,241,0.2)] relative z-10 animate-fade-in-up">
        {/* Branding Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20 md:w-24 md:h-24 animate-float">
            <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="animate-spin-slow">
              <img src="https://cdn.discordapp.com/attachments/1422879439892779099/1454480153462964224/20251220_175306.png?ex=695337f3&is=6951e673&hm=d3d7081f4268cf1272b50aaf7f3bfc48faabce7579d5d2ce4dba7eb8e6948cf3" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" alt="Logo" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-8 italic bg-gradient-to-b from-white to-indigo-400 bg-clip-text text-transparent uppercase tracking-tighter">Data Recovery</h2>
        
        <form onSubmit={handleCheck} className="space-y-6">
          {res.msg && (
            <div className={`p-4 rounded-2xl text-[11px] border animate-fade-in font-bold tracking-wider ${res.type === 'success' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' : 'bg-red-500/10 text-red-300 border-red-500/30'}`}>
              {res.msg.toUpperCase()}
            </div>
          )}
          <div className="space-y-2">
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em] ml-2">Verification Identity</p>
            <input 
              type="text" placeholder="Masukkan Discord Snowflake..." required
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-indigo-500/50 transition-all text-sm font-medium tracking-wide placeholder:text-gray-700 hover:bg-black/60 shadow-inner"
              value={discordId} onChange={e => setDiscordId(e.target.value)}
            />
          </div>
          <button disabled={loading} className="group relative w-full overflow-hidden bg-indigo-600 p-5 rounded-2xl font-black text-xs tracking-[0.3em] shadow-xl shadow-indigo-900/40 transition-all active:scale-95 disabled:opacity-50">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            {loading ? "SEARCHING..." : "RECOVER DATA"}
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link href="/" className="px-6 py-2 border border-indigo-500/10 rounded-full text-[10px] text-gray-500 hover:text-indigo-400 font-bold tracking-[0.3em] transition-all hover:bg-indigo-500/5 uppercase font-mono">
            ← RETURN_SYSTEM
          </Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes spin-slow { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; perspective: 1000px; transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}