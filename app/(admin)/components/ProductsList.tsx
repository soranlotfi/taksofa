import {Product} from "@/types/product"


interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (slug: string) => void;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
    // ✅ فقط نمایش داده‌ها، بدون هیچ تابع fetch

    if (products.length === 0) {
        return (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-500 text-lg">هنوز محصولی ثبت نشده است.</p>
                <p className="text-gray-400 text-sm">با استفاده از فرم بالا، اولین محصول خود را اضافه کنید.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="font-bold text-emerald-dark text-lg line-clamp-1">{product.title}</h3>
                            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-0.5 rounded-full">{product.category}</span>
                        </div>
                        {product.isFeatured && (
                            <span className="bg-gold/20 text-gold text-xs font-bold px-2.5 py-1 rounded-full">ویژه</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span>📐 {product.dimensions || "—"}</span>
                        <span>🪵 {product.woodType || "—"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald-dark">{product.price.toLocaleString()} تومان</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(product)}
                                className="bg-gold text-emerald-dark px-3 py-1.5 rounded-full text-xs font-bold hover:bg-gold-light transition"
                            >
                                ✏️ ویرایش
                            </button>
                            <button
                                onClick={() => onDelete(product.slug)}
                                className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-red-600 transition"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}