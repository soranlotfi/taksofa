"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
    createdAt: string;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        dimensions: "",
        woodType: "",
        fabric: "",
        price: "",
        comparePrice: "",
        isFeatured: false,
        images: "",
    });
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            setMessage({ type: "error", text: "خطا در دریافت محصولات" });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const payload = {
            ...form,
            price: parseInt(form.price),
            comparePrice: form.comparePrice ? parseInt(form.comparePrice) : null,
            images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
        };

        const url = editingId
            ? `/api/products/${products.find((p) => p.id === editingId)?.slug}`
            : "/api/products";
        const method = editingId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setMessage({ type: "success", text: editingId ? "✅ محصول ویرایش شد!" : "✅ محصول اضافه شد!" });
                resetForm();
                fetchProducts();
            } else {
                setMessage({ type: "error", text: "❌ خطا در ذخیره محصول" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "❌ خطا در ارتباط با سرور" });
        }
    };

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            category: "",
            dimensions: "",
            woodType: "",
            fabric: "",
            price: "",
            comparePrice: "",
            isFeatured: false,
            images: "",
        });
        setEditingId(null);
    };

    const handleEdit = (product: Product) => {
        setForm({
            title: product.title,
            description: product.description,
            category: product.category,
            dimensions: product.dimensions || "",
            woodType: product.woodType || "",
            fabric: product.fabric || "",
            price: product.price.toString(),
            comparePrice: product.comparePrice?.toString() || "",
            isFeatured: product.isFeatured,
            images: product.images.join(", "),
        });
        setEditingId(product.id);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("آیا از حذف این محصول اطمینان دارید؟")) return;
        try {
            await fetch(`/api/products/${slug}`, { method: "DELETE" });
            setMessage({ type: "success", text: "🗑️ محصول حذف شد!" });
            fetchProducts();
        } catch (error) {
            setMessage({ type: "error", text: "❌ خطا در حذف محصول" });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 mt-4">در حال بارگذاری...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* ===== هدر ===== */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-dark flex items-center gap-3">
                            <span className="bg-gold/20 text-gold p-2 rounded-2xl">⚙️</span>
                            مدیریت محصولات
                        </h1>
                        <p className="text-gray-500 mt-1">محصولات خود را مدیریت، ویرایش یا حذف کنید</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/app/(admin)/admin/settings"
                            className="bg-emerald-dark/10 text-emerald-dark font-bold px-5 py-2.5 rounded-full hover:bg-emerald-dark/20 transition text-sm flex items-center gap-2"
                        >
                            <span>⚙️</span> تنظیمات سایت
                        </Link>
                        <Link
                            href="/public"
                            className="bg-emerald-dark text-white font-bold px-5 py-2.5 rounded-full hover:bg-emerald-medium transition text-sm flex items-center gap-2"
                        >
                            <span>←</span> مشاهده سایت
                        </Link>
                    </div>
                </div>

                {/* ===== پیام ===== */}
                {message && (
                    <div
                        className={`p-4 rounded-2xl mb-6 text-center ${
                            message.type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* ===== فرم افزودن/ویرایش ===== */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-emerald-dark flex items-center gap-2">
                            <span className="text-gold text-2xl">{editingId ? "✏️" : "➕"}</span>
                            {editingId ? "ویرایش محصول" : "افزودن محصول جدید"}
                        </h2>
                        {editingId && (
                            <button
                                onClick={resetForm}
                                className="text-gray-400 hover:text-gray-600 text-sm font-medium transition"
                            >
                                ✕ انصراف
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">عنوان محصول *</label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition"
                                placeholder="مثال: مبل سلطنتی کلاسیک"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">دسته‌بندی *</label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition"
                                placeholder="کلاسیک / مدرن / لاکچری"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">ابعاد</label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition"
                                placeholder="۲۲۰ × ۹۰ سانتی‌متر"
                                value={form.dimensions}
                                onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">نوع چوب</label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition"
                                placeholder="چوب گردو / راش / ..."
                                value={form.woodType}
                                onChange={(e) => setForm({ ...form, woodType: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">جنس پارچه</label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition"
                                placeholder="مخمل / کتان / ..."
                                value={form.fabric}
                                onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">قیمت (تومان) *</label>
                            <input
                                type="number"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition"
                                placeholder="۲۵۰۰۰۰۰۰"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">قیمت قبل از تخفیف</label>
                            <input
                                type="number"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition"
                                placeholder="۳۲۰۰۰۰۰۰"
                                value={form.comparePrice}
                                onChange={(e) => setForm({ ...form, comparePrice: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">آدرس تصاویر (با کاما جدا کنید)</label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition"
                                placeholder="/images/mobl-1.jpg, /images/mobl-1-2.jpg"
                                value={form.images}
                                onChange={(e) => setForm({ ...form, images: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">توضیحات کامل *</label>
                            <textarea
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition h-32 resize-none"
                                placeholder="توضیحات کامل محصول..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="md:col-span-2 flex items-center gap-3 pt-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={form.isFeatured}
                                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">محصول ویژه (نمایش در صفحه اصلی)</span>
                            </label>
                        </div>

                        <div className="md:col-span-2 flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-emerald-dark text-white font-bold py-3.5 rounded-full hover:bg-emerald-medium transition shadow-lg shadow-emerald-dark/30"
                            >
                                {editingId ? "💾 ذخیره تغییرات" : "➕ افزودن محصول"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-8 bg-gray-200 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-300 transition"
                                >
                                    انصراف
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* ===== لیست محصولات ===== */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-emerald-dark">📦 لیست محصولات</h2>
                        <span className="text-sm text-gray-400">{products.length} محصول</span>
                    </div>

                    {products.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
                            <div className="text-6xl mb-4">📭</div>
                            <p className="text-gray-500 text-lg">هنوز محصولی ثبت نشده است.</p>
                            <p className="text-gray-400 text-sm">با استفاده از فرم بالا، اولین محصول خود را اضافه کنید.</p>
                        </div>
                    ) : (
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
                                                onClick={() => handleEdit(product)}
                                                className="bg-gold text-emerald-dark px-3 py-1.5 rounded-full text-xs font-bold hover:bg-gold-light transition"
                                            >
                                                ✏️ ویرایش
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.slug)}
                                                className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-red-600 transition"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}