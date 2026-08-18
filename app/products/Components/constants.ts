// ===== کلیدهای انگلیسی برای سرور و دیتابیس =====
export const CATEGORY_KEYS = {
    ALL: "all",
    SOFA: "sofa",
    CONSOLE: "console",
    BEDROOM: "bedroom",
    DINING: "dining",
} as const;

// ===== نگاشت کلید انگلیسی به نام فارسی (برای نمایش در UI) =====
export const CATEGORY_LABELS: Record<string, string> = {
    [CATEGORY_KEYS.ALL]: "همه",
    [CATEGORY_KEYS.SOFA]: "مبل",
    [CATEGORY_KEYS.CONSOLE]: "جلو مبلی",
    [CATEGORY_KEYS.BEDROOM]: "سرویس خواب",
    [CATEGORY_KEYS.DINING]: "سرویس نهار خوری",
};

export type CategoryKey = (typeof CATEGORY_KEYS)[keyof typeof CATEGORY_KEYS];

export const CATEGORY_LIST: CategoryKey[] = [
    CATEGORY_KEYS.ALL,
    CATEGORY_KEYS.SOFA,
    CATEGORY_KEYS.CONSOLE,
    CATEGORY_KEYS.BEDROOM,
    CATEGORY_KEYS.DINING,
];