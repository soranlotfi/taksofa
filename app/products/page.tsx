"use client";

import {useState, useEffect, useCallback, useRef} from "react";
import ProductsSkeleton from "@/app/products/Components/ProducstSkeleton";
import ProductsHeader from "@/app/products/Components/ProductsHeader";
import CategoryTabs from "@/app/products/Components/CategoryTabs";
import ProductsGrid from "@/app/products/Components/ProductsGrid";
import { CATEGORY_KEYS, CATEGORY_LIST, CategoryKey } from "@/app/products/Components/constants";


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
    const [activeCategory, setActiveCategory] = useState<CategoryKey>(CATEGORY_KEYS.ALL);
    const isMounted = useRef(true)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) throw new Error("خطا در دریافت محصولات");
                const data = await res.json();
                if (isMounted.current) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("خطا:", error);
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            isMounted.current = false;
        };
    }, []); // ← وابستگی خالی => فقط یک بار اجرا می‌شود

    const filteredProducts =
        activeCategory === CATEGORY_KEYS.ALL
            ? products
            : products.filter((p) => p.category === activeCategory);
    if (loading) return <ProductsSkeleton />;

    return (
        <section id="products" className="py-20 bg-cream">
            <div className="container mx-auto px-4 max-w-6xl">
                <ProductsHeader />
                <CategoryTabs
                    categories={CATEGORY_LIST}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    products={products}
                />
                <p className="text-sm text-gray-400 mb-6">
                    {filteredProducts.length} محصول یافت شد
                </p>
                <ProductsGrid products={filteredProducts} />
                {/*{filteredProducts.length > 6 && (
                    <div className="text-center mt-12">
                        <a
                            href="/products"
                            className="inline-block bg-gold text-emerald-dark font-bold px-10 py-3.5 rounded-full hover:bg-gold-light transition shadow-lg shadow-gold/30 hover:shadow-gold/50"
                        >
                            مشاهده همه محصولات
                        </a>
                    </div>
                )}*/}
            </div>
        </section>
    );
}