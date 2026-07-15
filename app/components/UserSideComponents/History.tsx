export default function  History(){
    return (
        <section className="py-20 md:py-28 overflow-hidden relative bg-gradient-to-b from-white to-emerald-50/30">
            {/* اشکال تزئینی پس‌زمینه */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                {/* هدر بخش */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-emerald-100/50 backdrop-blur-sm border border-emerald-200/30 rounded-full px-5 py-2 mb-4">
                        <span className="text-emerald-600 text-xs">✦</span>
                        <span className="text-emerald-600/70 text-xs font-medium tracking-widest">تاریخچه ما</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mt-2">
                        مسیر <span className="bg-gradient-to-l from-gold to-gold-light bg-clip-text text-transparent">افتخار</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mt-4" />
                    <p className="text-gray-500 mt-4 text-base max-w-2xl mx-auto">
                        از یک کارگاه کوچک تا یکی از معتبرترین تولیدکنندگان مبلمان ایران
                    </p>
                </div>

                {/* تایم‌لاین */}
                <div className="relative">
                    {/* خط عمودی تایم‌لاین */}
                    <div className="absolute right-1/2 translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent hidden md:block" />

                    {/* نقطه‌های عطف */}
                    <div className="space-y-12 md:space-y-16">
                        {[
                            { year: "۱۳۸۵", title: "آغاز راه", desc: "تولیدی مبل تک با یک کارگاه کوچک و ۵ نفر نیرو در تهران شروع به کار کرد.", icon: "🚀" },
                            { year: "۱۳۹۰", title: "گسترش کارگاه", desc: "با افزایش مشتریان، کارگاه را توسعه دادیم و تعداد نیروها را به ۱۵ نفر رساندیم.", icon: "🏗️" },
                            { year: "۱۳۹۵", title: "ورود به بازارهای جدید", desc: "محصولات خود را به شهرهای دیگر ایران ارسال کردیم و برند مبل تک شناخته شد.", icon: "📍" },
                            { year: "۱۴۰۰", title: "تولید انبوه و کیفیت", desc: "با به‌روزرسانی ماشین‌آلات و استفاده از مواد اولیه درجه یک، کیفیت محصولات را به سطح جدیدی رساندیم.", icon: "✨" },
                            { year: "۱۴۰۴", title: "جایگاه برند اول", desc: "امروز مبل تک به عنوان یکی از برندهای برتر مبلمان در ایران شناخته می‌شود و به بیش از ۳۰ شهر ارسال دارد.", icon: "🏆" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                            >
                                {/* نقطه روی تایم‌لاین */}
                                <div className="absolute right-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-white shadow-lg shadow-gold/20 hidden md:block z-10" />

                                {/* کارت محتوا */}
                                <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gold/30">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-3xl md:text-4xl">{item.icon}</span>
                                            <div>
                                                <span className="text-gold font-black text-xl md:text-2xl">{item.year}</span>
                                                <span className="text-emerald-800 font-bold text-lg md:text-xl block">{item.title}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                            {item.desc}
                                        </p>
                                        {/* خط تزئینی در هاور */}
                                        <div className="mt-4 w-12 h-0.5 bg-gold/30 rounded-full transition-all duration-500 group-hover:w-20" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* پایین بخش */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 text-emerald-600/30 text-xs tracking-widest">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent to-emerald-300/30" />
                        <span>✦ از گذشته تا امروز ✦</span>
                        <span className="w-8 h-px bg-gradient-to-l from-transparent to-emerald-300/30" />
                    </div>
                </div>
            </div>
        </section>
    )
}