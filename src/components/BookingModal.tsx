"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Phone,
  Loader2
} from "lucide-react";
import { BRAND_INFO, CONDITIONS_TREATED, SERVICE_CATEGORIES } from "@/data/physiosphereData";
import { BookingFormData, BookingResponse } from "@/types/booking";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialService = ""
}: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    service: initialService || "General Physiotherapy Consultation",
    description: "",
    honeypot: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Please enter patient name.";
    }

    const cleanPhone = formData.mobile.replace(/\D/g, "");
    if (!formData.mobile.trim()) {
      errors.mobile = "Please enter mobile number.";
    } else if (cleanPhone.length < 10) {
      errors.mobile = "Enter a valid 10-digit number.";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email.";
    }

    if (!formData.address.trim()) {
      errors.address = "Please enter your area in Hyderabad.";
    }

    if (!formData.description.trim()) {
      errors.description = "Please describe the problem or goals.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data: BookingResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit request. Please try again.");
      }

      setSubmissionSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmissionSuccess(false);
    setServerError(null);
    setFormErrors({});
    setFormData({
      fullName: "",
      mobile: "",
      email: "",
      address: "",
      service: "General Physiotherapy Consultation",
      description: "",
      honeypot: ""
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-[60] flex flex-col sm:flex-row sm:items-center sm:justify-center bg-black/60 backdrop-blur-2xs overflow-hidden"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-lg bg-white sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Sticky */}
        <div className="bg-[#0a2540] text-white px-4 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-blue-900/60 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 id="booking-modal-title" className="text-base sm:text-lg font-bold leading-tight">
                Book a Home Visit
              </h2>
              <p className="text-[11px] text-blue-200">
                Doorstep Physiotherapy in Hyderabad
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-9 h-9 flex items-center justify-center text-blue-200 hover:text-white rounded-lg transition active:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {submissionSuccess ? (
            /* Success Confirmation State */
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0a2540] leading-snug">
                Appointment Request Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Our team will contact you shortly to confirm your therapist and appointment slot.
              </p>

              <div className="bg-[#f0f7fd] border border-blue-200 rounded-xl p-3.5 max-w-sm mx-auto text-left space-y-2 text-xs">
                <span className="font-bold text-[#0a2540] block">Need immediate coordination?</span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${BRAND_INFO.phonePrimary}`}
                    className="min-h-[40px] flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white font-bold text-slate-800"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href={BRAND_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[40px] flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 text-white font-bold"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-[#0a2540] text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Mobile-Optimized Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: "" });
                    }}
                    className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 ${
                      formErrors.fullName ? "border-red-400 bg-red-50/50" : "border-slate-300 focus:border-blue-600"
                    }`}
                  />
                  {formErrors.fullName && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.fullName}</p>}
                </div>

                {/* Mobile Number with Numeric Keypad */}
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    placeholder="e.g. 7675069960"
                    value={formData.mobile}
                    onChange={(e) => {
                      setFormData({ ...formData, mobile: e.target.value });
                      if (formErrors.mobile) setFormErrors({ ...formErrors, mobile: "" });
                    }}
                    className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 ${
                      formErrors.mobile ? "border-red-400 bg-red-50/50" : "border-slate-300 focus:border-blue-600"
                    }`}
                  />
                  {formErrors.mobile && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.mobile}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email Address */}
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    inputMode="email"
                    required
                    placeholder="e.g. ramesh@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                    }}
                    className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 ${
                      formErrors.email ? "border-red-400 bg-red-50/50" : "border-slate-300 focus:border-blue-600"
                    }`}
                  />
                  {formErrors.email && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.email}</p>}
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="modal-service" className="block text-xs font-bold text-slate-700 mb-1">
                    Condition / Service
                  </label>
                  <select
                    id="modal-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-base sm:text-sm text-slate-900 bg-white focus:border-blue-600"
                  >
                    <option value="General Physiotherapy Consultation">General Consultation</option>
                    <optgroup label="Specialized Disciplines">
                      {SERVICE_CATEGORIES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Conditions Treated">
                      {CONDITIONS_TREATED.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Hyderabad Address */}
              <div>
                <label htmlFor="modal-address" className="block text-xs font-bold text-slate-700 mb-1">
                  Location / Area in Hyderabad <span className="text-red-500">*</span>
                </label>
                <input
                  id="modal-address"
                  type="text"
                  required
                  placeholder="e.g. Madhapur, Kukatpally, Banjara Hills"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    if (formErrors.address) setFormErrors({ ...formErrors, address: "" });
                  }}
                  className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 ${
                    formErrors.address ? "border-red-400 bg-red-50/50" : "border-slate-300 focus:border-blue-600"
                  }`}
                />
                {formErrors.address && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.address}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="modal-desc" className="block text-xs font-bold text-slate-700 mb-1">
                  Symptoms / Problem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="modal-desc"
                  rows={2}
                  required
                  placeholder="Briefly describe pain, symptoms, or surgery details..."
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (formErrors.description) setFormErrors({ ...formErrors, description: "" });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 ${
                    formErrors.description ? "border-red-400 bg-red-50/50" : "border-slate-300 focus:border-blue-600"
                  }`}
                />
                {formErrors.description && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.description}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] px-6 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-base shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Request Appointment</span>
                  )}
                </button>
              </div>

              {/* Direct links */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Or direct:</span>
                <div className="flex items-center gap-3">
                  <a href={`tel:${BRAND_INFO.phonePrimary}`} className="text-blue-600 hover:underline font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <a href={BRAND_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-bold flex items-center gap-1">
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}