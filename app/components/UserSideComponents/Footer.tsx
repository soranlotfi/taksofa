"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faTelegram,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faMobileAlt, faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface FooterData {
    footer: {
        brand: string;
        tagline: string;
        copyright: string;
    };
    contact: {
        phone: string;
        phoneHours: string;
        address: string;
        addressLabel: string;
        mobile: string;
        mobileLabel: string;
    };
}

export default function Footer() {
    const [data, setData] = useState<FooterData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((settings) => {
                setData({
                    footer: settings.footer,
                    contact: settings.contact,
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const currentYear = new Date().getFullYear();

    if (loading) {
        return (
            <footer className="bg-emerald-dark py-8 text-center">
                <div className="container mx-auto px-4">
                    <div className="inline-block w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                </div>
            </footer>
        );
    }

    if (!data) {
        return null;
    }

    const { footer, contact } = data;

    return (
        <footer className="bg-emerald-dark text-white/70 border-t border-gold/10 p-6">
            <div className="container mx-auto px-4 max-w-6xl py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* ستون اول: برند و توضیح */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-white">{footer.brand}</span>
                            <span className="text-gold text-sm font-light">✦</span>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                            {footer.tagline}
                        </p>
                        <div className="flex gap-3 pt-1">
                            <a
                                href="#"
                                className="text-white/30 hover:text-gold transition-colors duration-300"
                                aria-label="اینستاگرام"
                            >
                                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-white/30 hover:text-gold transition-colors duration-300"
                                aria-label="تلگرام"
                            >
                                <FontAwesomeIcon icon={faTelegram} className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-white/30 hover:text-gold transition-colors duration-300"
                                aria-label="واتساپ"
                            >
                                <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* ستون دوم: لینک‌های سریع */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            <span className="text-gold">✦</span> لینک‌ها
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-white/40 hover:text-gold transition-colors duration-200">
                                    خانه
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-white/40 hover:text-gold transition-colors duration-200">
                                    درباره ما
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-sm text-white/40 hover:text-gold transition-colors duration-200">
                                    محصولات
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-white/40 hover:text-gold transition-colors duration-200">
                                    تماس با ما
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ستون سوم: اطلاعات تماس */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            <span className="text-gold">✦</span> تماس
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-white/40 flex items-center gap-2">
                                <FontAwesomeIcon icon={faPhone} className="text-gold text-xs w-3 h-3" />
                                <span>{contact.phone}</span>
                            </li>
                            <li className="text-white/40 flex items-center gap-2">
                                <FontAwesomeIcon icon={faMobileAlt} className="text-gold text-xs w-3 h-3" />
                                <span>{contact.mobile}</span>
                            </li>
                            <li className="text-white/40 flex items-center gap-2">
                                <FontAwesomeIcon icon={faLocationDot} className="text-gold text-xs w-3 h-3" />
                                <span className="text-xs">{contact.address}</span>
                            </li>
                        </ul>
                    </div>

                    {/* ستون چهارم: خالی یا لینک‌های مفید دیگر */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            <span className="text-gold">✦</span> اطلاعات
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-white/40">
                                <span>ساعات پاسخگویی: {contact.phoneHours}</span>
                            </li>
                            <li className="text-white/40">
                                <span>{contact.addressLabel}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* کپی‌رایت */}
            <div className="border-t border-white/5">
                <div className="container mx-auto px-4 max-w-6xl py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/30">
                    <p>{footer.copyright.replace("۱۴۰۴", currentYear.toString())}</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gold transition-colors">
                            حریم خصوصی
                        </a>
                        <a href="#" className="hover:text-gold transition-colors">
                            شرایط استفاده
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}