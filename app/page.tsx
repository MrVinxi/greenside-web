"use client";
import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans">
      {/* Background Animated Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow delay-700"></div>

      <div className="w-full max-w-6xl text-center relative z-10 animate-fade-in-up">
        {/* Branding Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-28 h-28 md:w-44 md:h-44 animate-float">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="animate-spin-slow">
               <img 
                src="https://cdn.discordapp.com/attachments/1422879439892779099/1454480153462964224/20251220_175306.png?ex=695337f3&is=6951e673&hm=d3d7081f4268cf1272b50aaf7f3bfc48faabce7579d5d2ce4dba7eb8e6948cf3" 
                alt="Greenside Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-12 md:mb-20">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white italic drop-shadow-2xl">
            GREEN<span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-800">SIDE</span>
          </h1>
          <p className="text-blue-400/70 text-xs md:text-sm uppercase tracking-[0.5em] font-bold">Protocol Dashboard v2.0</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/ucp-panel" className="group">
            <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] transition-all duration-500 hover:border-blue-500/50 hover:bg-white/[0.07] hover:-translate-y-3 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 text-4xl mb-4 group-hover:scale-125 transition-transform">🛡️</div>
              <h3 className="relative z-10 text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors uppercase italic">Daftar UCP</h3>
              <p className="relative z-10 text-gray-500 text-xs leading-relaxed font-medium">Inisialisasi identitas baru Anda dalam sistem Greenside.</p>
            </div>
          </Link>

          <Link href="/check-ucp" className="group">
            <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] transition-all duration-500 hover:border-indigo-500/50 hover:bg-white/[0.07] hover:-translate-y-3 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 text-4xl mb-4 group-hover:scale-125 transition-transform">🔍</div>
              <h3 className="relative z-10 text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors uppercase italic">Cek Akun</h3>
              <p className="relative z-10 text-gray-500 text-xs leading-relaxed font-medium">Pemulihan data kredensial melalui otentikasi Discord.</p>
            </div>
          </Link>

          <Link href="/breakrules" className="group">
            <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] transition-all duration-500 hover:border-red-500/50 hover:bg-white/[0.07] hover:-translate-y-3 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 text-4xl mb-4 group-hover:scale-125 transition-transform">📜</div>
              <h3 className="relative z-10 text-xl font-bold mb-2 group-hover:text-red-400 transition-colors uppercase italic">Breakrules</h3>
              <p className="relative z-10 text-gray-500 text-xs leading-relaxed font-medium">Pelajari regulasi inti untuk menjaga stabilitas komunitas.</p>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(50px); filter: blur(10px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes spin-slow { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        .animate-fade-in-up { animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; perspective: 1000px; transform-style: preserve-3d; }
        .animate-pulse-slow { animation: pulse 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}