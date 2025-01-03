/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                outfit: ["Outfit", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                primary: "#D4AF37",
                secondary: "#000000",
                tertiary: "#F2F2F2",
            },
            animation: {
                "fade-in": "fadeIn 0.3s ease-in-out",
                "slide-up": "slideUp 0.3s ease-in-out",
                spinCustom: "spinCustom 1s linear infinite",
                spinCustomBefore: "spinCustom 2s linear infinite",
                spinCustomAfter: "spinCustom 4s linear infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                spinCustom: {
                    "100%": { transform: "rotate(1turn)" },
                },
            },
            minHeight: {
                screen: "calc(100vh - 80px)",
            },
        },
    },
    plugins: [],
};
