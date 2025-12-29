"use client";
import React from "react";
import Link from "next/link";

const rules = [
  { title: "Metagaming", desc: "Dilarang keras menggunakan informasi di luar game (OOC) untuk kepentingan di dalam game (IC)." },
  { title: "Powergaming", desc: "Dilarang melakukan tindakan yang tidak masuk akal atau tidak mungkin dilakukan di dunia nyata." },
  { title: "Deathmatching", desc: "Dilarang menyerang atau membunuh pemain lain tanpa alasan Roleplay yang jelas." },
  { title: "Olympic Swimming", desc: "Dilarang berenang terus-menerus tanpa henti hanya untuk menghindari pengejaran musuh/polisi." },
  { title: "Revenge Kill", desc: "Dilarang mencoba membunuh orang yang baru saja membunuh karakter Anda sebelum waktu tunggu habis." },
  { title: "Mixing", desc: "Dilarang mencampurkan percakapan dunia nyata ke dalam percakapan in-game atau radio." }
];

export default function Breakrules() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] animate-pulse"></div>
      
      <div className="w-full max-w-4xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_0_80px_-15px_rgba(239,68,68,0.1)] relative z-10 animate-fade-in-up">
        {/* Branding Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20 md:w-24 md:h-24 animate-float">
            <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="animate-spin-slow">
              <img src="https://cdn.discordapp.com/attachments/1422879439892779099/1454480153462964224/20251220_175306.png?ex=695337f3&is=6951e673&hm=d3d7081f4268cf1272b50aaf7f3bfc48faabce7579d5d2ce4dba7eb8e6948cf3" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" alt="Logo" />
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter bg-gradient-to-b from-white to-red-600 bg-clip-text text-transparent uppercase">Protocol Rules</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-red-400 font-black mt-2">Greenside Security Compliance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[45vh] overflow-y-auto pr-4 custom-scrollbar">
          {rules.map((rule, index) => (
            <div key={index} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl hover:border-red-500/30 transition-all hover:bg-white/[0.05] group">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-red-500 font-black text-xs font-mono opacity-50">0{index + 1}</span>
                <h3 className="text-white font-bold text-lg tracking-tight uppercase group-hover:text-red-400 transition-colors italic">{rule.title}</h3>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">{rule.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center flex flex-col items-center gap-6">
          <Link href="/" className="px-10 py-4 text-[11px] text-white font-black tracking-[0.4em] bg-red-600/20 border border-red-500/30 rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-900/20 uppercase active:scale-95 italic">
            ← Exit Protocol
          </Link>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(239, 68, 68, 0.2); border-radius: 10px; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes spin-slow { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; perspective: 1000px; transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}