"use client";

import { useState, useEffect } from "react";
import ProductForm from "../components/ProductsForm";
import ProductList from "../components/ProductsList";
import { Product } from "@/types/product";

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (isMounted) {
                    setProducts(data);
                }
            } catch (error) {
                if (isMounted) {
                    setMessage({ type: "error", text: "خطا در دریافت محصولات" });
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSubmit = async (formData: any) => {
        setMessage(null);

        const payload = {
            ...formData,
            price: parseInt(formData.price),
            comparePrice: formData.comparePrice ? parseInt(formData.comparePrice) : null,
            images: formData.images.split(",").map((s: string) => s.trim()).filter(Boolean),
        };

        const url = editingProduct
            ? `/api/products/${editingProduct.slug}`
            : "/api/products";
        const method = editingProduct ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setMessage({ type: "success", text: editingProduct ? "✅ محصول ویرایش شد!" : "✅ محصول اضافه شد!" });
                setEditingProduct(null);

                const fetchRes = await fetch("/api/products");
                const data = await fetchRes.json();
                setProducts(data);
            } else {
                setMessage({ type: "error", text: "❌ خطا در ذخیره محصول" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "❌ خطا در ارتباط با سرور" });
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("آیا از حذف این محصول اطمینان دارید؟")) return;
        try {
            await fetch(`/api/products/${slug}`, { method: "DELETE" });
            setMessage({ type: "success", text: "🗑️ محصول حذف شد!" });
            const fetchRes = await fetch("/api/products");
            const data = await fetchRes.json();
            setProducts(data);
        } catch (error) {
            setMessage({ type: "error", text: "❌ خطا در حذف محصول" });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 mt-4">در حال بارگذاری...</p>
                </div>
            </div>
        );
    }

    const initialFormData = editingProduct
        ? {
            title: editingProduct.title,
            description: editingProduct.description,
            category: editingProduct.category,
            dimensions: editingProduct.dimensions || "",
            woodType: editingProduct.woodType || "",
            fabric: editingProduct.fabric || "",
            price: editingProduct.price.toString(),
            comparePrice: editingProduct.comparePrice?.toString() || "",
            isFeatured: editingProduct.isFeatured,
            images: editingProduct.images.join(", "),
        }
        : undefined;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-emerald-dark">مدیریت محصولات</h1>
                    <p className="text-gray-500 text-sm">محصولات خود را مدیریت، ویرایش یا حذف کنید</p>
                </div>
                <span className="text-sm text-gray-400 bg-white px-4 py-2 rounded-full shadow-sm">
          {products.length} محصول
        </span>
            </div>

            {message && (
                <div
                    className={`p-4 rounded-2xl mb-6 text-center ${
                        message.type === "success"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-emerald-dark flex items-center gap-2">
                        <span className="text-gold text-2xl">{editingProduct ? "✏️" : "➕"}</span>
                        {editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}
                    </h2>
                </div>
                <ProductForm
                    initialData={initialFormData}
                    onSubmit={handleSubmit}
                    onCancel={editingProduct ? handleCancelEdit : undefined}
                />
            </div>

            <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}