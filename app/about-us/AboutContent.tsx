"use client";

import { useEffect, useState } from "react";
import {
    faAward,
    faUsers,
    faCouch,
    faTruck,
} from "@fortawesome/free-solid-svg-icons";
import AchievementsSection from "@/app/components/UserSideComponents/AchievementsSection";
import AboutUs from "@/app/components/UserSideComponents/AboutUs";
import HistorySection from "@/app/components/UserSideComponents/History";
import MissionVisionSection from "@/app/about-us/components/MissionsVision";
import ValuesSection from "@/app/about-us/components/ValuesSection";
import TeamSection from "@/app/about-us/components/TeamSection";
import CooperationSection from "@/app/about-us/components/CooperationSection";

interface AboutData {
    title: string;
    subtitle: string;
    heroImage: string;
    description1: string;
    description2: string;
    history: string;
    mission: string;
    vision: string;
    values: string[];
    stats: {
        label: string;
        value: string;
        icon: any;
    }[];
    team: {
        name: string;
        role: string;
        image: string;
    }[];
}

const defaultAboutData: AboutData = {
    title: "درباره تولیدی مبل تک | بیش از ۱۵ سال تجربه در تولید مبلمان در سنندج",
    subtitle: "کیفیت را با چشمانتان لمس کنید | ضمانت ۳ ساله",
    heroImage: "/images/IMG_20260712_222437_960.JPG",
    description1:
        "تولیدی مبل تک از سال ۱۳۸۵ فعالیت خود را در سنندج آغاز کرده و با بیش از یک دهه تجربه، به یکی از معتبرترین تولیدکنندگان مبلمان کلاسیک و مدرن در کردستان تبدیل شده است. نام «تک» نماد تعهد ما به کیفیت، دوام و رضایت کامل مشتریان است.",
    description2:
        "ما در کارگاه خود در سنندج با استفاده از بهترین چوب‌های روسی و گردو، اسفنج‌های با دانسیته بالا و پارچه‌های درجه یک ایتالیایی و ترکیه‌ای، محصولاتی با دوام و زیبا تولید می‌کنیم. تمام محصولات ما با ضمانت ۳ ساله اسکلت چوبی عرضه می‌شوند.",
    history:
        "تولیدی مبل تک در سال ۱۳۸۵ فعالیت خود را در یک کارگاه کوچک در سنندج آغاز کرد. با گذشت زمان و با تکیه بر کیفیت و اعتماد مشتریان، توانستیم کارگاه خود را گسترش دهیم و به یکی از تولیدکنندگان معتبر مبلمان در کردستان و ایران تبدیل شویم.",
    mission:
        "ارائه مبلمانی با کیفیت، زیبا و بادوام که بتواند سال‌ها همراه خانواده‌های ایرانی باشد و خاطرات شیرینی را برای آن‌ها بسازد.",
    vision:
        "تبدیل شدن به برند اول مبلمان در ایران با تکیه بر اصالت، کیفیت و نوآوری در طراحی.",
    values: [
        "کیفیت بی‌نظیر در هر قطعه",
        "استفاده از بهترین مواد اولیه",
        "طراحی منحصر‌به‌فرد و به‌روز",
        "رضایت کامل مشتریان",
        "ارسال به سراسر کشور",
        "ضمانت ۳ ساله اسکلت چوبی",
    ],
    stats: [
        { label: "سال تجربه", value: "۱۵+", icon: faAward },
        { label: "مشتری راضی", value: "۵۰۰+", icon: faUsers },
        { label: "مدل مبل", value: "۱۲۰+", icon: faCouch },
        { label: "شهر ارسال", value: "۳۰+", icon: faTruck },
    ],
    team: [
        { name: "علی محمدی", role: "مدیرعامل", image: "/images/team-1.jpg" },
        { name: "سارا احمدی", role: "مدیر طراحی", image: "/images/team-2.jpg" },
        { name: "رضا کریمی", role: "مدیر تولید", image: "/images/team-3.jpg" },
    ],
};

export default function AboutContent() {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => {
                if (!res.ok) throw new Error("خطا در دریافت اطلاعات");
                return res.json();
            })
            .then((settings) => {
                const aboutData = {
                    ...defaultAboutData,
                    ...(settings.about || {}),
                };
                setData(aboutData);
                setLoading(false);
            })
            .catch(() => {
                setData(defaultAboutData);
                setLoading(false);
            });
    }, []);

   /* if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 mt-4">در حال بارگذاری...</p>
                </div>
            </section>
        );
    }*/

    if (!data) return null;

    return (
        <main className="bg-gray-50/50">
            {/* ===== بخش قهرمان با H1 برای سئو ===== */}
            <section
                className="relative min-h-[20vh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
                style={{
                    minHeight:"50vh",
                    backgroundImage: `linear-gradient(135deg, rgba(10, 61, 50, 0.85), rgba(10, 61, 50, 0.1)), url('${data.heroImage || "/images/IMG_20260712_222437_960.JPG"}')`,
                }}
            >
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg p-10">
                        درباره تولیدی مبل تک
                    </h1>
                    <p className="text-white/80 text-sm md:text-lg mt-2 max-w-2xl mx-auto">
                        بیش از ۱۵ سال تجربه در تولید مبلمان با ضمانت ۳ ساله در سنندج
                    </p>
                </div>
            </section>

            <AboutUs />
            <HistorySection />
            <MissionVisionSection mission={data.mission} vision={data.vision} />
            <ValuesSection values={data.values} />
            <AchievementsSection />
            <TeamSection members={data.team} />
            <CooperationSection />
        </main>
    );
}