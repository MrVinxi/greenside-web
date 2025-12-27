"use client";
import React, { useState } from "react";

export default function UcpPanel() {
  const [form, setForm] = useState({ ucp: "", discordId: "", password: "" });
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
      setForm({ ucp: "", discordId: "", password: "" });
    } catch (err: any) {
      setRes({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-green-900/50 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-black text-green-500 text-center mb-6">GREENSIDE</h1>
        
        <form onSubmit={submit} className="space-y-4">
          {res.msg && (
            <div className={`p-3 rounded text-sm ${res.type === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
              {res.msg}
            </div>
          )}
          
          <input 
            type="text" placeholder="Nama UCP" required
            className="w-full bg-black border border-zinc-800 p-3 rounded-lg text-white outline-none focus:border-green-500"
            value={form.ucp} onChange={e => setForm({...form, ucp: e.target.value})}
          />
          
          <input 
            type="text" placeholder="Discord ID" required
            className="w-full bg-black border border-zinc-800 p-3 rounded-lg text-white outline-none focus:border-green-500"
            value={form.discordId} onChange={e => setForm({...form, discordId: e.target.value})}
          />
          
          <input 
            type="password" placeholder="Password" required
            className="w-full bg-black border border-zinc-800 p-3 rounded-lg text-white outline-none focus:border-green-500"
            value={form.password} onChange={e => setForm({...form, password: e.target.value})}
          />
          
          <button 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-lg font-bold text-white transition-all disabled:opacity-50"
          >
            {loading ? "PROCESSING..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
}