"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, Calendar } from "lucide-react";
import { BRAND_INFO } from "@/data/physiosphereData";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Conditions", href: "#conditions", id: "conditions" },
    { name: "Our Team", href: "#our-team", id: "our-team" },
    { name: "Benefits", href: "#benefits", id: "benefits" },
    { name: "Locations", href: "#locations", id: "locations" },
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "Contact", href: "#contact", id: "contact" }
  ];

  // Lock body scroll only when mobile menu is explicitly open, always reset cleanly
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Scrollspy to track active section
  useEffect(() => {
    const sectionIds = ["hero", ...navLinks.map((l) => l.id)];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 125;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  // Seamless navigation handler that closes mobile menu and smoothly scrolls to section without freezing
  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.body.style.overflow = "";

    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* 1. Main Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-2xs">
        {/* Top Clinical Strip - Desktop Only (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:block bg-[#0a2540] text-slate-200 text-xs h-9 px-6 border-b border-blue-900/50">
          <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">Home Physiotherapy Across Hyderabad</span>
              <span className="text-blue-300/40">|</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Team of 30+ Licensed Physiotherapists
              </span>
              <span className="text-blue-300/40">|</span>
              <span className="text-blue-200">Hours: Mon-Sun: 9:00am - 9:00pm</span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={`tel:${BRAND_INFO.phonePrimary}`}
                className="hover:text-white transition flex items-center gap-1.5 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{BRAND_INFO.phoneFormattedPrimary}</span>
              </a>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5 font-semibold"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar: Responsive height (16 on mobile, 20 on desktop) */}
        <nav
          aria-label="Main Navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3"
        >
          {/* Brand Logo & Name */}
          <Link
            href="#hero"
            className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group min-w-0"
            onClick={handleLogoClick}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-blue-200 shadow-2xs flex-shrink-0 group-hover:border-blue-400 transition-colors">
              <Image
                src="/images/logo.jpeg"
                alt="PhysioSphere Logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-[#0a2540] leading-tight">
                Physio<span className="text-emerald-600">Sphere</span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 leading-none truncate">
                Home Physio • Hyderabad
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (15-16px font with active & hover cursor highlight) */}
          <div className="hidden xl:flex items-center gap-1.5 text-[15px] sm:text-[16px] font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0a2540] text-white font-bold shadow-2xs"
                      : "hover:bg-blue-100/70 hover:text-[#0a2540] text-slate-700"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Desktop Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BRAND_INFO.phonePrimary}`}
              className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 rounded-lg transition"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{BRAND_INFO.phoneFormattedPrimary}</span>
            </a>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Header: Clean, Uncluttered, Prominent Hamburger Button */}
          <div className="lg:hidden flex items-center flex-shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-blue-100 text-[#0a2540] border border-slate-200/90 transition shadow-2xs cursor-pointer"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6 stroke-[2.25]" />
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer to preserve normal page flow beneath fixed navbar */}
      <div className="h-16 sm:h-20 lg:h-[116px] w-full flex-shrink-0" aria-hidden="true" />

      {/* 2. Full-Screen Mobile Drawer (Independent Overlay, Completely Unstuck) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Mobile Overlay Header */}
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-200 bg-white flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 flex-shrink-0">
                <Image
                  src="/images/logo.jpeg"
                  alt="PhysioSphere Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-[#0a2540] leading-tight">
                  Physio<span className="text-emerald-600">Sphere</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 leading-none">
                  Hyderabad
                </span>
              </div>
            </div>

            {/* Clear, High-Contrast Close Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                document.body.style.overflow = "";
              }}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-[#0a2540] border border-slate-200 transition cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6 stroke-[2.25]" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`min-h-[48px] flex items-center px-4 rounded-xl text-base font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-slate-800 hover:bg-slate-50 active:bg-slate-100"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Minimal Action Footer - Clean & Non-Bloated */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 safe-bottom flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                document.body.style.overflow = "";
                onOpenBooking();
              }}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-blue-600 active:bg-blue-700 text-white font-bold text-base shadow-sm cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Home Visit</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
