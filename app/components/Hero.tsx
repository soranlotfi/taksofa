import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
                 style={{
                     backgroundImage: "url('https://tse4.mm.bing.net/th/id/OIP.eCuz4btqqZoNHop0OAHtEAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3')",
                 }}
        >
            {/* لایه تیره */}
            <div className="absolute inset-0 bg-emerald-dark/45 z-10" />

            {/* محتوا */}
            <div className="relative z-20 text-center max-w-4xl px-4 pt-28 pb-12 md:pt-36 md:pb-20">
        <span className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 text-gold-light px-4 py-1.5 rounded-full text-xs md:text-sm tracking-wide mb-4 md:mb-6">
          ✦ تولیدی معتبر با بیش از یک دهه تجربه
        </span>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight drop-shadow-2xl">
                    <span className="bg-gradient-to-l from-gold to-gold-light bg-clip-text text-transparent">مبل‌هایی</span> برای<br />
                    ماندگاری در خاطره
                </h1>
                <div className="w-20 h-1 bg-gold mx-auto rounded-full my-4 md:my-6" />
                <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-8 font-light drop-shadow">
                    اصالت سبز زمردی، شکوه طلایی. هر قطعه با عشق و ظرافت در کارگاه تک متولد می‌شود.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="#products" className="bg-gold text-emerald-dark font-bold px-8 py-3.5 md:px-10 md:py-4 rounded-full shadow-xl shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-1 transition-all text-sm md:text-base">
                        مشاهده محصولات
                    </Link>
                    <Link href="#about" className="border border-white/20 text-white font-semibold px-8 py-3.5 md:px-10 md:py-4 rounded-full hover:border-gold hover:bg-gold/10 backdrop-blur-sm hover:-translate-y-1 transition-all text-sm md:text-base">
                        داستان ما
                    </Link>
                </div>
            </div>
        </section>
    );
}