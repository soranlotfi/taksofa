export default function AboutSection() {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-dark inline-block relative">
                        درباره تولیدی مبل تک
                        <span className="absolute -bottom-3 right-0 w-16 h-1 bg-gold rounded-full"></span>
                    </h2>
                    <p className="text-gray-500 mt-6 text-lg">کیفیت را با چشمانتان لمس کنید</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            <strong>تولیدی مبل تک</strong> از سال ۱۳۸۵ با هدف احیای هنر نجاری و تولید مبلمانی با دوام و
                            زیبا
                            پا به عرصه گذاشت. نام «تک» نماد تعهد ما به <strong>تک‌تک محصولات</strong> و رضایت
                            <strong>تک‌تک مشتریان</strong> است.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            ما در کارگاه خود از بهترین چوب‌های روسی و گردو، اسفنج‌های با دانسیته بالا و پارچه‌های
                            درجه یک ایتالیایی و ترکیه‌ای استفاده می‌کنیم.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-emerald-dark font-medium">
                                <span className="text-gold text-xl">✦</span> ضمانت ۵ ساله اسکلت چوبی
                            </li>
                            <li className="flex items-center gap-3 text-emerald-dark font-medium">
                                <span className="text-gold text-xl">✦</span> استفاده از چسب‌های صنعتی و بی‌بو
                            </li>
                            <li className="flex items-center gap-3 text-emerald-dark font-medium">
                                <span className="text-gold text-xl">✦</span> امکان سفارش در ابعاد و رنگ‌های دلخواه
                            </li>
                            <li className="flex items-center gap-3 text-emerald-dark font-medium">
                                <span className="text-gold text-xl">✦</span> ارسال به سراسر ایران
                            </li>
                        </ul>
                    </div>
                    <div className="relative rounded-3xl h-72 md:h-96 shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-light to-emerald-dark">
                        {/* تصویر با افکت محو (overlay) */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: "url('/images/IMG_20260712_222438_105.JPG')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                opacity: 0.6, // شفافیت تصویر برای دیده شدن گرادیان در پشت
                            }}
                        />

                        {/* لایه تیره برای خوانایی بهتر */}
                        <div className="absolute inset-0 bg-emerald-dark/20" />

                        <div className="relative z-10 w-full h-full flex items-center justify-center">
    <span className="text-white/10 text-8xl font-black tracking-widest">
      مبل تک
    </span>
                            <span className="absolute bottom-6 left-6 text-white/60 text-sm bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm">
      عکس کارگاه
    </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}