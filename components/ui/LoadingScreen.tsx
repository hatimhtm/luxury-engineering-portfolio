"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Only show on first visit per session; never for reduced-motion users
        const hasVisited = sessionStorage.getItem("portfolio-loaded");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!hasVisited && !reducedMotion) {
            setShow(true);
            sessionStorage.setItem("portfolio-loaded", "true");
            const timer = setTimeout(() => setShow(false), 1400);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="fixed inset-0 z-[500] bg-ink flex items-center justify-center"
                >
                    <div className="text-center">
                        {/* Name animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="font-heading font-bold text-5xl md:text-7xl text-cream uppercase tracking-tighter">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                >
                                    Hatim
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.4 }}
                                    className="text-acid ml-3"
                                >
                                    .
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Loading bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-8 w-48 h-[3px] bg-cream/10 mx-auto overflow-hidden"
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.5,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="h-full w-full bg-gradient-to-r from-transparent via-acid to-transparent"
                            />
                        </motion.div>

                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.4 }}
                            className="mt-4 font-mono text-xs font-bold text-cream/30 uppercase tracking-[0.3em]"
                        >
                            Loading arsenal...
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
