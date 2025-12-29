"use client";
import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Background Animated Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="w-full max-w-2xl text-center relative z-10 animate-fade-in-up">
        
        {/* Logo Memutar 3D */}
        <div className="flex justify-center mb-10">
          <div className="relative w-32 h-32 animate-spin-slow">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
            <img 
              src="https://cdn.discordapp.com/attachments/1422879439892779099/1454480153462964224/20251220_175306.png?ex=695337f3&is=6951e673&hm=d3d7081f4268cf1272b50aaf7f3bfc48faabce7579d5d2ce4dba7eb8e6948cf3" 
              alt="Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-500 tracking-tighter mb-4 animate-text-glow">
          GREENSIDE
        </h1>
        <p className="text-blue-400/60 text-sm uppercase tracking-[0.5em] font-bold mb-12">
          Roleplay Experience Reimagined
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <Link href="/ucp-panel" className="group">
            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-blue-500/20 p-8 rounded-[2.5rem] hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:-translate-y-2 text-left">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
              <h3 className="text-xl font-bold mb-2">DAFTAR UCP</h3>
              <p className="text-gray-500 text-xs">Buat akun baru dan dapatkan PIN via DM Discord.</p>
            </div>
          </Link>

          <Link href="/check-ucp" className="group">
            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-blue-500/20 p-8 rounded-[2.5rem] hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:-translate-y-2 text-left">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
              <h3 className="text-xl font-bold mb-2">CEK AKUN</h3>
              <p className="text-gray-500 text-xs">Lupa data akun? Kirim ulang info akun ke Discord-mu.</p>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin-slow { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        @keyframes textGlow { 0% { filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.4)); } 100% { filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.7)); } }
        .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; perspective: 1000px; transform-style: preserve-3d; }
        .animate-text-glow { animation: textGlow 2s infinite alternate ease-in-out; }
      `}</style>
    </div>
  );
}