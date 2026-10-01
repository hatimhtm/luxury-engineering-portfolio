"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.14, 1]);
    const y = useTransform(progress, range, [6, 0]);
    return (
        <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
            {word}
        </motion.span>
    );
}

/** A paragraph that lights up one word at a time as you scroll through it. */
export default function ScrubText({ text, className = "" }: { text: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
    const words = text.split(" ");
    if (reduce) return <p className={className}>{text}</p>;
    return (
        <p ref={ref} className={className} aria-label={text}>
            {words.map((w, i) => (
                <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
        </p>
    );
}
