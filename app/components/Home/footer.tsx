import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-emerald-dark text-white/70 border-t border-gold/10">
            {/* بخش اصلی فوتر */}
            <div className="container mx-auto px-4 max-w-6xl py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* ستون اول: برند و توضیح */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-white">مبل تک</span>
                            <span className="text-gold text-sm font-light">✦</span>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                            تولیدی مبل تک با بیش از یک دهه تجربه در تولید مبلمان کلاسیک و مدرن.
                        </p>
                        <div className="flex gap-3 pt-1">
                            <a href="#" className="text-white/30 hover:text-gold transition-colors duration-300" aria-label="اینستاگرام">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
                            </a>
                            <a href="#" className="text-white/30 hover:text-gold transition-colors duration-300" aria-label="تلگرام">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                            </a>
                            <a href="#" className="text-white/30 hover:text-gold transition-colors duration-300" aria-label="واتساپ">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* ستون دوم: لینک‌های سریع */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            <span className="text-gold">✦</span> لینک‌ها
                        </h4>
                        <ul className="space-y-2">
                            <li><Link href="/public" className="text-sm text-white/40 hover:text-gold transition-colors duration-200">خانه</Link></li>
                            <li><Link href="/about" className="text-sm text-white/40 hover:text-gold transition-colors duration-200">درباره ما</Link></li>
                            <li><Link href="/products" className="text-sm text-white/40 hover:text-gold transition-colors duration-200">محصولات</Link></li>
                            <li><Link href="/contact" className="text-sm text-white/40 hover:text-gold transition-colors duration-200">تماس با ما</Link></li>
                        </ul>
                    </div>

                    {/* ستون سوم: اطلاعات تماس */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            <span className="text-gold">✦</span> تماس
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-white/40 flex items-center gap-2">
                                <span className="text-gold text-xs">📞</span>
                                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
                            </li>
                            <li className="text-white/40 flex items-center gap-2">
                                <span className="text-gold text-xs">📱</span>
                                <span>۰۹۱۲-۳۴۵۶۷۸۹</span>
                            </li>
                            <li className="text-white/40 flex items-center gap-2">
                                <span className="text-gold text-xs">📍</span>
                                <span className="text-xs">تهران، شهرک صنعتی</span>
                            </li>
                        </ul>
                    </div>

                    {/* ستون چهارم: خبرنامه */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            <span className="text-gold">✦</span> خبرنامه
                        </h4>
                        <p className="text-sm text-white/30 mb-3">جدیدترین محصولات و تخفیف‌ها</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="ایمیل شما"
                                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-gold focus:outline-none transition text-sm"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2.5 rounded-xl bg-gold text-emerald-dark font-bold hover:bg-gold-light transition text-sm shadow-lg shadow-gold/20"
                            >
                                عضویت
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* خط جداکننده و کپی‌رایت */}
            <div className="border-t border-white/5">
                <div className="container mx-auto px-4 max-w-6xl py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/30">
                    <p>© {currentYear} تولیدی مبل تک. تمامی حقوق محفوظ است.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gold transition-colors">حریم خصوصی</a>
                        <a href="#" className="hover:text-gold transition-colors">شرایط استفاده</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}