import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "@/app/globals.css";
import AdminLayout from "./components/AdminLayout";

const vazirmatn = Vazirmatn({
    subsets: ["arabic", "latin"],
    weight: ["400", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "پنل مدیریت | تولیدی مبل تک",
    description: "پنل مدیریت تولیدی مبل تک",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl" className={vazirmatn.className}>
        <body>
        <AdminLayout>{children}</AdminLayout>
        </body>
        </html>
    );
}