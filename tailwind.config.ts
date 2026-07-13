import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: "#FFFDF5",
                ink: "#1A1A1A",
                acid: "#CCFF00",
                electric: "#0055FF",
                hotpink: "#FF3399",
                vivid: "#FF6600",
                neo: {
                    cream: "#FFFDF5",
                    ink: "#1A1A1A",
                    acid: "#CCFF00",
                    blue: "#0055FF",
                    pink: "#FF3399",
                    orange: "#FF6600",
                    green: "#00CC66",
                },
                /* Luxury gradient stops */
                luxury: {
                    purple: "#8B5CF6",
                    indigo: "#6366F1",
                    cyan: "#06B6D4",
                    emerald: "#10B981",
                },
            },
            fontFamily: {
                heading: ["var(--font-heading)", "ui-sans-serif", "system-ui", "sans-serif"],
                mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
            },
            boxShadow: {
                "neo": "6px 6px 0px 0px #1A1A1A",
                "neo-lg": "10px 10px 0px 0px #1A1A1A",
                "neo-sm": "4px 4px 0px 0px #1A1A1A",
                "neo-inv": "6px 6px 0px 0px #FFFDF5",
                "neo-inv-lg": "10px 10px 0px 0px #FFFDF5",
                "neo-glow": "6px 6px 0px 0px #1A1A1A, 0 0 20px rgba(204, 255, 0, 0.1)",
                "neo-glow-blue": "6px 6px 0px 0px #1A1A1A, 0 0 20px rgba(0, 85, 255, 0.15)",
                "neo-glow-pink": "6px 6px 0px 0px #1A1A1A, 0 0 20px rgba(255, 51, 153, 0.15)",
            },
            backdropBlur: {
                xs: "2px",
            },
            animation: {
                "marquee": "marquee 20s linear infinite",
                "marquee-reverse": "marquee-reverse 20s linear infinite",
                "marquee-slow": "marquee 35s linear infinite",
                "float": "float 6s ease-in-out infinite",
                "pulse-dot": "pulse-dot 2s ease-in-out infinite",
                "spin-slow": "spin-slow 12s linear infinite",
                "gradient": "gradient-shift 4s ease infinite",
                "shimmer": "shimmer 3s ease-in-out infinite",
                "glow-pulse": "glow-pulse 3s ease-in-out infinite",
                "blob": "blob-float 8s ease-in-out infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                "marquee-reverse": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "33%": { transform: "translateY(-8px) rotate(1deg)" },
                    "66%": { transform: "translateY(4px) rotate(-1deg)" },
                },
                "pulse-dot": {
                    "0%, 100%": { opacity: "1", transform: "scale(1)" },
                    "50%": { opacity: "0.6", transform: "scale(1.3)" },
                },
                "spin-slow": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                "gradient-shift": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "glow-pulse": {
                    "0%, 100%": { boxShadow: "0 0 15px rgba(204, 255, 0, 0.1)" },
                    "50%": { boxShadow: "0 0 30px rgba(204, 255, 0, 0.25), 0 0 60px rgba(204, 255, 0, 0.08)" },
                },
                "blob-float": {
                    "0%, 100%": { transform: "translate(0, 0) scale(1)" },
                    "25%": { transform: "translate(30px, -20px) scale(1.05)" },
                    "50%": { transform: "translate(-20px, 20px) scale(0.95)" },
                    "75%": { transform: "translate(20px, 10px) scale(1.02)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
