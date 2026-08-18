import type { Metadata } from "next";
import { Vazirmatn } from 'next/font/google';
import "./globals.css";
import Navbar from "@/app/components/UserSideComponents/Navbar";
import Footer from "@/app/components/UserSideComponents/Footer";
import Script from "next/script";

const vazirmatn = Vazirmatn({
    subsets: ['arabic', 'latin'],
    weight: ['400', '700'],
    display: 'swap',
});

// ===== متا تگ‌های اصلی =====
export const metadata: Metadata = {
    title: {
        default: 'تولیدی مبل تک | تولید کننده مبلمان کلاسیک و مدرن',
        template: '%s | تولیدی مبل تک',
    },
    description: 'تولیدی مبل تک با بیش از یک دهه تجربه در تولید مبلمان کلاسیک و مدرن با کیفیت بالا.',
    metadataBase: new URL('https://mobltak.ir'),
};

// ===== داده‌های ساختاریافته (Schema Markup) برای نمایش در نتایج گوگل =====
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "تولیدی مبل تک",
    description: "تولید کننده مبلمان کلاسیک و مدرن با بیش از ۱۵ سال تجربه در سنندج",
    image: "https://mobltak.ir/images/IMG_20260712_222438_105.JPG",
    address: {
        "@type": "PostalAddress",
        streetAddress: "سنندج، میدان فیض‌آباد، سه‌راه چوب‌فروشان، ابتدای شهرک اتوبوس‌رانی، تولیدی مبل تک",
        addressLocality: "سنندج",
        addressRegion: "کردستان",
        postalCode: "66156",
        addressCountry: "IR",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: "35.3309522",
        longitude: "47.0139678",
    },
    telephone: "+98-936-166-6465",
    email: "info@mobltak.ir",
    openingHours: "شنبه تا پنجشنبه ۰۹:۰۰-۱۸:۰۰",
    url: "https://mobltak.ir",
    sameAs: [
        "https://instagram.com/mobl_tak_sna",
        "https://t.me/mobletak",
        "https://wa.me/989123456789",
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl" className={vazirmatn.className}>
        <head>
            {/* ===== اسکریپت Schema Markup برای نمایش موقعیت در گوگل ===== */}
            <Script
                id="local-business-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema),
                }}
            />
        </head>
        <body>
        <Navbar />
        {children}
        <Footer />
        </body>
        </html>
    );
}