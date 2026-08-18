// app/contact/page.tsx
import ContactSection from "@/app/components/UserSideComponents/ContactSection";
import { Metadata } from "next";

// ===== متا تگ‌های سئو محور برای صفحه تماس با ما =====
export const metadata: Metadata = {
    title: "تماس با تولیدی مبل تک | شماره تماس و آدرس کارگاه در سنندج",
    description:
        "راه‌های ارتباطی با تولیدی مبل تک: شماره تماس، آدرس کارگاه در سنندج، واتساپ، تلگرام و شبکه‌های اجتماعی. برای مشاوره و سفارش با ما در تماس باشید.",
    keywords:
        "تماس با مبل تک, شماره تماس مبل تک, آدرس مبل تک سنندج, تولیدی مبل در سنندج, مشاوره مبل, سفارش مبل",
    alternates: {
        canonical: "https://mobltak.ir/contact",
    },
    openGraph: {
        title: "تماس با تولیدی مبل تک | شماره تماس و آدرس کارگاه در سنندج",
        description:
            "راه‌های ارتباطی با تولیدی مبل تک: شماره تماس، آدرس کارگاه در سنندج، واتساپ، تلگرام و شبکه‌های اجتماعی.",
        url: "https://mobltak.ir/contact",
        siteName: "تولیدی مبل تک",
        locale: "fa_IR",
        type: "website",
    },
};

export default function ContactPage() {
    return <ContactSection />;
}