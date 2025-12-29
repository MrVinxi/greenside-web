"use client";
import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans">
      {/* Enhanced Background Animated Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow delay-700"></div>
      
      {/* Animated Grid Overlay for Cyber Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="w-full max-w-4xl text-center relative z-10 animate-fade-in-up">
        
        {/* Logo 3D Floating & Rotating */}
        <div className="flex justify-center mb-6 md:mb-10">
          <div className="relative w-24 h-24 md:w-40 md:h-40 animate-float">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="animate-spin-slow">
               <img 
                src="https://cdn.discordapp.com/attachments/1422879439892779099/1454480153462964224/20251220_175306.png?ex=695337f3&is=6951e673&hm=d3d7081f4268cf1272b50aaf7f3bfc48faabce7579d5d2ce4dba7eb8e6948cf3" 
                alt="Greenside Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
              />
            </div>
          </div>
        </div>

        {/* Hero Section with Responsive Text */}
        <div className="space-y-2 mb-10 md:mb-16">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl italic">
            GREEN<span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700 animate-text-glow">SIDE</span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 md:w-12 bg-blue-500/50"></div>
            <p className="text-blue-400/80 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.6em] font-bold">
              Integrated User Control Panel
            </p>
            <div className="h-[1px] w-8 md:w-12 bg-blue-500/50"></div>
          </div>
        </div>

        {/* Responsive Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-2 md:px-0">
          {/* Menu Daftar */}
          <Link href="/ucp-panel" className="group">
            <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-[2rem] transition-all duration-500 hover:border-blue-500/50 hover:bg-white/[0.06] group-hover:-translate-y-2 shadow-2xl">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all"></div>
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">🛡️</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight text-white group-hover:text-blue-400 transition-colors">DAFTAR UCP</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">Buat identitas barumu dan mulai petualangan di dunia Greenside.</p>
              </div>
            </div>
          </Link>

          {/* Menu Cek Akun */}
          <Link href="/check-ucp" className="group">
            <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-[2rem] transition-all duration-500 hover:border-blue-500/50 hover:bg-white/[0.06] group-hover:-translate-y-2 shadow-2xl">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-all"></div>
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">🔍</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight text-white group-hover:text-blue-400 transition-colors">CEK INFORMASI</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">Lupa detail akun? Ambil data UCP & PIN Anda secara instan via Discord.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-12 md:mt-20 opacity-40 hover:opacity-100 transition-opacity duration-700">
          <p className="text-[9px] md:text-[10px] text-blue-300 font-bold tracking-[0.4em] uppercase">
            System Protocol Active • Encrypted Data Access
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(40px); filter: blur(10px); } 
          to { opacity: 1; transform: translateY(0); filter: blur(0); } 
        }
        @keyframes spin-slow { 
          from { transform: rotateY(0deg); } 
          to { transform: rotateY(360deg); } 
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-fade-in-up { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; perspective: 1000px; transform-style: preserve-3d; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}