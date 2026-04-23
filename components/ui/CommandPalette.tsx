"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileDown, Home, Briefcase, Layers, Code2, Mail, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Command {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: () => void;
    shortcut?: string;
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const commands: Command[] = useMemo(() => [
        { id: "home", label: "Go to Home", icon: <Home size={16} />, action: () => router.push("/"), shortcut: "H" },
        { id: "work", label: "Go to Work", icon: <Briefcase size={16} />, action: () => router.push("/work"), shortcut: "W" },
        { id: "stack", label: "Go to Stack", icon: <Layers size={16} />, action: () => router.push("/stack"), shortcut: "S" },
        { id: "services", label: "Go to Services", icon: <Code2 size={16} />, action: () => router.push("/services") },
        { id: "contact", label: "Go to Contact", icon: <Mail size={16} />, action: () => router.push("/contact"), shortcut: "C" },
        {
            id: "resume",
            label: "Download Resume",
            icon: <FileDown size={16} />,
            action: () => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Hatim_El_Hassak_Resume.pdf";
                link.click();
            },
            shortcut: "R",
        },
    ], [router]);

    const filtered = useMemo(() => commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(search.toLowerCase())
    ), [commands, search]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            // Open with Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
                setSearch("");
                setSelectedIndex(0);
                return;
            }

            if (!isOpen) return;

            if (e.key === "Escape") {
                setIsOpen(false);
                return;
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
                return;
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
                return;
            }

            if (e.key === "Enter" && filtered.length > 0) {
                e.preventDefault();
                filtered[selectedIndex]?.action();
                setIsOpen(false);
                return;
            }
        },
        [isOpen, filtered, selectedIndex]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[300]"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-lg z-[301]"
                    >
                        <div className="neo-card bg-cream border-[3px] border-ink shadow-neo overflow-hidden dark:bg-ink dark:text-cream">
                            {/* Search input */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b-[3px] border-ink/10">
                                <Search size={18} className="text-ink/30 flex-shrink-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type a command..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none font-mono text-sm font-bold text-ink placeholder:text-ink/30"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-7 h-7 border-[2px] border-ink/20 flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </div>

                            {/* Commands */}
                            <div className="py-2 max-h-[300px] overflow-y-auto">
                                {filtered.length === 0 ? (
                                    <div className="px-5 py-8 text-center font-mono text-sm font-bold text-ink/30">
                                        No results found
                                    </div>
                                ) : (
                                    filtered.map((cmd, i) => (
                                        <button
                                            key={cmd.id}
                                            onClick={() => {
                                                cmd.action();
                                                setIsOpen(false);
                                            }}
                                            onMouseEnter={() => setSelectedIndex(i)}
                                            className={`w-full flex items-center gap-3 px-5 py-3 font-mono text-sm font-bold transition-colors ${selectedIndex === i
                                                    ? "bg-acid text-ink"
                                                    : "text-ink/70 hover:bg-ink/5"
                                                }`}
                                        >
                                            <span className={selectedIndex === i ? "text-ink" : "text-ink/40"}>{cmd.icon}</span>
                                            <span className="flex-1 text-left">{cmd.label}</span>
                                            {cmd.shortcut && (
                                                <kbd className={`px-1.5 py-0.5 border-[2px] font-mono text-[0.6rem] font-bold ${selectedIndex === i
                                                        ? "border-ink/30"
                                                        : "border-ink/10 text-ink/30"
                                                    }`}>
                                                    {cmd.shortcut}
                                                </kbd>
                                            )}
                                            {selectedIndex === i && (
                                                <ArrowRight size={14} className="text-ink/50" />
                                            )}
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Footer hint */}
                            <div className="px-5 py-3 border-t-[3px] border-ink/10 flex items-center justify-between">
                                <span className="font-mono text-[0.6rem] font-bold text-ink/30 uppercase tracking-wider">
                                    Navigate with ↑↓ • Enter to select • Esc to close
                                </span>
                                <kbd className="px-1.5 py-0.5 border-[2px] border-ink/10 font-mono text-[0.6rem] font-bold text-ink/30">
                                    ⌘K
                                </kbd>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
