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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-green-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-green-500 tracking-tighter">GREENSIDE</h1>
          <p className="text-gray-400 text-xs uppercase tracking-widest">UCP Registration</p>
        </div>
        
        <form onSubmit={submit} className="space-y-6">
          {res.msg && (
            <div className={`p-4 rounded-xl text-sm ${res.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/50' : 'bg-red-500/10 text-red-400 border border-red-500/50'}`}>
              {res.type === 'success' ? '✅' : '❌'} {res.msg}
            </div>
          )}
          
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Nama UCP</label>
            <input 
              type="text" placeholder="Masukkan Nama UCP..." required
              className="w-full mt-1 bg-black border border-zinc-800 p-4 rounded-2xl text-white focus:border-green-500 outline-none transition-all"
              value={form.ucp} onChange={e => setForm({...form, ucp: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Discord ID (Snowflake)</label>
            <input 
              type="text" placeholder="Masukkan ID Discord Anda..." required
              className="w-full mt-1 bg-black border border-zinc-800 p-4 rounded-2xl text-white focus:border-green-500 outline-none transition-all"
              value={form.discordId} onChange={e => setForm({...form, discordId: e.target.value})}
            />
          </div>
          
          <button 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 p-4 rounded-2xl font-black text-white tracking-widest transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-green-900/20"
          >
            {loading ? "MEMPROSES..." : "DAFTAR SEKARANG"}
          </button>
        </form>
      </div>
    </div>
  );
}