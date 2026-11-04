"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Activity,
  ShieldAlert,
  HeartPulse,
  RotateCcw,
  Layers,
  Zap,
  Sparkles,
  Trophy,
  Stethoscope,
  BrainCircuit,
  Bone,
  Users,
  Compass,
  Footprints,
  Dumbbell,
  ArrowRight,
  Calendar
} from "lucide-react";
import { CONDITIONS_TREATED, ConditionItem } from "@/data/physiosphereData";

interface ConditionsProps {
  onSelectCondition: (conditionName: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  ShieldAlert,
  HeartPulse,
  RotateCcw,
  Layers,
  Zap,
  Sparkles,
  Trophy,
  Stethoscope,
  BrainCircuit,
  Bone,
  Users,
  Compass,
  Footprints,
  Dumbbell
};

export default function Conditions({ onSelectCondition }: ConditionsProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = [
    "All",
    "Orthopaedic",
    "Spine Care",
    "Post-Operative",
    "Neurological",
    "Geriatric"
  ];

  const filteredConditions =
    activeFilter === "All"
      ? CONDITIONS_TREATED
      : CONDITIONS_TREATED.filter((item) =>
          item.category.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section id="conditions" className="py-8 sm:py-14 bg-white border-b border-blue-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-5 sm:mb-7 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            Clinical Conditions
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0a2540] tracking-tight leading-tight">
            Common Conditions Treated
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Targeted home rehabilitation across Hyderabad for pain relief, spine care, and recovery.
          </p>
        </div>

        {/* Filter Pills - Horizontal scrolling on mobile, wrap on desktop */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                activeFilter === cat
                  ? "bg-[#0a2540] text-white"
                  : "bg-[#f0f7fd] text-slate-700 hover:bg-blue-100 border border-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 16 Conditions Grid - Responsive: 1-col on small mobile, 2-col on sm, 4-col on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredConditions.map((item: ConditionItem) => {
            const Icon = iconMap[item.iconName] || Activity;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs highlight-card flex flex-col justify-between"
              >
                <div>
                  {/* Realistic Condition Photograph with Natural Aspect Ratio */}
                  <div className="relative aspect-[380/250] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/95 text-[#0a2540] shadow-2xs border border-slate-200/60">
                      {item.category}
                    </span>
                  </div>

                  {/* Compact Text Content */}
                  <div className="p-3.5 sm:p-4">
                    <h3 className="text-sm sm:text-base font-bold text-[#0a2540] mb-1 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Accessible Touch Target Button */}
                <div className="p-3.5 sm:p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectCondition(item.name)}
                    className="w-full min-h-[40px] inline-flex items-center justify-between py-2 px-3 rounded-lg bg-[#f0f7fd] hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold transition border border-blue-200/70 hover:border-blue-600 cursor-pointer"
                  >
                    <span>Book for {item.name.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Clinical Note */}
        <div className="mt-8 p-3.5 sm:p-4 rounded-xl bg-[#f0f7fd] border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
          <span>
            <strong className="text-[#0a2540] font-bold">Clinical Note: </strong>
            Personalized treatment milestones are established during your initial home assessment.
          </span>
          <button
            type="button"
            onClick={() => onSelectCondition("General Physiotherapy Consultation")}
            className="flex-shrink-0 w-full sm:w-auto min-h-[40px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            Consult Our Team
          </button>
        </div>

      </div>
    </section>
  );
}