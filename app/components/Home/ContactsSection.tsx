"use client";

import { useState } from "react";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", phone: "", message: "" });
    const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
        type: null,
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: "" });

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus({ type: "success", message: "✅ پیام شما با موفقیت ارسال شد!" });
                setForm({ name: "", phone: "", message: "" });
            } else {
                setStatus({ type: "error", message: "❌ خطا در ارسال پیام، لطفاً دوباره تلاش کنید." });
            }
        } catch {
            setStatus({ type: "error", message: "❌ خطا در ارسال پیام، لطفاً دوباره تلاش کنید." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-dark inline-block relative">
                        ارتباط با ما
                        <span className="absolute -bottom-3 right-0 w-16 h-1 bg-gold rounded-full"></span>
                    </h2>
                    <p className="text-gray-500 mt-6 text-lg">همین حالا با ما تماس بگیرید یا فرم را پر کنید</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* اطلاعات تماس */}
                    <div>
                        <h3 className="text-2xl font-bold text-emerald-dark">✨ پشتیبانی سریع</h3>
                        <p className="text-gray-600 mt-2 mb-6">کارشناسان ما در اسرع وقت پاسخگوی شما هستند.</p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                                <span className="w-12 h-12 bg-gold-soft rounded-full flex items-center justify-center text-gold font-bold text-lg">📞</span>
                                <div>
                                    <div className="font-medium">۰۲۱-۱۲۳۴۵۶۷۸</div>
                                    <div className="text-sm text-gray-400">شنبه تا پنجشنبه ۹ تا ۱۸</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                                <span className="w-12 h-12 bg-gold-soft rounded-full flex items-center justify-center text-gold font-bold text-lg">📍</span>
                                <div>
                                    <div className="font-medium">تهران، جاده قدیم کرج، شهرک صنعتی، خیابان تولید، پلاک ۱۲</div>
                                    <div className="text-sm text-gray-400">کارگاه تولیدی مبل تک</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-12 bg-gold-soft rounded-full flex items-center justify-center text-gold font-bold text-lg">📱</span>
                                <div>
                                    <div className="font-medium">۰۹۱۲-۳۴۵۶۷۸۹</div>
                                    <div className="text-sm text-gray-400">پشتیبانی واتساپ و تلگرام</div>
                                </div>
                            </div>
                        </div>

                        <a
                            href="#"
                            className="inline-flex items-center gap-3 bg-green-500 text-white font-bold px-8 py-4 rounded-full mt-6 hover:scale-105 transition shadow-lg shadow-green-500/30"
                        >
                            <span className="text-2xl">💬</span> گفتگو در واتساپ
                        </a>
                    </div>

                    {/* فرم تماس */}
                    <div className="bg-cream p-8 rounded-3xl shadow-xl">
                        <h4 className="text-xl font-bold text-emerald-dark mb-6">پیام خود را بنویسید</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-gold focus:outline-none focus:shadow-lg focus:shadow-gold/10 transition"
                                    placeholder="مثال: علی محمدی"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">شماره تماس</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-gold focus:outline-none focus:shadow-lg focus:shadow-gold/10 transition"
                                    placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">متن پیام</label>
                                <textarea
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-gold focus:outline-none focus:shadow-lg focus:shadow-gold/10 transition h-32 resize-none"
                                    placeholder="نوع مبل، ابعاد موردنظر یا سوال خود را بنویسید..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required
                                />
                            </div>
                            {status.message && (
                                <div className={`mb-4 p-3 rounded-xl text-center ${status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {status.message}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-emerald-dark text-white font-bold py-4 rounded-full hover:bg-emerald-medium transition shadow-lg shadow-emerald-dark/30 hover:shadow-emerald-dark/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "⏳ در حال ارسال..." : "ارسال پیام ✦"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}