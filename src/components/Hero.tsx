"use client";

import React from "react";
import Image from "next/image";
import {
  Calendar,
  Phone,
  Users,
  Award,
  HeartHandshake,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { BRAND_INFO } from "@/data/physiosphereData";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="hero"
      className="bg-gradient-to-b from-[#eef7fd] via-[#f7fbfe] to-white border-b border-blue-100 py-6 sm:py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Main Column: Clear Headline, Short Description, Immediate Mobile CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Minimal Location Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span>Doorstep Physiotherapy in Hyderabad</span>
            </div>

            {/* Responsive Heading: 32px on mobile, 48-50px on desktop */}
            <h1 className="text-[32px] sm:text-4xl lg:text-[50px] font-black text-[#0a2540] tracking-tight leading-[1.12]">
              Expert Physiotherapy Care, Right at Your Home
            </h1>

            {/* Short Minimal Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Certified team of 30+ physiotherapists delivering personalized rehabilitation across Hyderabad. Zero travel, safe bedside recovery.
            </p>

            {/* CTAs: Book Now as Primary (Enlarged), WhatsApp and Call as Secondary */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1">
              <button
                type="button"
                onClick={onOpenBooking}
                className="min-h-[52px] inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-100 active:bg-emerald-200 transition shadow-2xs"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-emerald-600" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${BRAND_INFO.phonePrimary}`}
                  className="min-h-[52px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-50 active:bg-slate-100 transition shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Compact Trust Stats */}
            <div className="pt-3 border-t border-blue-100/80">
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                <div className="bg-white p-2 sm:p-3 rounded-xl border border-blue-100 text-left highlight-card">
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-[#0a2540] leading-tight">Team of 30+</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">Physiotherapists</div>
                </div>
                <div className="bg-white p-2 sm:p-3 rounded-xl border border-blue-100 text-left highlight-card">
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-[#0a2540] leading-tight">4+ Years</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">Clinical Exp.</div>
                </div>
                <div className="bg-white p-2 sm:p-3 rounded-xl border border-blue-100 text-left highlight-card">
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-[#0a2540] leading-tight">600+</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">Patients Treated</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Responsive & Compact (Hidden on very small screens, compact on tablet/desktop) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-blue-100 p-4 sm:p-6 shadow-2xs space-y-3">
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src="/images/sections/hero-physio.jpg"
                  alt="Physiotherapy session at home in Hyderabad"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>1-on-1 Dedicated Care</strong> at your home</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Safe for Seniors</strong> & post-surgery patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Covers 80+ Localities</strong> across Hyderabad</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}