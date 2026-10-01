"use client";

import Link from "next/link";
import { useRef } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { BOOK_CALL } from "@/lib/site";

const LINKS = [
    { href: "/work", label: "Work" },
    { href: "/#about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
    const { theme, toggleTheme } = useTheme();
    const bar = useRef<HTMLDivElement>(null);

    // The highlight on the glass follows the pointer; written to CSS variables, never to React state.
    const onMove = (e: React.PointerEvent) => {
        const el = bar.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--lit", "0.9");
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
            <div
                ref={bar}
                onPointerMove={onMove}
                onPointerLeave={() => bar.current?.style.setProperty("--lit", "0.55")}
                className="glass glass-over glass-light mx-auto flex max-w-page items-center gap-2 rounded-full py-2 pl-5 pr-2 md:gap-6"
            >
                <Link href="/" className="text-[15px] font-bold tracking-[-0.01em] text-ink">
                    Hatim El Hassak
                </Link>
                <nav className="ml-auto hidden items-center gap-6 text-[15px] font-medium text-ink2 md:flex" aria-label="Main">
                    {LINKS.map((l) => (
                        <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
                            {l.label}
                        </Link>
                    ))}
                </nav>
                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                    className="ml-auto grid h-10 w-10 place-items-center rounded-full text-ink2 transition-colors hover:bg-ink/5 hover:text-ink md:ml-0"
                >
                    {theme === "light" ? <Moon size={18} weight="bold" /> : <Sun size={18} weight="bold" />}
                </button>
                <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="pill pill-accent">
                    Book a call
                </a>
            </div>
        </header>
    );
}
