"use client";

import {useEffect, useState} from "react";
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

// دیتای پیش‌فرض (در صورت عدم دریافت از API)
const defaultAboutData: AboutData = {
    title: "درباره تولیدی مبل تک",
    subtitle: "کیفیت را با چشمانتان لمس کنید",
    heroImage: "/images/IMG_20260712_222437_960.JPG",
    description1:
        "تولیدی مبل تک از سال ۱۳۸۵ با هدف احیای هنر نجاری و تولید مبلمانی با دوام و زیبا پا به عرصه گذاشت. نام «تک» نماد تعهد ما به تک‌تک محصولات و رضایت تک‌تک مشتریان است.",
    description2:
        "ما در کارگاه خود از بهترین چوب‌های روسی و گردو، اسفنج‌های با دانسیته بالا و پارچه‌های درجه یک ایتالیایی و ترکیه‌ای استفاده می‌کنیم. هر قطعه با عشق و ظرافت در کارگاه تک متولد می‌شود.",
    history:
        "تولیدی مبل تک در سال ۱۳۸۵ فعالیت خود را در یک کارگاه کوچک در تهران آغاز کرد. با گذشت زمان و با تکیه بر کیفیت و اعتماد مشتریان، توانستیم کارگاه خود را گسترش دهیم و به یکی از تولیدکنندگان معتبر مبلمان در ایران تبدیل شویم.",
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
    ],
    stats: [
        {label: "سال تجربه", value: "۱۵+", icon: faAward},
        {label: "مشتری راضی", value: "۵۰۰+", icon: faUsers},
        {label: "مدل مبل", value: "۱۲۰+", icon: faCouch},
        {label: "شهر ارسال", value: "۳۰+", icon: faTruck},
    ],
    team: [
        {name: "علی محمدی", role: "مدیرعامل", image: "/images/team-1.jpg"},
        {name: "سارا احمدی", role: "مدیر طراحی", image: "/images/team-2.jpg"},
        {name: "رضا کریمی", role: "مدیر تولید", image: "/images/team-3.jpg"},
    ],
};

export default function AboutPage() {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // دریافت اطلاعات از API (می‌توانید از settings یا یک API جداگانه استفاده کنید)
        fetch("/api/settings")
            .then((res) => res.json())
            .then((settings) => {
                // اگر در settings اطلاعات about وجود داشت از آن استفاده کن، در غیر این صورت از default
                const aboutData = settings.about || defaultAboutData;
                setData(aboutData);
                setLoading(false);
            })
            .catch(() => {
                // در صورت خطا، از دیتای پیش‌فرض استفاده کن
                setData(defaultAboutData);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div
                        className="inline-block w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"/>
                    <p className="text-gray-500 mt-4">در حال بارگذاری...</p>
                </div>
            </section>
        );
    }

    if (!data) return null;

    return (
        <main className="bg-gray-50/50 ">
            {/* ===== بخش قهرمان (Hero) ===== */}
            <section
                className="relative min-h-[18vh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
                style={{
                    // paddingTop:"10rem",
                    // paddingBottom:"1rem",
                    backgroundImage: `linear-gradient(135deg, rgba(10, 61, 50, 0.85), rgba(10, 61, 50, 0.1)), url('${data.heroImage || "/images/IMG_20260712_222437_960.JPG"}')`,
                }}
            >
            </section>
            <AboutUs/>
            {/* ===== بخش تاریخچه ===== */}
            <HistorySection/>
            {/* ===== بخش مأموریت و چشم‌انداز ===== */}
            <MissionVisionSection mission={data.mission} vision={data.vision}/>
            {/* ===== بخش ارزش‌ها ===== */}
            <ValuesSection values={data.values}/>
            {/* ===== بخش آمار ===== */}
            <AchievementsSection/>
            {/* ===== بخش تیم ===== */}
            <TeamSection members={data.team}/>
            {/* ===== بخش تماس سریع ===== */}
           <CooperationSection/>
        </main>
    );
}