"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // تشخیص صفحه اصلی
    const isHomePage = pathname === "/home";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // تعیین کلاس‌های نوار بر اساس صفحه و اسکرول
    const navbarBgClass = () => {
        // اگر در صفحه اصلی باشیم و اسکرول نکرده باشیم → حالت شیشه‌ای روشن
        if (isHomePage && !scrolled) {
            return "bg-white/5 backdrop-blur-[20px] border-white/10";
        }
        // در غیر این صورت → حالت تیره (برای خوانایی در صفحات سفید)
        return "bg-emerald-dark/80 backdrop-blur-[24px] border-gold/20 shadow-2xl";
    };

    return (
        <nav
            className={`
        fixed top-4 md:top-5 left-1/2 -translate-x-1/2 z-50
        w-[94%] max-w-7xl
        px-4 py-2.5 md:px-6 md:py-3
        rounded-[60px] md:rounded-[80px]
        transition-all duration-500
        backdrop-blur-[20px] saturate-180
        border
        shadow-lg
        ${navbarBgClass()}
      `}
        >
            <div className="flex items-center justify-between">
                {/* لوگو */}
                <Link href="/public" className="flex items-center gap-2 md:gap-3 no-underline group">
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-emerald-dark font-black text-lg md:text-xl shadow-lg shadow-gold/20 flex-shrink-0">
                        م
                    </div>
                    <div className="flex flex-col leading-tight">
            <span className="text-white font-black text-base md:text-2xl tracking-tight drop-shadow-md">
              تولیدی
            </span>
                        <span className="bg-gradient-to-l from-gold to-gold-light text-emerald-dark font-black text-[0.6rem] md:text-xs px-2.5 py-0.5 rounded-full w-fit shadow-md transition-transform group-hover:scale-105">
              مبل تک
            </span>
                    </div>
                </Link>

                {/* منوی دسکتاپ */}
                <ul className="hidden md:flex items-center gap-1 list-none">
                    <li>
                        <Link
                            href="/home"
                            className={`text-white/80 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all text-sm font-medium ${
                                pathname === "/home" ? "text-white bg-white/10" : ""
                            }`}
                        >
                            خانه
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about-us"
                            className={`text-white/80 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all text-sm font-medium ${
                                pathname === "/about-us" ? "text-white bg-white/10" : ""
                            }`}
                        >
                            درباره ما
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products"
                            className={`text-white/80 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all text-sm font-medium ${
                                pathname === "/products" ? "text-white bg-white/10" : ""
                            }`}
                        >
                            محصولات
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact-us"
                            className={`text-white/80 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all text-sm font-medium ${
                                pathname === "/contact-us" ? "text-white bg-white/10" : ""
                            }`}
                        >
                            تماس با ما
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact-us"
                            className="bg-gold text-emerald-dark font-bold px-5 py-2 rounded-full shadow-lg shadow-gold/30 hover:shadow-gold/50 hover:bg-gold-light transition-all hover:-translate-y-0.5 text-sm"
                        >
                            ثبت سفارش
                        </Link>
                    </li>
                </ul>

                {/* دکمه همبرگر */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden flex flex-col gap-1 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                    aria-label="منو"
                >
                    <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </button>
            </div>

            {/* منوی موبایل */}
            <div
                className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[400px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}
        `}
            >
                <ul className="flex flex-col gap-1 list-none bg-emerald-dark/90 backdrop-blur-2xl rounded-3xl p-4 border border-white/5 shadow-2xl">
                    <li>
                        <Link
                            href="/home"
                            onClick={closeMenu}
                            className={`block w-full text-center py-3 rounded-xl hover:bg-white/10 transition-all text-base font-medium ${
                                pathname === "/home" ? "text-white bg-white/10" : "text-white/80 hover:text-white"
                            }`}
                        >
                            خانه
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about-us"
                            onClick={closeMenu}
                            className={`block w-full text-center py-3 rounded-xl hover:bg-white/10 transition-all text-base font-medium ${
                                pathname === "/about-us" ? "text-white bg-white/10" : "text-white/80 hover:text-white"
                            }`}
                        >
                            درباره ما
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products"
                            onClick={closeMenu}
                            className={`block w-full text-center py-3 rounded-xl hover:bg-white/10 transition-all text-base font-medium ${
                                pathname === "/products" ? "text-white bg-white/10" : "text-white/80 hover:text-white"
                            }`}
                        >
                            محصولات
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact-us"
                            onClick={closeMenu}
                            className={`block w-full text-center py-3 rounded-xl hover:bg-white/10 transition-all text-base font-medium ${
                                pathname === "/contact-us" ? "text-white bg-white/10" : "text-white/80 hover:text-white"
                            }`}
                        >
                            تماس
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact-us"
                            onClick={closeMenu}
                            className="block w-full text-center bg-gold text-emerald-dark font-bold py-3.5 rounded-xl shadow-lg shadow-gold/30 hover:bg-gold-light transition-all text-base mt-1"
                        >
                            ثبت سفارش
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}