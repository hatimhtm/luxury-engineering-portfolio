"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { THEME_KEY } from "@/lib/theme-script";

type Theme = "light" | "dark";

// The browser bar takes the page colour of the theme in use.
const BAR: Record<Theme, string> = { light: "#F6F5F1", dark: "#121315" };

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
    theme: "light",
    toggleTheme: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

function paintBar(theme: Theme) {
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", BAR[theme]);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    // The inline script already set data-theme before paint; mirror it.
    useEffect(() => {
        const current: Theme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        setTheme(current);
        paintBar(current);
    }, []);

    const toggleTheme = () => {
        const next: Theme = theme === "light" ? "dark" : "light";
        setTheme(next);
        try {
            localStorage.setItem(THEME_KEY, next);
        } catch {}
        document.documentElement.setAttribute("data-theme", next);
        paintBar(next);
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
