import ProductCard from "./ProductCard";

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

export default function ProductsGrid({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return (
            <div className="col-span-3 text-center py-16">
                <div className="text-6xl mb-4">🛋️</div>
                <p className="text-gray-500 text-lg">محصولی در این دسته یافت نشد.</p>
                <p className="text-gray-400 text-sm mt-2">به زودی محصولات جدید اضافه می‌شوند.</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}