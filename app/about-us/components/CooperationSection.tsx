import Link from "next/link";

export default function CooperationSection() {
    return(
        <section className="py-16 md:py-20 bg-emerald-50/50">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800">
                    آماده همکاری با <span className="text-gold">شما</span> هستیم
                </h2>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    برای مشاوره، سفارش یا هر سوال دیگری، تیم مبل تک در کنار شماست.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Link
                        href="/contact-us"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full transition shadow-md"
                    >
                        تماس با ما
                    </Link>
                    <Link
                        href="/products"
                        className="bg-gold hover:bg-gold-light text-emerald-dark font-semibold px-8 py-3 rounded-full transition shadow-md"
                    >
                        مشاهده محصولات
                    </Link>
                </div>
            </div>
        </section>
    )
}