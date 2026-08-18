"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ===== تعریف نوع داده =====
interface AboutData {
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    features: string[];
    imagePlaceholder: string;
}

// ===== داده‌های پیش‌فرض با کلمات کلیدی سئو محور =====
const defaultAboutData: AboutData = {
    title: "تولیدی مبل تک | بیش از ۱۵ سال تجربه در تولید مبلمان در سنندج",
    subtitle: "کیفیت را با چشمانتان لمس کنید | ضمانت ۳ ساله",
    description1:
        "تولیدی مبل تک از سال ۱۳۸۵ فعالیت خود را در سنندج آغاز کرده و با بیش از یک دهه تجربه، به یکی از معتبرترین تولیدکنندگان مبلمان کلاسیک و مدرن در کردستان تبدیل شده است. نام «تک» نماد تعهد ما به کیفیت، دوام و رضایت کامل مشتریان است.",
    description2:
        "ما در کارگاه خود در سنندج با استفاده از بهترین چوب‌های روسی و گردو، اسفنج‌های با دانسیته بالا و پارچه‌های درجه یک ایتالیایی و ترکیه‌ای، محصولاتی با دوام و زیبا تولید می‌کنیم. تمام محصولات ما با ضمانت ۳ ساله اسکلت چوبی عرضه می‌شوند.",
    features: [
        "ضمانت ۳ ساله اسکلت چوبی",
        "استفاده از بهترین چوب‌های روسی و گردو",
        "تولید مبلمان کلاسیک و مدرن در سنندج",
        "ارسال به سراسر ایران",
    ],
    imagePlaceholder: "تولیدی مبل تک در سنندج",
};

// ===== کامپوننت اسکلت با تیلویند خالص =====
function AboutSkeleton() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* اسکلت هدر */}
                <div className="text-center mb-12">
                    <div className="h-12 w-3/4 md:w-1/2 mx-auto rounded-lg bg-gray-200 animate-pulse" />
                    <div className="h-6 w-1/2 md:w-1/3 mx-auto mt-4 rounded-lg bg-gray-200 animate-pulse" />
                </div>

                {/* اسکلت محتوای اصلی */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="h-24 w-full rounded-lg bg-gray-200 animate-pulse" />
                        <div className="h-24 w-full rounded-lg bg-gray-200 animate-pulse mt-4" />
                        <div className="space-y-3 mt-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-8 w-full rounded-lg bg-gray-200 animate-pulse" />
                            ))}
                        </div>
                        <div className="h-12 w-48 rounded-full bg-gray-200 animate-pulse mt-8" />
                    </div>
                    <div className="h-72 md:h-96 w-full rounded-3xl bg-gray-200 animate-pulse" />
                </div>
            </div>
        </section>
    );
}

export default function AboutUs() {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // ===== دریافت داده از سرور =====
    useEffect(() => {
        fetch("/api/settings")
            .then((res) => {
                if (!res.ok) throw new Error("خطا در دریافت اطلاعات");
                return res.json();
            })
            .then((settings) => {
                const mergedData: AboutData = {
                    ...defaultAboutData,
                    ...(settings.about || {}),
                };
                setData(mergedData);
                setLoading(false);
            })
            .catch(() => {
                setData(defaultAboutData);
                setLoading(false);
            });
    }, []);

    // ===== نمایش اسکلت در حین بارگذاری =====
    if (loading) {
        return <AboutSkeleton />;
    }

    if (!data) return null;

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* ===== هدر بخش ===== */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-emerald-dark inline-block relative">
                        {data.title}
                        <span className="absolute -bottom-3 right-0 w-16 h-1 bg-gold rounded-full" />
                    </h1>
                    <p className="text-gray-500 mt-6 text-lg">{data.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* ===== متن ===== */}
                    <div>
                        <p className="text-gray-700 leading-relaxed mb-4">{data.description1}</p>
                        <p className="text-gray-700 leading-relaxed mb-6">{data.description2}</p>

                        <ul className="space-y-3">
                            {(data.features || []).map((feature: string, index: number) => (
                                <li key={index} className="flex items-center gap-3 text-emerald-dark font-medium">
                                    <span className="text-gold text-xl">✦</span> {feature}
                                </li>
                            ))}
                        </ul>

                        {/* ===== لینک داخلی برای سئو ===== */}
                        <div className="mt-8">
                            <a
                                href="/products"
                                className="inline-block bg-gold text-emerald-dark font-bold px-8 py-3 rounded-full hover:bg-gold-light transition shadow-md"
                            >
                                مشاهده محصولات مبل تک در سنندج
                            </a>
                        </div>
                    </div>

                    {/* ===== تصویر ===== */}
                    <div className="relative rounded-3xl h-72 md:h-96 shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-light to-emerald-dark">
                        <Image
                            src="/images/IMG_20260712_222438_105.JPG"
                            alt="کارگاه تولیدی مبل تک در سنندج | ضمانت ۳ ساله و بیش از ۱۵ سال تجربه"
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                        <div className="absolute inset-0 bg-emerald-dark/20" />
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
              <span className="text-white/10 text-8xl font-black tracking-widest">
                {data.imagePlaceholder}
              </span>
                            <span className="absolute bottom-6 left-6 text-white/60 text-sm bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm">
                کارگاه تولیدی مبل تک در سنندج | از ۱۳۸۵
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}