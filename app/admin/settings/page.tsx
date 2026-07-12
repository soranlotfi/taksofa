"use client";

import { useState, useEffect } from "react";

interface Settings {
    hero: {
        badge: string;
        title: string;
        highlight: string;
        subtitle: string;
        btnPrimary: string;
        btnSecondary: string;
    };
    about: {
        title: string;
        subtitle: string;
        description1: string;
        description2: string;
        features: string[];
        imagePlaceholder: string;
    };
    contact: {
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
        whatsappText: string;
        formTitle: string;
        formName: string;
        formNamePlaceholder: string;
        formPhone: string;
        formPhonePlaceholder: string;
        formMessage: string;
        formMessagePlaceholder: string;
        submitButton: string;
        successMessage: string;
        errorMessage: string;
    };
    footer: {
        brand: string;
        tagline: string;
        copyright: string;
    };
    seo: {
        title: string;
        description: string;
    };
}

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();
            setSettings(data);
        } catch (error) {
            setMessage({ type: "error", text: "خطا در دریافت تنظیمات" });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (section: keyof Settings, field: string, value: any) => {
        if (!settings) return;
        setSettings({
            ...settings,
            [section]: {
                ...settings[section],
                [field]: value,
            },
        });
    };

    const handleArrayChange = (section: keyof Settings, field: string, index: number, value: string) => {
        if (!settings) return;
        const currentArray = (settings[section] as any)[field] as string[];
        const newArray = [...currentArray];
        newArray[index] = value;
        setSettings({
            ...settings,
            [section]: {
                ...settings[section],
                [field]: newArray,
            },
        });
    };

    const addArrayItem = (section: keyof Settings, field: string) => {
        if (!settings) return;
        const currentArray = (settings[section] as any)[field] as string[];
        setSettings({
            ...settings,
            [section]: {
                ...settings[section],
                [field]: [...currentArray, ""],
            },
        });
    };

    const removeArrayItem = (section: keyof Settings, field: string, index: number) => {
        if (!settings) return;
        const currentArray = (settings[section] as any)[field] as string[];
        const newArray = currentArray.filter((_, i) => i !== index);
        setSettings({
            ...settings,
            [section]: {
                ...settings[section],
                [field]: newArray,
            },
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;

        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "✅ تنظیمات با موفقیت ذخیره شد!" });
            } else {
                setMessage({ type: "error", text: "❌ خطا در ذخیره تنظیمات" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "❌ خطا در ارتباط با سرور" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 mt-4">در حال بارگذاری...</p>
                </div>
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <p className="text-red-500">خطا در دریافت تنظیمات</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-emerald-dark">⚙️ مدیریت تنظیمات سایت</h1>
                    <a
                        href="/admin"
                        className="bg-emerald-dark text-white px-4 py-2 rounded-full hover:bg-emerald-medium transition text-sm"
                    >
                        ← بازگشت به مدیریت محصولات
                    </a>
                </div>

                {message && (
                    <div
                        className={`p-4 rounded-2xl mb-6 text-center ${
                            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* ===== بخش هیرو ===== */}
                    <SectionCard title="🖼️ بخش هیرو (صفحه اصلی)">
                        <TextField
                            label="نشان‌گر (Badge)"
                            value={settings.hero.badge}
                            onChange={(v) => handleChange("hero", "badge", v)}
                        />
                        <TextField
                            label="تیتر اصلی"
                            value={settings.hero.title}
                            onChange={(v) => handleChange("hero", "title", v)}
                        />
                        <TextField
                            label="کلمه هایلایت (طلایی)"
                            value={settings.hero.highlight}
                            onChange={(v) => handleChange("hero", "highlight", v)}
                        />
                        <TextAreaField
                            label="زیرنویس"
                            value={settings.hero.subtitle}
                            onChange={(v) => handleChange("hero", "subtitle", v)}
                        />
                        <TextField
                            label="متن دکمه اصلی"
                            value={settings.hero.btnPrimary}
                            onChange={(v) => handleChange("hero", "btnPrimary", v)}
                        />
                        <TextField
                            label="متن دکمه دوم"
                            value={settings.hero.btnSecondary}
                            onChange={(v) => handleChange("hero", "btnSecondary", v)}
                        />
                    </SectionCard>

                    {/* ===== بخش درباره ما ===== */}
                    <SectionCard title="📖 بخش درباره ما">
                        <TextField
                            label="عنوان"
                            value={settings.about.title}
                            onChange={(v) => handleChange("about", "title", v)}
                        />
                        <TextField
                            label="زیرعنوان"
                            value={settings.about.subtitle}
                            onChange={(v) => handleChange("about", "subtitle", v)}
                        />
                        <TextAreaField
                            label="توضیح اول"
                            value={settings.about.description1}
                            onChange={(v) => handleChange("about", "description1", v)}
                            rows={3}
                        />
                        <TextAreaField
                            label="توضیح دوم"
                            value={settings.about.description2}
                            onChange={(v) => handleChange("about", "description2", v)}
                            rows={3}
                        />
                        <TextField
                            label="متن جایگزین تصویر"
                            value={settings.about.imagePlaceholder}
                            onChange={(v) => handleChange("about", "imagePlaceholder", v)}
                        />

                        <div className="mt-4">
                            <label className="block text-sm font-bold text-gray-700 mb-2">امکانات (ویژگی‌ها)</label>
                            {settings.about.features.map((feature, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-gold focus:outline-none"
                                        value={feature}
                                        onChange={(e) => handleArrayChange("about", "features", index, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem("about", "features", index)}
                                        className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem("about", "features")}
                                className="text-gold font-bold hover:text-gold-light transition"
                            >
                                + افزودن ویژگی جدید
                            </button>
                        </div>
                    </SectionCard>

                    {/* ===== بخش تماس ===== */}
                    <SectionCard title="📞 بخش تماس">
                        <TextField
                            label="عنوان"
                            value={settings.contact.title}
                            onChange={(v) => handleChange("contact", "title", v)}
                        />
                        <TextField
                            label="زیرعنوان"
                            value={settings.contact.subtitle}
                            onChange={(v) => handleChange("contact", "subtitle", v)}
                        />
                        <TextField
                            label="عنوان پشتیبانی"
                            value={settings.contact.supportTitle}
                            onChange={(v) => handleChange("contact", "supportTitle", v)}
                        />
                        <TextField
                            label="توضیح پشتیبانی"
                            value={settings.contact.supportDesc}
                            onChange={(v) => handleChange("contact", "supportDesc", v)}
                        />
                        <TextField
                            label="شماره تلفن"
                            value={settings.contact.phone}
                            onChange={(v) => handleChange("contact", "phone", v)}
                        />
                        <TextField
                            label="ساعات پاسخگویی"
                            value={settings.contact.phoneHours}
                            onChange={(v) => handleChange("contact", "phoneHours", v)}
                        />
                        <TextField
                            label="آدرس"
                            value={settings.contact.address}
                            onChange={(v) => handleChange("contact", "address", v)}
                        />
                        <TextField
                            label="برچسب آدرس"
                            value={settings.contact.addressLabel}
                            onChange={(v) => handleChange("contact", "addressLabel", v)}
                        />
                        <TextField
                            label="شماره موبایل"
                            value={settings.contact.mobile}
                            onChange={(v) => handleChange("contact", "mobile", v)}
                        />
                        <TextField
                            label="برچسب موبایل"
                            value={settings.contact.mobileLabel}
                            onChange={(v) => handleChange("contact", "mobileLabel", v)}
                        />
                        <TextField
                            label="متن دکمه واتساپ"
                            value={settings.contact.whatsappText}
                            onChange={(v) => handleChange("contact", "whatsappText", v)}
                        />
                        <TextField
                            label="عنوان فرم"
                            value={settings.contact.formTitle}
                            onChange={(v) => handleChange("contact", "formTitle", v)}
                        />
                        <TextField
                            label="برچسب نام"
                            value={settings.contact.formName}
                            onChange={(v) => handleChange("contact", "formName", v)}
                        />
                        <TextField
                            label="متن راهنمای نام"
                            value={settings.contact.formNamePlaceholder}
                            onChange={(v) => handleChange("contact", "formNamePlaceholder", v)}
                        />
                        <TextField
                            label="برچسب تلفن"
                            value={settings.contact.formPhone}
                            onChange={(v) => handleChange("contact", "formPhone", v)}
                        />
                        <TextField
                            label="متن راهنمای تلفن"
                            value={settings.contact.formPhonePlaceholder}
                            onChange={(v) => handleChange("contact", "formPhonePlaceholder", v)}
                        />
                        <TextField
                            label="برچسب پیام"
                            value={settings.contact.formMessage}
                            onChange={(v) => handleChange("contact", "formMessage", v)}
                        />
                        <TextField
                            label="متن راهنمای پیام"
                            value={settings.contact.formMessagePlaceholder}
                            onChange={(v) => handleChange("contact", "formMessagePlaceholder", v)}
                        />
                        <TextField
                            label="متن دکمه ارسال"
                            value={settings.contact.submitButton}
                            onChange={(v) => handleChange("contact", "submitButton", v)}
                        />
                        <TextField
                            label="پیام موفقیت"
                            value={settings.contact.successMessage}
                            onChange={(v) => handleChange("contact", "successMessage", v)}
                        />
                        <TextField
                            label="پیام خطا"
                            value={settings.contact.errorMessage}
                            onChange={(v) => handleChange("contact", "errorMessage", v)}
                        />
                    </SectionCard>

                    {/* ===== بخش فوتر ===== */}
                    <SectionCard title="🦶 بخش فوتر">
                        <TextField
                            label="نام برند"
                            value={settings.footer.brand}
                            onChange={(v) => handleChange("footer", "brand", v)}
                        />
                        <TextField
                            label="شعار"
                            value={settings.footer.tagline}
                            onChange={(v) => handleChange("footer", "tagline", v)}
                        />
                        <TextField
                            label="متن کپی‌رایت"
                            value={settings.footer.copyright}
                            onChange={(v) => handleChange("footer", "copyright", v)}
                        />
                    </SectionCard>

                    {/* ===== بخش SEO ===== */}
                    <SectionCard title="🔍 بخش SEO (سئو)">
                        <TextField
                            label="عنوان صفحه"
                            value={settings.seo.title}
                            onChange={(v) => handleChange("seo", "title", v)}
                        />
                        <TextAreaField
                            label="توضیحات (meta description)"
                            value={settings.seo.description}
                            onChange={(v) => handleChange("seo", "description", v)}
                            rows={3}
                        />
                    </SectionCard>

                    {/* دکمه ذخیره */}
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-emerald-dark text-white font-bold px-12 py-4 rounded-full hover:bg-emerald-medium transition shadow-lg shadow-emerald-dark/30 hover:shadow-emerald-dark/50 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                        >
                            {saving ? "⏳ در حال ذخیره..." : "💾 ذخیره تنظیمات"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ===== کامپوننت‌های کمکی =====
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-emerald-dark mb-4 border-b border-gray-100 pb-3">{title}</h2>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

function TextField({
                       label,
                       value,
                       onChange,
                   }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none transition"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

function TextAreaField({
                           label,
                           value,
                           onChange,
                           rows = 2,
                       }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none transition resize-none"
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}