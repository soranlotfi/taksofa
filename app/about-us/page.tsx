// app/about-us/page.tsx
import AboutContent from "./AboutContent";
import { Metadata } from "next";

// ===== متا تگ‌های سئو محور با کلمات کلیدی هدف =====
export const metadata: Metadata = {
    title: "درباره تولیدی مبل تک | بیش از ۱۵ سال تجربه در تولید مبلمان در سنندج",
    description:
        "تولیدی مبل تک از سال ۱۳۸۵ فعالیت خود را در سنندج آغاز کرده و با ضمانت ۳ ساله، یکی از معتبرترین تولیدکنندگان مبلمان کلاسیک و مدرن در کردستان است.",
    keywords:
        "درباره تولیدی مبل تک, مبل تک سنندج, تولیدی مبل در سنندج, تولید مبلمان کلاسیک, تولید مبلمان مدرن, ضمانت ۳ ساله, ۱۳۸۵",
    alternates: {
        canonical: "https://mobltak.ir/about-us",
    },
    openGraph: {
        title: "درباره تولیدی مبل تک | بیش از ۱۵ سال تجربه در تولید مبلمان در سنندج",
        description:
            "تولیدی مبل تک با بیش از ۱۵ سال تجربه و ضمانت ۳ ساله، تولید کننده مبلمان کلاسیک و مدرن در سنندج و ارسال به سراسر کشور.",
        url: "https://mobltak.ir/about-us",
        siteName: "تولیدی مبل تک",
        locale: "fa_IR",
        type: "website",
    },
};

export default function AboutPage() {
    return <AboutContent />;
}