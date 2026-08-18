"use client";

import { useState } from "react";
import ProductsModal from "@/app/products/Components/ProductsModal";

// ===== تعریف نوع محصول =====
interface Product {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    dimensions?: string;
    woodType?: string;
    fabric?: string;
    price: number;
    comparePrice?: number | null;
    isFeatured: boolean;
    isActive: boolean;
    images: string[];
}

// ===== تابع تبدیل اعداد به فارسی =====
function toPersianDigits(num: string | number): string {
    const persianDigits: { [key: string]: string } = {
        "0": "۰",
        "1": "۱",
        "2": "۲",
        "3": "۳",
        "4": "۴",
        "5": "۵",
        "6": "۶",
        "7": "۷",
        "8": "۸",
        "9": "۹",
    };
    return String(num).replace(/\d/g, (d) => persianDigits[d] || d);
}

// ===== Props کامپوننت =====
interface ProductCardProps {
    product: Product;               // محصول فعلی
    allProducts?: Product[];        // لیست کامل محصولات (برای گالری)
    onGalleryOpen?: (product: Product) => void; // تابع اختیاری برای مدیریت گالری در والد
}

export default function ProductCard({
                                        product,
                                        allProducts = [],
                                        onGalleryOpen,
                                    }: ProductCardProps) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    // ===== باز کردن گالری =====
    const handleImageClick = () => {
        if (onGalleryOpen) {
            onGalleryOpen(product);
        } else {
            setIsGalleryOpen(true);
        }
    };

    // ===== محاسبه درصد تخفیف =====
    const discountPercent = product.comparePrice
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 0;

    return (
        <>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-300 border border-gray-50 group">
                {/* ===== تصویر محصول ===== */}
                <div
                    className="h-56 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center relative overflow-hidden cursor-pointer"
                    onClick={handleImageClick}
                >
                    {product.images.length > 0 ? (
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <span className="text-gray-400 font-bold">بدون تصویر</span>
                    )}

                    {/* ===== برچسب‌ها ===== */}
                    <span className="absolute top-4 right-4 bg-emerald-dark text-gold text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {product.isFeatured ? "ویژه" : "جدید"}
          </span>

                    {product.comparePrice && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {discountPercent}٪ تخفیف
            </span>
                    )}

                    {/* ===== آیکون بزرگنمایی (هاور) ===== */}
                    {product.images.length > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <span className="bg-white/90 text-emerald-dark text-3xl w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                🔍
              </span>
                        </div>
                    )}

                    {/* ===== تعداد تصاویر ===== */}
                    {product.images.length > 1 && (
                        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {product.images.length} 📷
            </span>
                    )}
                </div>

                {/* ===== اطلاعات محصول ===== */}
                <div className="p-6">
                    {/* عنوان */}
                    <h3 className="text-xl font-bold text-emerald-dark group-hover:text-gold transition-colors line-clamp-1">
                        {product.title}
                    </h3>

                    {/* مشخصات */}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-2">
                        <span>📐 {product.dimensions || "—"}</span>
                        <span>🪵 {product.woodType || "—"}</span>
                    </div>

                    {/* توضیحات */}
                    <p className="text-gray-600 text-sm mt-3 mb-4 line-clamp-2">
                        {product.description}
                    </p>

                    {/* ===== قیمت‌ها ===== */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-2xl font-bold text-emerald-dark">
              {toPersianDigits(product.price.toLocaleString())} تومان
            </span>

                        {product.comparePrice && (
                            <>
                <span className="text-sm text-gray-400 line-through">
                  {toPersianDigits(product.comparePrice.toLocaleString())} تومان
                </span>
                                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                  {discountPercent}٪
                </span>
                            </>
                        )}
                    </div>

                    {/* ===== دکمه‌های اقدام ===== */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 text-gold font-bold hover:gap-4 transition-all duration-300 border-b-2 border-gold/20 hover:border-gold pb-1 group-hover:gap-4"
                        >
                            <span>استعلام قیمت</span>
                            <span>←</span>
                        </a>

                        {allProducts.length > 0 && (
                            <button
                                onClick={handleImageClick}
                                className="text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-1"
                            >
                                <span>🖼️</span> گالری
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== گالری تصاویر (مودال) ===== */}
            {isGalleryOpen && (
                <ProductsModal
                    product={product}
                    onClose={() => setIsGalleryOpen(false)}
                />
            )}
        </>
    );
}