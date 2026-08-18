// app/products/page.tsx (Server Component)
import Content from "@/app/products/ProductsContent";
import { Metadata } from "next";
import { getProducts } from "@/lib/db";

// ===== متا تگ‌های سئو محور برای صفحه محصولات =====
export const metadata: Metadata = {
    title: "محصولات تولیدی مبل تک | انواع مبل کلاسیک و مدرن",
    description:
        "مشاهده و استعلام قیمت انواع مبل کلاسیک، مدرن و لاکچری در تولیدی مبل تک. هر قطعه با کیفیت و ظرافت بالا تولید می‌شود.",
    keywords:
        "محصولات مبل تک, مبل کلاسیک, مبل مدرن, مبلمان سنندج, تولیدی مبل در سنندج",
    alternates: {
        canonical: "https://mobltak.ir/products",
    },
    openGraph: {
        title: "محصولات تولیدی مبل تک | انواع مبل کلاسیک و مدرن",
        description: "مشاهده و استعلام قیمت انواع مبل کلاسیک، مدرن و لاکچری در تولیدی مبل تک.",
        url: "https://mobltak.ir/products",
        siteName: "تولیدی مبل تک",
        locale: "fa_IR",
        type: "website",
    },
};

export default async function ProductsPage() {
    const products = await getProducts();
    return <Content initialProducts={products} />;
}