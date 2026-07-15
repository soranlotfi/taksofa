"use client";

import { useEffect, useRef, useState } from "react";
import {toPersianDigits} from "@/lib/utils";

// ===== کامپوننت شمارنده =====
function Counter({ target, label, emoji, suffix = "" }: { target: number; label: string; emoji: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const duration = 2500;
                    const step = Math.max(1, Math.floor(target / 80));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(start);
                        }
                    }, 25);

                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, hasAnimated]);

    return (
        <div
            ref={ref}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 flex items-center gap-4 md:gap-5"
        >
            {/* ایموجی */}
            <div className="text-3xl md:text-4xl flex-shrink-0 transition-all duration-500 group-hover:scale-110">
                {emoji}
            </div>

            {/* اطلاعات */}
            <div className="flex flex-col">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {toPersianDigits(count.toLocaleString())}
                    <span className="text-gold">{suffix}</span>
                </div>
                <div className="text-xs md:text-sm text-white/50 font-medium tracking-wide">
                    {label}
                </div>
            </div>

            {/* خط تزئینی در هاور */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 group-hover:w-3/4" />
        </div>
    );
}

// ===== بخش اصلی دستاوردها =====
export default function AchievementsSection() {
    const achievements = [
        { id: 1, target: 15, label: "سال تجربه", emoji: "🏆", suffix: "+" },
        { id: 2, target: 500, label: "مشتری راضی", emoji: "👥", suffix: "+" },
        { id: 3, target: 120, label: "مدل مبل", emoji: "🛋️", suffix: "+" },
        { id: 4, target: 30, label: "شهر ارسال", emoji: "🚚", suffix: "+" },
    ];

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-emerald-dark via-emerald-dark/95 to-emerald-medium">
            {/* اشکال تزئینی پس‌زمینه */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                {/* هدر بخش */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-4">
                        <span className="text-gold text-xs">✦</span>
                        <span className="text-white/40 text-xs font-medium tracking-wider">دستاوردهای ما</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                        به عددهایی که
                        <br className="sm:hidden" />
                        <span className="bg-gradient-to-l from-gold to-gold-light bg-clip-text text-transparent"> می‌گویند افتخار می‌کنیم</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mt-5" />
                    <p className="text-white/40 mt-5 text-base max-w-2xl mx-auto font-light">
                        سال‌ها تلاش، اعتماد مشتریان و تعهد به کیفیت، ما را به این جایگاه رسانده است.
                    </p>
                </div>

                {/* آمارها */}
                <div className="flex flex-wrap justify-center items-stretch gap-4 md:gap-6">
                    {achievements.map((item) => (
                        <div key={item.id} className="flex-1 min-w-[160px] max-w-[280px] ">
                            <Counter target={item.target} label={item.label} emoji={item.emoji} suffix={item.suffix} />
                        </div>
                    ))}
                </div>

                {/* پایین بخش */}
                <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 text-white/20 text-xs tracking-widest">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent to-gold/30" />
                        <span className={"text-gold"}>✦ افتخار آفرینان ✦</span>
                        <span className="w-8 h-px bg-gradient-to-l from-transparent to-gold/30" />
                    </div>
                </div>
            </div>
        </section>
    );
}