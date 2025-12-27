// app/ucp-panel/page.tsx
"use client";
import React, { useState } from "react";

export default function UcpPanel() {
  const [form, setForm] = useState({ ucp: "", discordId: "" });
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
      setForm({ ucp: "", discordId: "" });
    } catch (err: any) {
      setRes({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0f0d] text-white flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[150px] animate-pulse-slow -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow-reverse translate-x-1/4 translate-y-1/4"></div>

      <div className="w-full max-w-md bg-[#121a16]/80 backdrop-blur-md border border-green-700/30 rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 tracking-tight leading-none drop-shadow-lg animate-text-glow">GREENSIDE</h1>
          <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mt-2 animate-fade-in-up delay-100">User Control Panel</p>
        </div>
        
        <form onSubmit={submit} className="space-y-6">
          {res.msg && (
            <div className={`p-4 rounded-xl text-sm ${res.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-700/50' : 'bg-red-500/10 text-red-400 border border-red-700/50'} animate-fade-in`}>
              {res.type === 'success' ? '✅' : '❌'} {res.msg}
            </div>
          )}
          
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 block mb-2 animate-fade-in-up delay-200">Nama UCP</label>
            <input 
              type="text" placeholder="Contoh: Marvin_Galante" required
              className="w-full bg-[#0d1310] border border-green-900/50 p-4 rounded-2xl text-white focus:border-green-400 outline-none transition-all duration-300 shadow-inner shadow-green-900/10 hover:border-green-600/70 animate-fade-in-up delay-300"
              value={form.ucp} onChange={e => setForm({...form, ucp: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 block mb-2 animate-fade-in-up delay-400">Discord ID (Snowflake)</label>
            <input 
              type="text" placeholder="Contoh: 382910XXXXXX" required
              className="w-full bg-[#0d1310] border border-green-900/50 p-4 rounded-2xl text-white focus:border-green-400 outline-none transition-all duration-300 shadow-inner shadow-green-900/10 hover:border-green-600/70 animate-fade-in-up delay-500"
              value={form.discordId} onChange={e => setForm({...form, discordId: e.target.value})}
            />
          </div>
          
          <button 
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 p-4 rounded-2xl font-black text-white tracking-widest transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-green-900/30 hover:shadow-green-700/40 animate-fade-in-up delay-600"
          >
            {loading ? "MEMPROSES..." : "DAFTAR SEKARANG"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-10 animate-fade-in-up delay-700">
          © 2025 GREENSIDE ROLEPLAY DEVELOPMENT
        </p>
      </div>

      {/* Tailwind CSS keyframes for animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.8; }
        }
        @keyframes pulse-slow-reverse {
          0%, 100% { transform: translate(25%, 25%) scale(1); opacity: 0.5; }
          50% { transform: translate(25%, 25%) scale(1.05); opacity: 0.6; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes textGlow {
          0% { text-shadow: 0 0 5px rgba(52, 211, 153, 0.4); }
          50% { text-shadow: 0 0 15px rgba(52, 211, 153, 0.8); }
          100% { text-shadow: 0 0 5px rgba(52, 211, 153, 0.4); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 10s infinite alternate ease-in-out; }
        .animate-pulse-slow-reverse { animation: pulse-slow-reverse 12s infinite alternate ease-in-out; }
        .animate-text-glow { animation: textGlow 3s infinite alternate ease-in-out; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
    </div>
  );
}
