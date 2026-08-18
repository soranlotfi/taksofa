"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faClock,
    faLocationDot,
    faEnvelope,
    faPaperPlane,
    faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
    faWhatsapp,
    faInstagram,
    faTelegram,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

// ===== آیکون‌های سفارشی با ایموجی =====
const AparatIcon = () => <span className="text-lg">🎬</span>;
const RubikaIcon = () => <span className="text-lg">🟣</span>;

// ===== تعریف نوع داده =====
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

// ===== داده‌های پیش‌فرض =====
const defaultContactData: ContactData = {
    title: "ارتباط با تولیدی مبل تک در سنندج",
    subtitle: "همین حالا با ما تماس بگیرید یا فرم زیر را پر کنید. تیم ما در اسرع وقت پاسخگوی شماست.",
    supportTitle: "✨ پشتیبانی سریع و حرفه‌ای",
    supportDesc:
        "کارشناسان ما با بیش از ۱۵ سال تجربه در تولید مبلمان، آماده پاسخگویی به سوالات و ارائه مشاوره رایگان به شما هستند.",
    phone: "۰۹۳۶-۱۶۶-۶۴۶۵",
    phoneHours: "شنبه تا پنجشنبه، ساعت ۹ صبح تا ۶ عصر",
    address: "سنندج، میدان فیض‌آباد، سه‌راه چوب‌فروشان، ابتدای شهرک اتوبوس‌رانی، تولیدی مبل تک",
    addressLabel: "کارگاه تولیدی مبل تک | سنندج",
    mobile: "۰۹۱۰-۲۹۷-۹۵۰０",
    mobileLabel: "پشتیبانی واتساپ، تلگرام و ایتا",
    mapLat: 35.3309522,
    mapLng: 47.0139678,
    mapLocation: "سنندج، میدان فیض‌آباد، سه‌راه چوب‌فروشان",
    whatsappLink: "https://wa.me/989123456789",
    instagramLink: "https://instagram.com/mobletak",
    telegramLink: "https://t.me/mobletak",
    aparatLink: "https://aparat.com/mobletak",
    youtubeLink: "https://youtube.com/@mobletak",
    rubikaLink: "https://rubika.ir/mobletak",
    balleLink: "https://bale.ai/mobletak",
    eitaLink: "https://eitaa.com/mobletak",
    formTitle: "✉️ ارسال پیام و درخواست مشاوره",
    formNameLabel: "نام و نام خانوادگی",
    formNamePlaceholder: "مثال: علی محمدی",
    formPhoneLabel: "شماره تماس",
    formPhonePlaceholder: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
    formMessageLabel: "متن پیام (نوع مبل، ابعاد یا سوال خود را بنویسید)",
    formMessagePlaceholder:
        "لطفاً توضیح دهید که به چه نوع مبل، ابعاد یا رنگی نیاز دارید تا کارشناسان ما بهترین پیشنهاد را به شما ارائه دهند.",
    submitButton: "ارسال پیام ✦",
    successMessage: "✅ پیام شما با موفقیت ارسال شد! کارشناسان ما به زودی با شما تماس می‌گیرند.",
    errorMessage: "❌ متأسفانه خطایی در ارسال پیام رخ داد. لطفاً مجدداً تلاش کنید یا با شماره تماس بگیرید.",
};

// ===== اسکلت (Skeleton) با انیمیشن تیلویند =====
function ContactSkeleton() {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/60">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="h-10 w-48 mx-auto rounded-lg bg-gray-200 animate-pulse" />
                    <div className="h-12 w-3/4 md:w-1/2 mx-auto mt-4 rounded-lg bg-gray-200 animate-pulse" />
                    <div className="h-6 w-2/3 md:w-1/3 mx-auto mt-3 rounded-lg bg-gray-200 animate-pulse" />
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 w-full rounded-2xl bg-gray-200 animate-pulse" />
                        ))}
                    </div>
                    <div className="h-96 w-full rounded-2xl bg-gray-200 animate-pulse" />
                </div>
            </div>
        </section>
    );
}

export default function ContactSection() {
    const [data, setData] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [form, setForm] = useState({ name: "", phone: "", message: "" });
    const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
        type: null,
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    // ===== دریافت داده از سرور =====
    useEffect(() => {
        fetch("/api/settings")
            .then((res) => {
                if (!res.ok) throw new Error("خطا در دریافت اطلاعات");
                return res.json();
            })
            .then((settings) => {
                const mergedData: ContactData = {
                    ...defaultContactData,
                    ...(settings.contact || {}),
                };
                setData(mergedData);
                setLoading(false);
            })
            .catch(() => {
                setData(defaultContactData);
                setLoading(false);
            });
    }, []);

    // ===== ارسال فرم =====
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

    // ===== لینک‌های نقشه (رفع خطای TypeScript) =====
    const getMapLink = () => {
        if (!data) {
            return { geo: "#", google: "#", osm: "#", apple: "#" };
        }
        const { mapLat, mapLng } = data;
        return {
            geo: `geo:${mapLat},${mapLng}?q=${mapLat},${mapLng}`,
            google: `https://www.google.com/maps/search/?api=1&query=${mapLat},${mapLng}`,
            osm: `https://www.openstreetmap.org/?mlat=${mapLat}&mlon=${mapLng}&zoom=15`,
            apple: `http://maps.apple.com/?q=${mapLat},${mapLng}`,
        };
    };

    if (loading) return <ContactSkeleton />;
    if (!data) return null;

    const mapLinks = getMapLink();

    return (
        <section id="contact" className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50/80 via-white to-gray-50/60">
            {/* اشکال تزئینی */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                {/* ===== هدر ===== */}
                <div className="text-center mb-16">
                    <span className="inline-block text-emerald-600 font-semibold text-sm tracking-widest mb-2">✦ {data.title}</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800">در تماس باشید</h2>
                    <div className="w-16 h-1 bg-gold mx-auto rounded-full mt-3" />
                    <p className="text-gray-500 mt-4 text-base md:text-lg max-w-2xl mx-auto">{data.subtitle}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* ===== ستون اطلاعات ===== */}
                    <div className="space-y-6">
                        {/* کارت اطلاعات تماس */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 transition-all hover:shadow-2xl">
                            <h3 className="text-2xl font-bold text-emerald-800 flex items-center gap-3 mb-4">
                                <span className="text-gold">✦</span> {data.supportTitle}
                            </h3>
                            <p className="text-gray-500 mb-6">{data.supportDesc}</p>

                            <div className="space-y-4">
                                <a
                                    href={`tel:${data.phone.replace(/-/g, "")}`}
                                    className="flex items-center gap-4 group hover:bg-emerald-50/50 p-3 rounded-xl transition-colors"
                                >
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-lg group-hover:bg-emerald-200 transition">
                                        <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-emerald-800 font-medium">{data.phone}</div>
                                        <div className="text-gray-400 text-sm flex items-center gap-1">
                                            <FontAwesomeIcon icon={faClock} className="w-4 h-4" /> {data.phoneHours}
                                        </div>
                                    </div>
                                </a>

                                <a
                                    href={`tel:${data.mobile.replace(/-/g, "")}`}
                                    className="flex items-center gap-4 group hover:bg-emerald-50/50 p-3 rounded-xl transition-colors"
                                >
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-lg group-hover:bg-emerald-200 transition">
                                        <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-emerald-800 font-medium">{data.mobile}</div>
                                        <div className="text-gray-400 text-sm">{data.mobileLabel}</div>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4 p-3 rounded-xl">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-lg flex-shrink-0">
                                        <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-emerald-800 font-medium">{data.address}</div>
                                        <div className="text-gray-400 text-sm">{data.addressLabel}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* کارت شبکه‌های اجتماعی داخلی */}

                        {/* کارت شبکه‌های اجتماعی خارجی + نقشه */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
                            <h4 className="text-lg font-bold text-emerald-800 flex items-center gap-3 mb-4">
                                <span className="text-gold">✦</span> شبکه‌های اجتماعی و نقشه
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={data.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium px-4 py-2 rounded-full text-sm transition border border-green-200"
                                >
                                    <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 text-green-600" /> واتساپ
                                </a>
                                <a
                                    href={data.instagramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium px-4 py-2 rounded-full text-sm transition border border-pink-200"
                                >
                                    <FontAwesomeIcon icon={faInstagram} className="w-4 h-4 text-pink-600" /> اینستاگرام
                                </a>
                                <a
                                    href={data.telegramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm transition border border-blue-200"
                                >
                                    <FontAwesomeIcon icon={faTelegram} className="w-4 h-4 text-blue-600" /> تلگرام
                                </a>
                                <a
                                    href={data.aparatLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium px-4 py-2 rounded-full text-sm transition border border-red-200"
                                >
                                    <AparatIcon /> آپارات
                                </a>
                                <a
                                    href={data.youtubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium px-4 py-2 rounded-full text-sm transition border border-red-200"
                                >
                                    <FontAwesomeIcon icon={faYoutube} className="w-4 h-4 text-red-600" /> یوتیوب
                                </a>
                            </div>

                            {/* بخش نقشه */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-gray-500 text-sm mb-3 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faMapLocationDot} className="text-gold" /> موقعیت کارگاه
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href={mapLinks.geo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-full text-sm transition shadow-sm hover:shadow-md"
                                    >
                                        <FontAwesomeIcon icon={faMapLocationDot} className="w-4 h-4" />
                                        باز کردن در نقشه (پیش‌فرض دستگاه)
                                    </a>
                                    <a
                                        href={mapLinks.google}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-full text-sm transition shadow-sm hover:shadow-md"
                                    >
                                        <span>🗺️</span> گوگل مپ
                                    </a>
                                    <a
                                        href={mapLinks.osm}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-2.5 rounded-full text-sm transition shadow-sm hover:shadow-md"
                                    >
                                        <span>🌍</span> OpenStreetMap
                                    </a>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    لینک‌ها در اپلیکیشن‌های نقشه (مانند نشان، گوگل مپ، و...) باز می‌شوند.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
                            <h4 className="text-lg font-bold text-emerald-800 flex items-center gap-3 mb-4">
                                <span className="text-gold">✦</span> شبکه‌های اجتماعی داخلی
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={data.rubikaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium px-4 py-2 rounded-full text-sm transition border border-purple-200"
                                >
                                    <RubikaIcon /> روبیکا
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

                    {/* ===== ستون فرم ===== */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
                        <h4 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-gold" />
                            {data.formTitle}
                        </h4>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{data.formNameLabel}</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition"
                                    placeholder={data.formNamePlaceholder}
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{data.formPhoneLabel}</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition"
                                    placeholder={data.formPhonePlaceholder}
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{data.formMessageLabel}</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition h-32 resize-none"
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
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        در حال ارسال...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
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