import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-3">
          <a href="/" className="flex items-center gap-2">
            <div
              className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_24px_rgba(59,130,246,0.6)]"
              aria-hidden
            />
            <span className="text-lg font-semibold tracking-tight">वैदSeva</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#ngos" className="hover:text-white transition-colors">
              NGOs
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:from-blue-500 hover:to-purple-500 px-4 py-2 text-sm font-medium transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}