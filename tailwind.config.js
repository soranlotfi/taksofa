/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        // اگر از پوشه‌های دیگر استفاده می‌کنید:
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: "#C99A3B",
                    light: "#E8C97A",
                    soft: "#F2E6CE",
                },
                emerald: {
                    dark: "#0A3D32",
                    medium: "#145A46",
                    light: "#1E7A5E",
                },
                cream: "#FCFAF5",
                dark: "#1A1A1A",
            },
        },
    },
    plugins: [],
};