import Hero from "@/app/components/UserSideComponents/Hero";
import AboutUs from "@/app/components/UserSideComponents/AboutUs";
import ContactSection from "@/app/components/UserSideComponents/ContactSection";
import AchievementsSection from "@/app/components/UserSideComponents/AchievementsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'تولیدی مبل تک | تولید کننده مبلمان کلاسیک و مدرن در سنندج',
    description: 'تولیدی مبل تک با بیش از یک دهه تجربه در تولید مبلمان کلاسیک، مدرن و لاکچری در سنندج. با بهترین کیفیت و قیمت مناسب، محصولات خود را به سراسر کشور ارسال می‌کنیم.',
    keywords: 'تولیدی مبل تک, مبل تک, مبل تک سنندج, تولیدی مبل در سنندج, خرید مبل, مبل کلاسیک, مبل مدرن, مبلمان سنندج',
    alternates: {
        canonical: 'https://mobltak.ir',
    },
    openGraph: {
        title: 'تولیدی مبل تک | تولید کننده مبلمان کلاسیک و مدرن در سنندج',
        description: 'تولیدی مبل تک با بیش از یک دهه تجربه در تولید مبلمان با کیفیت بالا در سنندج. مشاهده و خرید انواع مبل کلاسیک و مدرن.',
        url: 'https://mobltak.ir',
        siteName: 'تولیدی مبل تک',
        locale: 'fa_IR',
        type: 'website',
    },
};

export default function Home() {
    return (
        <main>
            <Hero />
            <AboutUs />
            <AchievementsSection />
            <ContactSection />
        </main>
    );
}