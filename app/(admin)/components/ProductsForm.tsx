"use client";

import { useState } from "react";

interface ProductFormProps {
    initialData?: {
        id?: number;
        title: string;
        description: string;
        category: string;
        dimensions: string;
        woodType: string;
        fabric: string;
        price: string;
        comparePrice: string;
        isFeatured: boolean;
        images: string;
    };
    onSubmit: (data: any) => Promise<void>;
    onCancel?: () => void;
}

export default function ProductForm({
                                        initialData,
                                        onSubmit,
                                        onCancel,
                                    }: ProductFormProps) {
    const [form, setForm] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        category: initialData?.category || "",
        dimensions: initialData?.dimensions || "",
        woodType: initialData?.woodType || "",
        fabric: initialData?.fabric || "",
        price: initialData?.price || "",
        comparePrice: initialData?.comparePrice || "",
        isFeatured: initialData?.isFeatured || false,
        images: initialData?.images || "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(form);
        setLoading(false);
    };

    const isEditing = !!initialData?.id;

    return (
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
                    <span className="mr-3 text-sm font-medium text-gray-700">محصول ویژه (نمایش در صفحه اصلی)</span>
                </label>
            </div>

            <div className="md:col-span-2 flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-emerald-dark text-white font-bold py-3.5 rounded-full hover:bg-emerald-medium transition shadow-lg shadow-emerald-dark/30 disabled:opacity-50"
                >
                    {loading ? "⏳ در حال ذخیره..." : isEditing ? "💾 ذخیره تغییرات" : "➕ افزودن محصول"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-8 bg-gray-200 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-300 transition"
                    >
                        انصراف
                    </button>
                )}
            </div>
        </form>
    );
}