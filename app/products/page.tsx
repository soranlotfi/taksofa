"use client";

import { useEffect, useState } from "react";

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

export default function ProductsSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section id="products" className="py-20 bg-cream">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500">در حال بارگذاری محصولات...</p>
                </div>
            </section>
        );
    }

    const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);

    return (
        <section id="products" className="py-20">
            <div className="container mx-auto px-4 max-w-6xl py-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-dark inline-block relative">
                            محصولات ویژه
                            <span className="absolute -bottom-3 right-0 w-16 h-1 bg-gold rounded-full"></span>
                        </h2>
                        <p className="text-gray-500 mt-6 text-lg">مجموعه‌ای از شیک‌ترین مدل‌های مبل</p>
                    </div>
                    <span className="bg-white text-gold font-bold px-5 py-2 rounded-full shadow-md text-sm mt-4 md:mt-0">
            ✦ استعلام قیمت و سفارش
          </span>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-300 border border-gray-50"
                            >
                                <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center relative">
                                    {product.images.length > 0 ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400 font-bold">بدون تصویر</span>
                                    )}
                                    <span className="absolute top-4 right-4 bg-emerald-dark text-gold text-xs font-bold px-3 py-1 rounded-full">
                    {product.isFeatured ? "ویژه" : "جدید"}
                  </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-emerald-dark">{product.title}</h3>
                                    <div className="flex gap-4 text-sm text-gray-500 mt-2">
                                        <span>📐 {product.dimensions}</span>
                                        <span>🪵 {product.woodType}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-3 mb-4">{product.description}</p>
                                    <a
                                        href="#contact"
                                        className="text-gold font-bold flex items-center gap-2 hover:gap-4 transition-all border-b-2 border-gold/20 pb-1 w-fit"
                                    >
                                        📞 برای استعلام قیمت تماس بگیرید ←
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3 text-center">
                            هنوز محصولی ثبت نشده است. از پنل مدیریت محصول اضافه کنید.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}