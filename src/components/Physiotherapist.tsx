"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Award,
  Users,
  CheckCircle2,
  Stethoscope,
  MapPin,
  Calendar,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Building2,
  Pause,
  Play
} from "lucide-react";
import { BRAND_INFO, TEAM_PHOTOS } from "@/data/physiosphereData";

interface PhysiotherapistProps {
  onOpenBooking: () => void;
}

export default function Physiotherapist({ onOpenBooking }: PhysiotherapistProps) {
  const { doctorVenu } = BRAND_INFO;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % TEAM_PHOTOS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + TEAM_PHOTOS.length) % TEAM_PHOTOS.length);
  }, []);

  // Auto-scrolling carousel: advances one by one every 3.5 seconds
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section
      id="our-team"
      className="py-8 sm:py-14 bg-white border-b border-blue-100 scroll-mt-18"
    >
      {/* Anchor for backward compatibility with #physiotherapists */}
      <div id="physiotherapists" className="relative -top-24 invisible" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            Clinical Leadership & Specialists
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0a2540] tracking-tight leading-tight">
            Our Team of 30+ Physiotherapists
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Experienced healthcare professionals committed to compassionate, evidence-based home rehabilitation across Hyderabad.
          </p>
        </div>

        {/* 1. LEAD PHYSIOTHERAPIST CARD (Dr. Venu with Professional Portrait & IMS BHU Affiliation) */}
        <div className="bg-[#f0f7fd] border border-blue-200/90 rounded-2xl p-5 sm:p-7 mb-8 sm:mb-10 shadow-xs highlight-card">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-center">
            
            {/* Dr. Venu Portrait Column */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
              <div className="relative w-40 h-52 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-blue-200 shadow-md bg-white flex-shrink-0 group">
                <Image
                  src={doctorVenu.image || "/images/doctor/dr-venu.jpg"}
                  alt="Dr. Venu (PT) - Senior Home Physiotherapist"
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 220px"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-300"
                  priority
                />
                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-2xs px-2.5 py-1 rounded-lg border border-slate-200 text-center shadow-2xs">
                  <span className="text-[11px] font-bold text-[#0a2540] block">Lead Physiotherapist</span>
                  <span className="text-[9px] text-blue-600 font-semibold">Hyderabad Home Care</span>
                </div>
              </div>
            </div>

            {/* Dr. Venu Clinical Details Column */}
            <div className="md:col-span-8 lg:col-span-9 space-y-3">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Senior Home Physiotherapist
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Licensed Practitioner (PT)
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a2540] leading-snug">
                  {doctorVenu.name} <span className="text-sm sm:text-base font-bold text-slate-500">({doctorVenu.qualification})</span>
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-blue-700 mt-0.5">
                  {doctorVenu.title}
                </p>
              </div>

              {/* Prestigious Hospital Affiliation Badge (User Specified) */}
              <div className="p-3 rounded-xl bg-white border border-blue-200 shadow-2xs flex items-start gap-2.5 text-xs text-slate-800">
                <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                    Institutional Training & Experience
                  </span>
                  <span className="font-bold text-[#0a2540] block leading-snug">
                    Trauma Centre & Superspecialty Hospital, Institute of Medical Sciences (IMS), Banaras Hindu University
                  </span>
                </div>
              </div>

              {/* Clinical Experience Stats */}
              <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                <div className="bg-white px-3.5 py-1.5 rounded-xl border border-blue-100 shadow-2xs">
                  <span className="text-sm font-bold text-[#0a2540]">{doctorVenu.experienceYears} Years</span>
                  <span className="text-[11px] text-slate-500 ml-1.5">Clinical Experience</span>
                </div>
                <div className="bg-white px-3.5 py-1.5 rounded-xl border border-blue-100 shadow-2xs">
                  <span className="text-sm font-bold text-[#0a2540]">{doctorVenu.patientsTreated}</span>
                  <span className="text-[11px] text-slate-500 ml-1.5">Rehabilitated Patients</span>
                </div>
                <div className="bg-white px-3.5 py-1.5 rounded-xl border border-blue-100 shadow-2xs">
                  <span className="text-sm font-bold text-emerald-700">100% Home Visit</span>
                  <span className="text-[11px] text-slate-500 ml-1.5">Zero Travel Hassle</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {doctorVenu.bio}
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Consult with Dr. Venu</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 2. INTERACTIVE AUTO-SCROLLING TEAM GALLERY ("scrolling one after other.. one by one") */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-0.5">
                Our Therapists in Action
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-[#0a2540]">
                Doorstep Physical Therapy Sessions Across Hyderabad
              </h3>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1 transition"
                title={isPaused ? "Play slideshow" : "Pause slideshow"}
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-blue-600" /> : <Pause className="w-3.5 h-3.5 text-slate-600" />}
                <span className="text-[11px]">{isPaused ? "Play" : "Pause"}</span>
              </button>

              <button
                type="button"
                onClick={prevSlide}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition shadow-2xs"
                aria-label="Previous team photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-bold font-mono text-slate-500 px-1">
                {currentSlide + 1} / {TEAM_PHOTOS.length}
              </span>

              <button
                type="button"
                onClick={nextSlide}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition shadow-2xs"
                aria-label="Next team photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Sliding Carousel Container */}
          <div
            className="relative rounded-2xl overflow-hidden border border-blue-100 bg-slate-950 shadow-md group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Viewport for current slide with adaptive ambient backdrop & full photo containment */}
            <div className="relative h-[290px] sm:h-[420px] md:h-[480px] lg:h-[540px] w-full overflow-hidden flex items-center justify-center">
              {TEAM_PHOTOS.map((item, index) => {
                const isActive = index === currentSlide;
                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                    }`}
                  >
                    {/* Ambient Blurred Backdrop to avoid black dead space */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover blur-2xl opacity-35 scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-950/40" />
                    </div>

                    {/* Main Photograph: object-contain ensures 100% of the image fits cleanly without cropping */}
                    <div className="relative w-full h-full p-2 sm:p-4 md:p-6 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1280px) 100vw, 1200px"
                        className="object-contain drop-shadow-md"
                        priority={index === 0}
                      />
                    </div>

                    {/* Clean Clinical Caption Pill */}
                    <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-20 pointer-events-none max-w-sm sm:max-w-md">
                      <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/15 text-white shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-0.5">
                          PhysioSphere Team • {index + 1} of {TEAM_PHOTOS.length}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-0.5 hidden sm:block leading-relaxed">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Prev / Next Click Overlays - Touch friendly on mobile, hover on desktop */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-sm transition border border-white/20 shadow-md cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-sm transition border border-white/20 shadow-md cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dot Pagination Bar */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 z-20 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10">
              {TEAM_PHOTOS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx
                      ? "w-6 bg-blue-500 shadow-sm"
                      : "w-2 bg-white/40 hover:bg-white/80"
                  }`}
                  aria-label={`Jump to photo ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3. ZONAL TEAM COORDINATION (30+ Physiotherapists Across Hyderabad) */}
        <div className="bg-white border border-blue-100 rounded-2xl p-5 sm:p-7 shadow-2xs">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5" /> Zonal Coordination
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0a2540]">
              Team of 30+ Physiotherapists Across Hyderabad
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Coordinated specialists assigned based on your neighborhood for prompt doorstep visits with zero clinic travel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
            <div className="p-3.5 rounded-xl bg-[#f0f7fd] border border-blue-100 highlight-card">
              <div className="font-bold text-[#0a2540] mb-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Citywide Coverage</span>
              </div>
              <p className="text-slate-600 text-[11px]">Central, East, South, West, and North Hyderabad.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f0f7fd] border border-blue-100 highlight-card">
              <div className="font-bold text-[#0a2540] mb-0.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Licensed Experts</span>
              </div>
              <p className="text-slate-600 text-[11px]">Qualified in orthopedic, neuro, and geriatric rehabilitation.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f0f7fd] border border-blue-100 highlight-card">
              <div className="font-bold text-[#0a2540] mb-0.5 flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
                <span>Prompt Scheduling</span>
              </div>
              <p className="text-slate-600 text-[11px]">Morning and evening flexible home slots available.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
