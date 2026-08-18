import { CategoryKey, CATEGORY_LABELS } from "./constants";

interface CategoryTabsProps {
    categories: CategoryKey[];
    activeCategory: CategoryKey;
    onCategoryChange: (category: CategoryKey) => void;
    products: { category: string }[];
}

export default function CategoryTabs({
                                         categories,
                                         activeCategory,
                                         onCategoryChange,
                                         products,
                                     }: CategoryTabsProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((catKey) => {
                if (catKey !== "all" && !products.some((p) => p.category === catKey)) {
                    return null;
                }
                return (
                    <button
                        key={catKey}
                        onClick={() => onCategoryChange(catKey)}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                            activeCategory === catKey
                                ? "bg-emerald-dark text-white shadow-lg shadow-emerald-dark/30"
                                : "bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200"
                        }`}
                    >
                        {CATEGORY_LABELS[catKey] || catKey}
                    </button>
                );
            })}
        </div>
    );
}