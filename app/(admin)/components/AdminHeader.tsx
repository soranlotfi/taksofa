"use client";

interface AdminHeaderProps {
    toggleSidebar: () => void;
}

export default function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden text-gray-600 hover:text-emerald-dark transition p-2 rounded-lg hover:bg-gray-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-xl font-bold text-emerald-dark">پنل مدیریت</h1>
                    <p className="text-sm text-gray-400 hidden sm:block">مدیریت محتوای سایت</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                    ا
                </div>
                <div className="hidden sm:block">
                    <div className="text-sm font-medium text-gray-700">ادمین</div>
                    <div className="text-xs text-gray-400">مدیر سایت</div>
                </div>
            </div>
        </header>
    );
}