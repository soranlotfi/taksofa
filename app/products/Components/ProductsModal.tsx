"use client";

import { useState, useEffect, useRef } from "react";

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
    createdAt?: string;
}

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

interface ProductGalleryProps {
    product: Product;
    onClose: () => void;
    onPrevious?: () => void;
    onNext?: () => void;
    hasPrevious?: boolean;
    hasNext?: boolean;
}

export default function ProductGallery({
                                           product,
                                           onClose,
                                           onPrevious,
                                           onNext,
                                           hasPrevious,
                                           hasNext,
                                       }: ProductGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const thumbnailContainerRef = useRef<HTMLDivElement>(null);

    const images = product.images.length > 0 ? product.images : ["/images/placeholder.jpg"];
    const currentImage = images[selectedImageIndex] || images[0];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft" && hasPrevious && onPrevious) onPrevious();
            if (e.key === "ArrowRight" && hasNext && onNext) onNext();
            if (e.key === "ArrowUp") {
                setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
            }
            if (e.key === "ArrowDown") {
                setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose, hasPrevious, hasNext, onPrevious, onNext, images.length]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        if (thumbnailContainerRef.current && images.length > 1) {
            const container = thumbnailContainerRef.current;
            const activeThumb = container.children[selectedImageIndex] as HTMLElement;
            if (activeThumb) {
                activeThumb.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    }, [selectedImageIndex, images.length]);

    const discountPercent = product.comparePrice
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 0;

    const categoryMap: Record<string, { label: string; icon: string }> = {
        sofa: { label: "مبل", icon: "🛋️" },
        console: { label: "جلو مبلی", icon: "🪑" },
        bedroom: { label: "سرویس خواب", icon: "🛏️" },
        dining: { label: "سرویس نهار خوری", icon: "🍽️" },
    };
    const categoryInfo = categoryMap[product.category] || { label: product.category, icon: "📦" };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
            onClick={onClose}>
            <div
                className="overflow-y-scroll relative max-w-7xl w-full max-h-[95vh] bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300 flex items-center justify-center text-2xl group"
                    aria-label="بستن"
                >
                    <span className="group-hover:rotate-90 transition-transform duration-300">✕</span>
                </button>

                {/* ===== دکمه‌های نویگیتور ===== */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
                    {hasPrevious && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrevious?.();
                            }}
                            className="group w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:text-gold hover:bg-black/70 hover:border-gold/50 transition-all duration-300 flex items-center justify-center text-4xl hover:scale-110 shadow-xl"
                            aria-label="محصول قبلی"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform duration-300">‹</span>
                        </button>
                    )}
                    {hasPrevious && (
                        <span className="text-[10px] text-white/40 font-medium tracking-wider hidden lg:block">
              ← قبلی
            </span>
                    )}
                </div>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
                    {hasNext && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext?.();
                            }}
                            className="group w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:text-gold hover:bg-black/70 hover:border-gold/50 transition-all duration-300 flex items-center justify-center text-4xl hover:scale-110 shadow-xl"
                            aria-label="محصول بعدی"
                        >
                            <span className="group-hover:translate-x-1 transition-transform duration-300">›</span>
                        </button>
                    )}
                    {hasNext && (
                        <span className="text-[10px] text-white/40 font-medium tracking-wider hidden lg:block">
              بعدی →
            </span>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* ===== گالری تصاویر ===== */}
                    <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-4 lg:p-6 flex flex-col min-h-[400px] lg:min-h-[600px]">
                        {/* تصویر اصلی */}
                        <div
                            className="relative flex-1 rounded-2xl overflow-hidden cursor-zoom-in group sticky top-0"
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => setIsZoomed(false)}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setMousePosition({
                                    x: ((e.clientX - rect.left) / rect.width) * 100,
                                    y: ((e.clientY - rect.top) / rect.height) * 100,
                                });
                            }}
                        >
                            <img
                                src={currentImage}
                                alt={product.title}
                                className={`w-full h-[30vh] object-cover transition-transform duration-500 ${
                                    isZoomed ? "scale-150" : "scale-100"
                                }`}
                                style={{
                                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                                }}
                            />

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full border border-white/10">
                                {selectedImageIndex + 1} / {images.length}
                            </div>
                        </div>

                        {/* ===== آلبوم تصاویر کوچک ===== */}
                        {images.length > 1 && (
                            <div className="mt-4 relative">
                                <div
                                    ref={thumbnailContainerRef}
                                    className="flex gap-3 overflow-x-auto pb-3 scroll-smooth scrollbar-hide justify-center"
                                    style={{
                                        scrollbarWidth: "none",
                                        msOverflowStyle: "none",
                                    }}
                                >
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                                selectedImageIndex === idx
                                                    ? "border-gold shadow-lg shadow-gold/40 scale-105"
                                                    : "border-white/20 hover:border-white/50 hover:scale-105"
                                            }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`تصویر ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {selectedImageIndex === idx && (
                                                <div className="absolute inset-0 bg-gold/10" />
                                            )}
                                            <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded">
                                                {idx + 1}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {images.length > 4 && (
                                    <>
                                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
                                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ===== اطلاعات محصول ===== */}
                    <div className="p-6 lg:p-8 flex flex-col justify-between overflow-y-auto  lg:max-h-none">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                  {categoryInfo.icon} {categoryInfo.label}
                </span>
                                {product.isFeatured && (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold bg-gold/20 px-3 py-1 rounded-full border border-gold/30">
                    ✦ ویژه
                  </span>
                                )}
                            </div>

                            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                {product.title}
                            </h2>

                            <div className="flex items-center gap-3 flex-wrap mt-4">
                <span className="text-3xl md:text-4xl font-black text-gold">
                  {toPersianDigits(product.price.toLocaleString())}
                    <span className="text-base font-medium text-white/60 mr-1">تومان</span>
                </span>
                                {product.comparePrice && (
                                    <>
                    <span className="text-lg text-white/40 line-through">
                      {toPersianDigits(product.comparePrice.toLocaleString())} تومان
                    </span>
                                        <span className="text-sm font-bold text-white bg-red-500/80 px-3 py-1 rounded-full">
                      {discountPercent}% تخفیف
                    </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 my-6">
                            {product.dimensions && (
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="text-xs text-white/40">📐 ابعاد</div>
                                    <div className="text-sm font-medium text-white mt-0.5">{product.dimensions}</div>
                                </div>
                            )}
                            {product.woodType && (
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="text-xs text-white/40">🪵 نوع چوب</div>
                                    <div className="text-sm font-medium text-white mt-0.5">{product.woodType}</div>
                                </div>
                            )}
                            {product.fabric && (
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="text-xs text-white/40">🧵 جنس پارچه</div>
                                    <div className="text-sm font-medium text-white mt-0.5">{product.fabric}</div>
                                </div>
                            )}
                            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                <div className="text-xs text-white/40">📦 دسته‌بندی</div>
                                <div className="text-sm font-medium text-white mt-0.5">{categoryInfo.label}</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-white/60 mb-2">📝 توضیحات</h4>
                            <p className="text-white/80 text-sm leading-relaxed">{product.description}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                            <a
                                href="#contact"
                                className="flex-1 text-center bg-gold hover:bg-gold-light text-emerald-dark font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-0.5"
                            >
                                📞 استعلام قیمت و سفارش
                            </a>
                            <a
                                href="/products"
                                className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 border border-white/10 hover:-translate-y-0.5"
                            >
                                🔍 مشاهده همه محصولات
                            </a>
                        </div>

                        <div className="mt-4 text-center text-xs text-white/40 flex items-center justify-center gap-4 flex-wrap">
                            <span>🖱️ برای بزرگنمایی روی تصویر نگه دارید</span>
                            <span className="w-px h-4 bg-white/10 hidden sm:block" />
                            <span>⌨️ ← → برای تغییر محصول</span>
                            <span className="w-px h-4 bg-white/10 hidden sm:block" />
                            <span>⌨️ ↑ ↓ برای تغییر تصویر</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}