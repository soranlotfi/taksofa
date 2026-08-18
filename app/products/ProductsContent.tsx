// app/products/content.tsx (Client Component)
"use client";

import { useState } from "react";
import ProductsHeader from "@/app/products/Components/ProductsHeader";
import CategoryTabs from "@/app/products/Components/CategoryTabs";
import ProductsGrid from "@/app/products/Components/ProductsGrid";
import {
    CATEGORY_KEYS,
    CATEGORY_LIST,
    CategoryKey,
} from "@/app/products/Components/constants";
import ProductsSkeleton from "@/app/products/Components/ProducstSkeleton";

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

interface ProductsContentProps {
    initialProducts: Product[];
}

export default function ProductsContent({ initialProducts }: ProductsContentProps) {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>(CATEGORY_KEYS.ALL);

    const products = initialProducts;

    const filteredProducts =
        activeCategory === CATEGORY_KEYS.ALL
            ? products
            : products.filter((p) => p.category === activeCategory);

    if (!products || products.length === 0) {
        return <ProductsSkeleton />;
    }

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