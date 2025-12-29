"use client";
import React, { useState } from "react";
import Link from "next/link";

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
    <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 font-sans overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 blur-[100px]"></div>
      
      <div className="w-full max-w-md bg-[#0f172a]/90 backdrop-blur-2xl border border-blue-500/20 rounded-[2.5rem] p-8 shadow-2xl relative z-10 animate-fade-in-up">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 animate-spin-slow">
            <img src="https://cdn-icons-png.flaticon.com/512/11544/11544866.png" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-center text-white mb-8 tracking-tighter italic">CREATE ACCOUNT</h2>
        
        <form onSubmit={submit} className="space-y-5">
          {res.msg && (
            <div className={`p-4 rounded-2xl text-xs border animate-fade-in ${res.type === 'success' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
              {res.msg}
            </div>
          )}
          <input 
            type="text" placeholder="Nama UCP..." required
            className="w-full bg-[#020617] border border-blue-900/30 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all shadow-inner"
            value={form.ucp} onChange={e => setForm({...form, ucp: e.target.value})}
          />
          <input 
            type="text" placeholder="ID Discord (18 Digit)..." required
            className="w-full bg-[#020617] border border-blue-900/30 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all shadow-inner"
            value={form.discordId} onChange={e => setForm({...form, discordId: e.target.value})}
          />
          <button className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-2xl font-bold tracking-widest shadow-lg shadow-blue-900/40 transition-all active:scale-95">
            {loading ? "PROCESSING..." : "REGISTER NOW"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[10px] text-gray-500 hover:text-blue-400 font-bold tracking-[0.2em] transition-colors">← KEMBALI KE MENU UTAMA</Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin-slow { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 5s linear infinite; transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}