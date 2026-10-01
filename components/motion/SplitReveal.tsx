"use client";

import { motion, useReducedMotion } from "framer-motion";

/** A heading that rises word by word from behind a mask when it scrolls into view. */
export default function SplitReveal({ text, as = "h2", className = "", delay = 0, id }: { text: string; as?: "h1" | "h2" | "h3" | "p"; className?: string; delay?: number; id?: string }) {
    const reduce = useReducedMotion();
    const Tag = motion[as];
    const words = text.split(" ");
    return (
        <Tag id={id} className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.4 }} aria-label={text}>
            {words.map((w, i) => (
                <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
                    <motion.span
                        className="inline-block"
                        variants={reduce ? undefined : { hidden: { y: "105%", rotate: 4 }, shown: { y: "0%", rotate: 0 } }}
                        transition={{ duration: 0.85, delay: delay + i * 0.055, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {w}
                        {i < words.length - 1 ? " " : ""}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}
