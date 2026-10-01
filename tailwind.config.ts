import type { Config } from "tailwindcss";

/* Colours are CSS variables (space-separated RGB channels) set in app/globals.css,
   so light and dark mode swap in one place. */
const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
    darkMode: ["class", '[data-theme="dark"]'],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                page: channel("page"),
                raised: channel("raised"),
                ink: channel("ink"),
                ink2: channel("ink2"),
                ink3: channel("ink3"),
                accent: channel("accent"),
                onaccent: channel("onaccent"),
            },
            borderColor: {
                hairline: "var(--hairline)",
            },
            fontFamily: {
                sans: ["var(--font-satoshi)", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            letterSpacing: {
                display: "-0.04em",
                title: "-0.03em",
            },
            maxWidth: {
                page: "1280px",
            },
            transitionTimingFunction: {
                out: "cubic-bezier(0.16, 1, 0.3, 1)",
            },
        },
    },
    plugins: [],
};
export default config;
