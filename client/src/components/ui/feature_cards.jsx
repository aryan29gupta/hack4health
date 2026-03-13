import React from "react";
import { BrainCircuit, Video, Handshake } from "lucide-react";

export default function FeatureCards() {
  return (
    <div id="services" className="py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card
          title="AI Symptom Checker"
          description="Personalized triage and recommendations to guide your next steps."
          Icon={BrainCircuit}
        />
        <Card
          title="Teleconsultation"
          description="Secure video sessions with verified doctors and specialists."
          Icon={Video}
        />
        <Card
          title="NGO Partnerships"
          description="Bridge donors, NGOs, and patients for equitable healthcare access."
          Icon={Handshake}
        />
      </div>
    </div>
  );
}

function Card({ title, description, Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
}