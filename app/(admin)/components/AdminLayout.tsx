"use client";

import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-cream flex">
            {/* سایدبار */}
            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* محتوای اصلی */}
            <div
                className={`flex-1 transition-all duration-300 ${
                    sidebarOpen ? "mr-64" : "mr-0"
                }`}
            >
                <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="p-6 md:p-8">{children}</main>
            </div>
        </div>
    );
}