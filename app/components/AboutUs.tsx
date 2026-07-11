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
                            <strong>تولیدی مبل تک</strong> از سال ۱۳۸۵ با هدف احیای هنر نجاری و تولید مبلمانی با دوام و زیبا
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
                    <div className="bg-gradient-to-br from-emerald-light to-emerald-dark rounded-3xl h-72 md:h-96 flex items-center justify-center shadow-2xl relative overflow-hidden">
                        <span className="text-white/10 text-8xl font-black tracking-widest">مبل تک</span>
                        <span className="absolute bottom-6 left-6 text-white/60 text-sm bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm">
              عکس کارگاه
            </span>
                    </div>
                </div>
            </div>
        </section>
    );
}