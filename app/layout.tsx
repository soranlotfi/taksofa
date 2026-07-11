import type { Metadata } from "next";
import { Vazirmatn } from 'next/font/google';
import "./globals.css";
import Navbar from "@/app/components/Navbar";

const vazirmatn = Vazirmatn({
    subsets: ['arabic', 'latin'],
    weight: ['400', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: "تولیدی مبل تک | اصالت و کیفیت",
    description: "تولیدی مبل تک با بیش از یک دهه تجربه در تولید مبلمان کلاسیک و مدرن",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl" className={vazirmatn.className}>
        <body className="antialiased">
        <Navbar/>
        {children}
        </body>
        </html>
    );
}