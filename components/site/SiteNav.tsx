"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "@phosphor-icons/react";
import LiquidGlass from "@/components/glass/LiquidGlass";
import { useTheme } from "@/components/ui/ThemeProvider";
import { BOOK_CALL } from "@/lib/site";

const LINKS = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/stack", label: "Stack" },
    { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
    const { theme, toggleTheme } = useTheme();
    const path = usePathname();
    const [open, setOpen] = useState(false);
    useEffect(() => setOpen(false), [path]);
    useEffect(() => {
        document.documentElement.style.overflow = open ? "hidden" : "";
    }, [open]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:pt-5">
            <LiquidGlass as="nav" aria-label="Main" radius={999} bezel={12} strength={16} frost={6} tint="var(--gt-lo)" className="mx-auto flex w-full max-w-[1120px] items-center gap-2 py-2 pl-5 pr-2">
                <Link href="/" className="display whitespace-nowrap text-[18px] font-semibold tracking-[-0.01em] text-ink md:text-[19px]">
                    Hatim El Hassak
                </Link>
                <div className="ml-auto hidden items-center gap-1 md:flex">
                    {LINKS.map((l) => {
                        const active = path === l.href || (l.href !== "/" && path.startsWith(l.href));
                        return (
                            <Link key={l.href} href={l.href} className="relative rounded-full px-3.5 py-2 text-[15px] font-medium text-ink2 transition-colors hover:text-ink">
                                {active && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-ink/[0.07]" transition={{ type: "spring", bounce: 0.18, duration: 0.5 }} />}
                                <span className="relative">{l.label}</span>
                            </Link>
                        );
                    })}
                </div>
                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                    className="ml-auto grid h-10 w-10 place-items-center rounded-full text-ink2 transition-colors hover:bg-ink/5 hover:text-ink md:ml-1"
                >
                    {theme === "light" ? <Moon size={18} weight="bold" /> : <Sun size={18} weight="bold" />}
                </button>
                <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-accent hidden sm:inline-flex">
                    Book a call
                    <span className="dot"><ArrowUpRight size={15} weight="bold" /></span>
                </a>
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="relative grid h-10 w-10 place-items-center rounded-full md:hidden"
                >
                    <span className={`absolute h-[2px] w-[18px] rounded-full bg-ink transition-transform duration-300 ease-out ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
                    <span className={`absolute h-[2px] w-[18px] rounded-full bg-ink transition-transform duration-300 ease-out ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
                </button>
            </LiquidGlass>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 -z-10 bg-page/80 backdrop-blur-2xl md:hidden"
                    >
                        <nav className="flex h-full flex-col justify-center gap-2 px-8" aria-label="Menu">
                            {LINKS.map((l, i) => (
                                <motion.div key={l.href} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
                                    <Link href={l.href} className="display block py-1 text-[3rem] text-ink">
                                        {l.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.a initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-8 self-start">
                                Book a call <span className="dot"><ArrowUpRight size={15} weight="bold" /></span>
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
