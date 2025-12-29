"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function UcpPanel() {
  const [form, setForm] = useState({ username: "", discordId: "" });
  const [res, setRes] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRes({ type: "", msg: "" });
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setRes({ type: "success", msg: data.message });
      setForm({ username: "", discordId: "" });
    } catch (err: any) {
      setRes({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 md:p-6 font-sans overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
      
      <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_0_80px_-15px_rgba(59,130,246,0.2)] relative z-10 animate-fade-in-up">
        {/* Consistent Branding Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20 md:w-24 md:h-24 animate-float">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="animate-spin-slow">
              <img src="https://cdn.discordapp.com/attachments/1422879439892779099/1454480153462964224/20251220_175306.png?ex=695337f3&is=6951e673&hm=d3d7081f4268cf1272b50aaf7f3bfc48faabce7579d5d2ce4dba7eb8e6948cf3" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" alt="Logo" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-8 italic bg-gradient-to-b from-white to-blue-400 bg-clip-text text-transparent uppercase tracking-tighter">Registration</h2>
        
        <form onSubmit={submit} className="space-y-5">
          {res.msg && (
            <div className={`p-4 rounded-2xl text-[11px] border animate-fade-in font-bold tracking-wider ${res.type === 'success' ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' : 'bg-red-500/10 text-red-300 border-red-500/30'}`}>
              {res.msg.toUpperCase()}
            </div>
          )}
          <div className="space-y-2">
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] ml-2">UCP Username</p>
            <input 
              type="text" placeholder="Gunakan_Nama_SAMP..." required
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-sm font-medium tracking-wide placeholder:text-gray-700 hover:bg-black/60"
              value={form.username} onChange={e => setForm({...form, username: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] ml-2">Discord Snowflake ID</p>
            <input 
              type="text" placeholder="Contoh: 123456789012345678" required
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-sm font-medium tracking-wide placeholder:text-gray-700 hover:bg-black/60"
              value={form.discordId} onChange={e => setForm({...form, discordId: e.target.value})}
            />
          </div>
          <button disabled={loading} className="group relative w-full overflow-hidden bg-blue-600 p-5 rounded-2xl font-black text-xs tracking-[0.3em] shadow-xl shadow-blue-900/40 transition-all active:scale-95 disabled:opacity-50">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            {loading ? "AUTHORIZING..." : "CONFIRM DATA"}
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link href="/" className="px-6 py-2 border border-blue-500/10 rounded-full text-[10px] text-gray-500 hover:text-blue-400 font-bold tracking-[0.3em] transition-all hover:bg-blue-500/5 uppercase">
            ← Back to Terminal
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