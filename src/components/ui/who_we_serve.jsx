import React from "react";
import { Users, UserCog, Building2, Heart, Stethoscope, HandHeart } from "lucide-react";

export default function WhoWeServe() {
  return (
    <div id="ngos" className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
      <h2 className="text-pretty text-2xl md:text-3xl font-semibold">Who We Serve</h2>
      <p className="mt-2 text-slate-300 leading-relaxed max-w-2xl">
        A unified platform connecting patients, healthcare providers, and NGOs to deliver efficient, compassionate care.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <AudienceCard
          title="Patients"
          description="Access care pathways, consultations, and reliable health guidance."
          Icon={Users}
          illustrationColor="from-blue-500 to-cyan-500"
          illustrationIcon={Heart}
        />
        <AudienceCard
          title="Doctors"
          description="Streamlined tools for telehealth, triage, and case management."
          Icon={UserCog}
          illustrationColor="from-purple-500 to-pink-500"
          illustrationIcon={Stethoscope}
        />
        <AudienceCard
          title="NGOs"
          description="Coordinate programs, manage beneficiaries, and measure impact."
          Icon={Building2}
          illustrationColor="from-green-500 to-blue-500"
          illustrationIcon={HandHeart}
        />
      </div>
    </div>
  );
}

function AudienceCard({ title, description, Icon, illustrationColor, illustrationIcon: IllustrationIcon }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-slate-300 leading-relaxed">{description}</p>
      
      {/* Enhanced illustration area */}
      <div className="mt-4 relative h-28 w-full rounded-xl overflow-hidden bg-slate-900/60 border border-white/5">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${illustrationColor} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-2 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-75" />
          <div className="absolute bottom-3 left-6 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-150" />
          <div className="absolute bottom-4 right-6 w-1 h-1 bg-white/35 rounded-full animate-pulse delay-300" />
        </div>
        
        {/* Central illustration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${illustrationColor} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
            <IllustrationIcon className="h-8 w-8 text-white/80 drop-shadow-lg" />
            
            {/* Pulse ring effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:animate-ping" />
          </div>
        </div>
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/80 to-transparent" />
        
        {/* Hover glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${illustrationColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`} />
      </div>
    </div>
  );
}