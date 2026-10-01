"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Every page rises in a little when you arrive on it. */
export default function Template({ children }: { children: React.ReactNode }) {
    const reduce = useReducedMotion();
    return (
        <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}>
            {children}
        </motion.div>
    );
}
