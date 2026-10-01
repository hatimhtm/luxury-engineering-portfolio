"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
    theme: "light",
    toggleTheme: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    // The inline script already set data-theme before paint; mirror it.
    useEffect(() => {
        const current = document.documentElement.getAttribute("data-theme");
        if (current === "dark" || current === "light") setTheme(current);
    }, []);

    const toggleTheme = () => {
        const next: Theme = theme === "light" ? "dark" : "light";
        setTheme(next);
        try {
            localStorage.setItem("theme", next);
        } catch {}
        document.documentElement.setAttribute("data-theme", next);
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
