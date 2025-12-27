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
    <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Background Animated Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-blue-500/20 rounded-[2.5rem] p-8 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] relative z-10 animate-fade-in-up">
        
        {/* Logo Memutar 3D */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 animate-spin-slow">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl opacity-20 blur-xl"></div>
            <img 
              src="https://cdn.discordapp.com/attachments/1422879439892779099/1454480153462964224/20251220_175306.png?ex=69513db3&is=694fec33&hm=2429b403618a21d4193e9a9731da3dafe22c6e054b0bdecfcde2c9526f201bb6" 
              alt="Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400 tracking-tighter animate-text-glow">
            GREENSIDE
          </h1>
          <p className="text-blue-400/60 text-[10px] uppercase tracking-[0.4em] font-bold mt-1">
            UCP Authentication System
          </p>
        </div>
        
        <form onSubmit={submit} className="space-y-5">
          {res.msg && (
            <div className={`p-4 rounded-2xl text-sm font-medium animate-fade-in ${
              res.type === 'success' 
              ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30' 
              : 'bg-red-500/10 text-red-300 border border-red-500/30'
            }`}>
              {res.type === 'success' ? '🛡️' : '⚠️'} {res.msg}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-blue-400/70 uppercase ml-2 tracking-widest">User Identity</label>
            <input 
              type="text" placeholder="Nama UCP..." required
              className="w-full bg-[#020617] border border-blue-900/30 p-4 rounded-2xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-500 placeholder:text-gray-600 shadow-inner hover:bg-black/40"
              value={form.ucp} onChange={e => setForm({...form, ucp: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-blue-400/70 uppercase ml-2 tracking-widest">Discord Snowflake</label>
            <input 
              type="text" placeholder="ID Discord (18-19 angka)..." required
              className="w-full bg-[#020617] border border-blue-900/30 p-4 rounded-2xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-500 placeholder:text-gray-600 shadow-inner hover:bg-black/40"
              value={form.discordId} onChange={e => setForm({...form, discordId: e.target.value})}
            />
          </div>
          
          <button 
            disabled={loading}
            className="group relative w-full overflow-hidden bg-blue-600 p-4 rounded-2xl font-bold text-white transition-all duration-300 active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-900/40"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative italic tracking-widest">
              {loading ? "INITIALIZING..." : "ACCESS GRANTED"}
            </span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-blue-900/20 text-center">
          <p className="text-[9px] text-blue-400/30 font-medium tracking-widest uppercase">
            Encrypted Connection established
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes textGlow {
          0% { filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.5)); }
          100% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.8)); }
        }
        @keyframes spin-slow {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-spin-slow { 
          animation: spin-slow 5s linear infinite; 
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .animate-text-glow { animation: textGlow 2s infinite alternate ease-in-out; }
      `}</style>
    </div>
  );
}
