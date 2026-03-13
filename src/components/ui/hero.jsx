import React from "react";
import { Activity, HeartPulse, Stethoscope, Shield } from "lucide-react";


export default function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 md:px-6 pt-10 md:pt-16 pb-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 md:px-10 md:py-14 backdrop-blur-xl">
        {/* Animated Icons */}
        <IconCloud />
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-slate-300">AI-powered Healthcare Platform</p>
          <h1 className="mt-2 text-pretty text-4xl md:text-5xl font-semibold">Your Health, Our Priority</h1>
          <p className="mt-4 text-slate-300 leading-relaxed">
            Connect with certified doctors, empower NGOs, and receive personalized care recommendations—securely and
            intelligently.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button className="h-11 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 text-base shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:from-blue-500 hover:to-purple-500 transition-all duration-200 font-medium">
              Book a Consultation
            </button>
            <button className="h-11 rounded-full border border-white/20 bg-white/10 text-white px-6 text-base hover:bg-white/15 transition-colors duration-200 font-medium">
              Learn More
            </button>
          </div>
        </div>
        {/* Decorative gradient ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-2 border-blue-500/40 blur-[1px]"
          style={{ boxShadow: "0 0 80px rgba(59,130,246,0.35)" }}
        />
      </div>
    </section>
  );
}

function IconCloud() {
  return (
    <div aria-hidden="true">
      <div className="absolute right-6 top-6 md:right-10 md:top-10">
        <BadgeIcon>
          <Stethoscope className="h-5 w-5" />
        </BadgeIcon>
      </div>
      <div className="absolute right-20 top-24 md:right-32 md:top-28 animate-bounce">
        <BadgeIcon>
          <HeartPulse className="h-5 w-5" />
        </BadgeIcon>
      </div>
      <div className="absolute right-10 bottom-8 md:right-16 md:bottom-10 animate-pulse">
        <BadgeIcon>
          <Activity className="h-5 w-5" />
        </BadgeIcon>
      </div>
      <div className="absolute left-8 bottom-10 md:left-10 md:bottom-12 animate-ping">
        <BadgeIcon>
          <Shield className="h-5 w-5" />
        </BadgeIcon>
      </div>
    </div>
  );
}

function BadgeIcon({ children }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-[0_0_24px_rgba(59,130,246,0.5)]">
      {children}
    </div>
  );
}