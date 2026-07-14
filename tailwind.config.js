module.exports = {
    content: [
        // ===== مسیرهای اصلی پروژه =====
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
        "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
        "./utils/**/*.{js,ts,jsx,tsx,mdx}",
        "./context/**/*.{js,ts,jsx,tsx,mdx}",
        "./providers/**/*.{js,ts,jsx,tsx,mdx}",

        // ===== اگر از پوشه‌ی src استفاده می‌کنید =====
        "./src/**/*.{js,ts,jsx,tsx,mdx}",

        // ===== فایل‌های ریشه (اختیاری) =====
        "./*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    50: "#F9F0E3",
                    100: "#F2E0C7",
                    200: "#E5C99B",
                    300: "#D8B26F",
                    400: "#C99A3B",
                    500: "#B8882E",
                    600: "#A07625",
                    700: "#88641C",
                    800: "#705213",
                    900: "#58400A",
                    950: "#402D07",
                    DEFAULT: "#C99A3B",
                    light: "#E8C97A",
                    soft: "#F2E6CE",
                    dark: "#B8942E",
                },
                emerald: {
                    dark: "#0A3D32",
                    medium: "#145A46",
                    light: "#1E7A5E",
                    DEFAULT: "#0A3D32",
                },
            },
        },
    },
    plugins: [],
};