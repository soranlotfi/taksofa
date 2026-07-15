"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faMobileAlt,
    faLocationDot,
    faEnvelope,
    faPaperPlane,
    faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import {
    faWhatsapp,
    faInstagram,
    faTelegram,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

interface ContactData {
    title: string;
    subtitle: string;
    supportTitle: string;
    supportDesc: string;
    phone: string;
    phoneHours: string;
    address: string;
    addressLabel: string;
    mobile: string;
    mobileLabel: string;
    mapLat: number;
    mapLng: number;
    mapLocation: string;
    whatsappLink: string;
    instagramLink: string;
    telegramLink: string;
    aparatLink: string;
    youtubeLink: string;
    rubikaLink: string;
    balleLink: string;
    eitaLink: string;
    formTitle: string;
    formNameLabel: string;
    formNamePlaceholder: string;
    formPhoneLabel: string;
    formPhonePlaceholder: string;
    formMessageLabel: string;
    formMessagePlaceholder: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
}

export default function ContactSection() {
    const [data, setData] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: "", phone: "", message: "" });
    const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
        type: null,
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((settings) => {
                setData(settings.contact);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus({ type: null, message: "" });

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus({ type: "success", message: data?.successMessage || "✅ پیام با موفقیت ارسال شد!" });
                setForm({ name: "", phone: "", message: "" });
            } else {
                setStatus({ type: "error", message: data?.errorMessage || "❌ خطا در ارسال پیام" });
            }
        } catch {
            setStatus({ type: "error", message: data?.errorMessage || "❌ خطا در ارسال پیام" });
        } finally {
            setSubmitting(false);
        }
    };

    const openGoogleMaps = () => {
        if (!data) return;
        const url = `https://www.google.com/maps?q=${data.mapLat},${data.mapLng}`;
        window.open(url, "_blank");
    };

    const shareLocation = () => {
        if (!data) return;
        const url = `https://www.google.com/maps?q=${data.mapLat},${data.mapLng}`;
        if (navigator.share) {
            navigator.share({
                title: "موقعیت تولیدی مبل تک",
                text: data.address,
                url: url,
            }).catch(() => {});
        } else {
            navigator.clipboard?.writeText(url).then(() => {
                alert("لینک نقشه کپی شد!");
            });
        }
    };

    if (loading) {
        return (
            <section className="py-20 bg-gray-50 text-center">
                <p className="text-gray-500">در حال بارگذاری...</p>
            </section>
        );
    }

    if (!data) {
        return (
            <section className="py-20 bg-gray-50 text-center">
                <p className="text-red-500">خطا در دریافت اطلاعات</p>
            </section>
        );
    }

    return (
        <section className="py-12 mt-10" id="contact">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                {/* عنوان بخش */}
                <div className="text-center mb-12 md:mb-16" style={{paddingTop: "2rem"}}>
          <span className="inline-block text-emerald-600 font-semibold text-sm tracking-widest mb-2">
            ✦ {data.title}
          </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800">
                        در تماس باشید
                    </h2>
                    <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mt-3" />
                    <p className="text-gray-500 text-base md:text-lg mt-4 max-w-2xl mx-auto">
                        {data.subtitle}
                    </p>
                </div>

                {/* محتوای اصلی */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">

                    {/* ===== سمت راست (اطلاعات تماس) ===== */}
                    <div className="space-y-6">

                        {/* کارت اطلاعات تماس */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2 mb-1">
                                <span className="text-emerald-500">✦</span> {data.supportTitle}
                            </h3>
                            <p className="text-gray-400 text-sm mb-5">{data.supportDesc}</p>

                            <div className="space-y-4">
                                <a
                                    href={`tel:${data.phone.replace(/-/g, "")}`}
                                    className="flex items-center gap-4 group hover:bg-emerald-50/50 p-2 rounded-xl transition-colors"
                                >
                  <span className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-base flex-shrink-0 group-hover:bg-emerald-200 transition">
                    <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                  </span>
                                    <div>
                                        <div className="text-emerald-800 font-medium">{data.phone}</div>
                                        <div className="text-gray-400 text-sm">{data.phoneHours}</div>
                                    </div>
                                </a>

                                <a
                                    href={`tel:${data.mobile.replace(/-/g, "")}`}
                                    className="flex items-center gap-4 group hover:bg-emerald-50/50 p-2 rounded-xl transition-colors"
                                >
                  <span className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-base flex-shrink-0 group-hover:bg-emerald-200 transition">
                    <FontAwesomeIcon icon={faMobileAlt} className="w-4 h-4" />
                  </span>
                                    <div>
                                        <div className="text-emerald-800 font-medium">{data.mobile}</div>
                                        <div className="text-gray-400 text-sm">{data.mobileLabel}</div>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-2 rounded-xl">
                  <span className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-base flex-shrink-0">
                    <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
                  </span>
                                    <div>
                                        <div className="text-emerald-800 font-medium">{data.address}</div>
                                        <div className="text-gray-400 text-sm">{data.addressLabel}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* کارت شبکه‌های اجتماعی خارجی + نقشه */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2 mb-4">
                                <span className="text-emerald-500">✦</span> شبکه‌های اجتماعی و نقشه
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={data.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium px-4 py-2 rounded-full text-sm transition border border-green-200"
                                >
                                    <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 text-green-600" />
                                    واتساپ
                                </a>
                                <a
                                    href={data.instagramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium px-4 py-2 rounded-full text-sm transition border border-pink-200"
                                >
                                    <FontAwesomeIcon icon={faInstagram} className="w-4 h-4 text-pink-600" />
                                    اینستاگرام
                                </a>
                                <a
                                    href={data.telegramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm transition border border-blue-200"
                                >
                                    <FontAwesomeIcon icon={faTelegram} className="w-4 h-4 text-blue-600" />
                                    تلگرام
                                </a>
                                <a
                                    href={data.aparatLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium px-4 py-2 rounded-full text-sm transition border border-red-200"
                                >
                                    <span>🎬</span> آپارات
                                </a>
                                <a
                                    href={data.youtubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium px-4 py-2 rounded-full text-sm transition border border-red-200"
                                >
                                    <FontAwesomeIcon icon={faYoutube} className="w-4 h-4 text-red-600" />
                                    یوتیوب
                                </a>
                            </div>

                            <div className="mt-6 pt-5 border-t border-gray-100">
                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={openGoogleMaps}
                                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-dark hover:bg-red-400 text-white font-medium px-5 py-2.5 rounded-full text-sm transition shadow-sm hover:shadow-md active:scale-95"
                                    >
                                        <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
                                        موقعیت کارگاه
                                    </button>
                                    <button
                                        onClick={shareLocation}
                                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-emerald-dark font-medium px-5 py-2.5 rounded-full text-sm transition shadow-sm hover:shadow-md active:scale-95"
                                    >
                                        <FontAwesomeIcon icon={faShareNodes} className="w-4 h-4" />
                                        اشتراک‌گذاری
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* کارت شبکه‌های اجتماعی داخلی */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2 mb-4">
                                <span className="text-emerald-500">✦</span> شبکه‌های اجتماعی داخلی
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={data.rubikaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium px-4 py-2 rounded-full text-sm transition border border-purple-200"
                                >
                                    <span>🟣</span> روبیکا
                                </a>
                                <a
                                    href={data.balleLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm transition border border-blue-200"
                                >
                                    <span>🔵</span> بله
                                </a>
                                <a
                                    href={data.eitaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium px-4 py-2 rounded-full text-sm transition border border-green-200"
                                >
                                    <span>🟢</span> ایتا
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* ===== سمت چپ (فرم تماس) ===== */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h4 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-emerald-500 w-5 h-5" />
                            {data.formTitle}
                        </h4>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {data.formNameLabel}
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none transition text-gray-800 placeholder:text-gray-400"
                                    placeholder={data.formNamePlaceholder}
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {data.formPhoneLabel}
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none transition text-gray-800 placeholder:text-gray-400"
                                    placeholder={data.formPhonePlaceholder}
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {data.formMessageLabel}
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none transition text-gray-800 placeholder:text-gray-400 h-32 resize-none"
                                    placeholder={data.formMessagePlaceholder}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required
                                />
                            </div>

                            {status.message && (
                                <div
                                    className={`p-4 rounded-xl text-center text-sm ${
                                        status.type === "success"
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                            : "bg-red-50 text-red-700 border border-red-200"
                                    }`}
                                >
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        در حال ارسال...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                                        {data.submitButton}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}