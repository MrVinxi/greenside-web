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
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)] relative z-10 animate-fade-in-up">
        
        {/* Floating Logo Container */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative w-20 h-20 md:w-24 md:h-24 animate-float">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="animate-spin-slow">
              <img 
                src="https://cdn.discordapp.com/attachments/1422879439892779099/1454480153462964224/20251220_175306.png?ex=695337f3&is=6951e673&hm=d3d7081f4268cf1272b50aaf7f3bfc48faabce7579d5d2ce4dba7eb8e6948cf3" 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" 
                alt="Logo"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter italic bg-gradient-to-b from-white to-blue-400 bg-clip-text text-transparent">
            CREATE ACCOUNT
          </h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-blue-400/60 font-bold mt-2">Protocol Secure Access</p>
        </div>
        
        <form onSubmit={submit} className="space-y-4 md:space-y-6">
          {res.msg && (
            <div className={`p-4 rounded-2xl text-[11px] md:text-xs border animate-fade-in font-medium transition-all ${
              res.type === 'success' 
              ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' 
              : 'bg-red-500/10 text-red-300 border-red-500/30'
            }`}>
              {res.type === 'success' ? '✔ ' : '✖ '} {res.msg}
            </div>
          )}

          <div className="space-y-1.5 md:space-y-2 group">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-3 tracking-widest group-focus-within:text-blue-400 transition-colors">UCP Identity</label>
            <input 
              type="text" placeholder="Masukkan Nama UCP..." required
              className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner text-sm md:text-base placeholder:text-gray-700 hover:bg-black/60"
              value={form.username} onChange={e => setForm({...form, username: e.target.value})}
            />
          </div>

          <div className="space-y-1.5 md:space-y-2 group">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-3 tracking-widest group-focus-within:text-blue-400 transition-colors">Discord Snowflake</label>
            <input 
              type="text" placeholder="Masukkan ID Discord..." required
              className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner text-sm md:text-base placeholder:text-gray-700 hover:bg-black/60"
              value={form.discordId} onChange={e => setForm({...form, discordId: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="group relative w-full overflow-hidden bg-blue-600 p-4 md:p-5 rounded-2xl font-black text-xs md:text-sm tracking-[0.2em] shadow-lg shadow-blue-900/40 transition-all active:scale-95 disabled:opacity-50"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative">
              {loading ? "INITIALIZING..." : "CONFIRM REGISTRATION"}
            </span>
          </button>
        </form>

        <div className="mt-8 md:mt-10 text-center">
          <Link href="/" className="inline-block px-4 py-2 text-[9px] md:text-[10px] text-gray-500 hover:text-blue-400 font-bold tracking-[0.3em] transition-all border border-transparent hover:border-blue-500/20 rounded-full">
            ← KEMBALI KE MENU UTAMA
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin-slow { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; perspective: 1000px; transform-style: preserve-3d; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}