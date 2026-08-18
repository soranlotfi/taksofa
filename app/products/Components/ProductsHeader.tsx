export default function ProductsHeader() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 py-10">
            <div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-dark inline-block relative">
                    محصولات ویژه
                    <span className="absolute -bottom-3 right-0 w-16 h-1 bg-gold rounded-full" />
                </h2>
                <p className="text-gray-500 mt-6 text-lg">
                    مجموعه‌ای از شیک‌ترین مدل‌های مبل
                </p>
            </div>
            <span className="bg-white text-gold font-bold px-5 py-2 rounded-full shadow-md text-sm mt-4 md:mt-0">
        ✦ استعلام قیمت و سفارش
      </span>
        </div>
    );
}