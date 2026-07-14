"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faEye, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface MissionVisionProps {
    mission?: string;
    vision?: string;
}

export default function MissionVisionSection({
                                                 mission,
                                                 vision
                                             }: MissionVisionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden bg-white">
            {/* ===== پس‌زمینه با اشکال هندسی مدرن ===== */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-red/500 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-3xl" />

                {/* خط‌های تزئینی */}
                <div className="absolute top-20 right-10 w-32 h-px bg-gradient-to-l from-emerald-300/20 to-transparent rotate-45" />
                <div className="absolute bottom-20 left-10 w-32 h-px bg-gradient-to-r from-gold-300/20 to-transparent -rotate-45" />
                <div className="absolute top-1/2 right-20 w-20 h-px bg-emerald-300/10 rotate-12" />
                <div className="absolute bottom-1/3 left-20 w-20 h-px bg-gold-300/10 -rotate-12" />

                {/* نقطه‌های تزئینی */}
                <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-emerald-400/20 rounded-full" />
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-gold-400/15 rounded-full" />
                <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-emerald-400/10 rounded-full" />
                <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-gold-400/10 rounded-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                {/* ===== هدر ===== */}
                <div
                    className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-emerald-200/30 rounded-full px-6 py-2.5 mb-5 shadow-lg shadow-emerald-500/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                        <span className="text-emerald-700/70 text-xs font-semibold tracking-[0.15em] uppercase">
              مأموریت و چشم‌انداز
            </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-900 leading-tight">
            <span className="bg-gradient-to-l from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              مسیر
            </span>{" "}
                        <span className="relative">
              <span className="bg-gradient-to-l from-gold via-gold-light to-gold bg-clip-text text-transparent">
                روشن
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent rounded-full" />
            </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mt-5" />
                    <p className="text-gray-400 mt-5 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        اهداف و آرمان‌هایی که ما را در مسیر تعالی هدایت می‌کنند
                    </p>
                </div>

                {/* ===== کارت‌ها (طراحی فوق‌مدرن) ===== */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                    {/* کارت مأموریت */}
                    <div
                        className={`group relative transition-all duration-1000 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                        }`}
                        style={{ transitionDelay: "200ms" }}
                    >
                        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/50 shadow-[0_8px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_80px_rgba(10,61,50,0.10)] transition-all duration-500 hover:-translate-y-3 hover:border-emerald-300/50 overflow-hidden">
                            {/* گلیتر پس‌زمینه */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

                            {/* شماره/نشان‌گر */}
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 text-8xl md:text-9xl font-black text-emerald-900/5 select-none pointer-events-none">
                                ۰۱
                            </div>

                            <div className="relative z-10">
                                {/* آیکون با افکت */}
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/10 group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-500">
                                        <FontAwesomeIcon icon={faBullseye} className="text-emerald-600 w-8 h-8" />
                                    </div>
                                    <div className="absolute -inset-1 rounded-2xl bg-emerald-400/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4 flex items-center gap-3">
                                    مأموریت ما
                                    <span className="h-px flex-1 bg-gradient-to-l from-emerald-300/30 to-transparent" />
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light">
                                    {mission}
                                </p>

                                {/* خط تزئینی پایین */}
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="h-0.5 w-12 bg-emerald-300/40 rounded-full transition-all duration-500 group-hover:w-20 group-hover:bg-emerald-400" />
                                    <span className="text-emerald-300/0 group-hover:text-emerald-400/40 text-xs font-medium tracking-[0.15em] transition-all duration-500">
                    هدف ما
                  </span>
                                    <FontAwesomeIcon icon={faArrowLeft} className="text-emerald-300/0 group-hover:text-emerald-400/30 text-xs transition-all duration-500" />
                                </div>
                            </div>

                            {/* حاشیه‌ی درخشان */}
                            <div className="absolute inset-0 rounded-3xl border border-emerald-400/10 group-hover:border-emerald-400/20 transition-all duration-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* کارت چشم‌انداز */}
                    <div
                        className={`group relative transition-all duration-1000 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                        }`}
                        style={{ transitionDelay: "350ms" }}
                    >
                        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/50 shadow-[0_8px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_80px_rgba(201,154,59,0.10)] transition-all duration-500 hover:-translate-y-3 hover:border-yellow-300/50 overflow-hidden">
                            {/* گلیتر پس‌زمینه */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

                            <div className="relative z-10">
                                {/* آیکون با افکت */}
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-soft/60 to-gold-soft/20 flex items-center justify-center text-3xl shadow-lg shadow-yellow/10 group-hover:scale-110 group-hover:rotate-[6deg] transition-all duration-500">
                                        <FontAwesomeIcon icon={faEye} className="text-gold w-8 h-8" />
                                    </div>
                                    <div className="absolute -inset-1 rounded-2xl bg-yellow-400/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4 flex items-center gap-3">
                                    چشم‌انداز ما
                                    <span className="h-px flex-1 bg-gradient-to-l from-yellow-300/30 to-transparent" />
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light">
                                    {vision}
                                </p>

                                {/* خط تزئینی پایین */}
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="h-0.5 w-12 bg-yellow-300/40 rounded-full transition-all duration-500 group-hover:w-20 group-hover:bg-gold" />
                                    <span className="text--300/0 group-hover:text-gold-400/40 text-xs font-medium tracking-[0.15em] transition-all duration-500">
                    آرمان ما
                  </span>
                                    <FontAwesomeIcon icon={faArrowLeft} className="text-gold-300/0 group-hover:text-gold-400/30 text-xs transition-all duration-500" />
                                </div>
                            </div>

                            {/* حاشیه‌ی درخشان */}
                            <div className="absolute inset-0 rounded-3xl border border-yellow-400/20 group-hover:border-yellow-400/30 transition-all duration-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* ===== پایین بخش ===== */}
                <div
                    className={`mt-16 md:mt-20 text-center transition-all duration-1000 delay-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="inline-flex items-center gap-4 text-emerald-600/20 text-xs tracking-[0.2em]">
                        <span className="w-10 h-px bg-gradient-to-r from-transparent to-emerald-300/30" />
                        <span className="text-emerald-400/40 font-light">✦ همراه با تعهد ✦</span>
                        <span className="w-10 h-px bg-gradient-to-l from-transparent to-emerald-300/30" />
                    </div>
                </div>
            </div>
        </section>
    );
}