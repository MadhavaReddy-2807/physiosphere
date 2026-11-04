"use client";

import React from "react";
import { Calendar, Phone } from "lucide-react";
import { BRAND_INFO } from "@/data/physiosphereData";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface FloatingBookNowProps {
  onOpenBooking: () => void;
}

export default function FloatingBookNow({ onOpenBooking }: FloatingBookNowProps) {
  return (
    <>
      {/* Desktop Floating Action Button */}
      <aside aria-label="Quick appointment button" className="hidden md:block fixed bottom-6 right-6 z-30">
        <button
          type="button"
          onClick={onOpenBooking}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-blue-400 group"
          aria-label="Book Home Physiotherapist Appointment"
        >
          <Calendar className="w-5 h-5 group-hover:rotate-6 transition-transform" />
          <span>Book Home Visit</span>
        </button>
      </aside>

      {/* Mobile Sticky Bottom Bar (Fixed, Respects Safe Area, High Conversion) */}
      <nav
        aria-label="Mobile booking action bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-blue-200/80 shadow-2xl px-3 pt-2 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-2"
      >
        <a
          href={`tel:${BRAND_INFO.phonePrimary}`}
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center rounded-xl border border-slate-200 text-slate-800 active:bg-slate-100 text-[11px] font-bold transition"
          aria-label="Call Physiotherapist"
        >
          <Phone className="w-4 h-4 text-blue-600 mb-0.5" />
          <span>Call</span>
        </a>

        <a
          href={BRAND_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 active:bg-emerald-100 text-[11px] font-bold transition"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4 fill-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onOpenBooking}
          className="flex-[2] min-h-[46px] flex items-center justify-center gap-2 px-4 rounded-xl bg-blue-600 active:bg-blue-700 text-white font-bold text-sm cursor-pointer shadow-md active:scale-[0.98] transition-all"
        >
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Book Now</span>
        </button>
      </nav>
    </>
  );
}