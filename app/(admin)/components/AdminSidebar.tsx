"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { icon: "📦", label: "محصولات", href: "/admin" },
        { icon: "⚙️", label: "تنظیمات سایت", href: "/admin/settings" },
        { icon: "💬", label: "پیام‌ها", href: "/admin/messages" },
        { icon: "📊", label: "آمار", href: "/admin/stats" },
    ];

    return (
        <>
            {/* پس‌زمینه تیره برای موبایل */}
            {!isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(true)}
                />
            )}

            {/* سایدبار */}
            <aside
                className={`
          fixed top-0 right-0 bottom-0 z-50
          w-64 bg-gradient-to-b from-emerald-dark to-emerald-medium
          text-white p-4 flex flex-col
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
            >
                {/* لوگو */}
                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-emerald-dark font-black text-lg">
                        م
                    </div>
                    <div>
                        <div className="font-bold text-white text-lg">پنل مدیریت</div>
                        <div className="text-xs text-white/50">تولیدی مبل تک</div>
                    </div>
                </div>

                {/* منو */}
                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                                    ? "bg-gold text-emerald-dark font-bold shadow-lg shadow-gold/30"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                }
                `}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* پایین سایدبار */}
                <div className="pt-4 border-t border-white/10 mt-auto">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                        <span className="text-xl">←</span>
                        <span>مشاهده سایت</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/10 hover:text-white transition-all duration-200 w-full mt-1"
                    >
                        <span className="text-xl">✕</span>
                        <span>بستن منو</span>
                    </button>
                </div>
            </aside>
        </>
    );
}