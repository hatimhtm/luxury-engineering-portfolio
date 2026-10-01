"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export type Step = { when: string; title: string; place: string; body: string };

/** A career line that draws itself as you scroll, with each stop lighting up as the line reaches it. */
export default function Timeline({ steps }: { steps: Step[] }) {
    const ref = useRef<HTMLOListElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
    const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
    return (
        <ol ref={ref} className="relative ml-3 md:ml-0">
            <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-[2px] rounded-full bg-ink/10 md:left-[calc(28%+7px)]" />
            <motion.span aria-hidden style={{ scaleY: reduce ? 1 : draw }} className="absolute bottom-2 left-[7px] top-2 w-[2px] origin-top rounded-full bg-accent md:left-[calc(28%+7px)]" />
            {steps.map((s, i) => (
                <motion.li
                    key={s.title + s.when}
                    initial={reduce ? false : { opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className="relative grid gap-2 pb-14 pl-10 md:grid-cols-[28%_1fr] md:gap-0 md:pl-0"
                >
                    <p className="text-[15px] font-semibold text-ink3 md:pr-10 md:pt-1 md:text-right">{s.when}</p>
                    <span aria-hidden className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-[3px] border-page bg-accent shadow-[0_0_0_4px_rgb(var(--accent)/0.15)] md:left-[28%]" />
                    <div className="md:pl-10">
                        <h3 className="display text-[1.9rem] text-ink md:text-[2.3rem]">{s.title}</h3>
                        <p className="mt-1 text-[15px] font-semibold text-ink2">{s.place}</p>
                        <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-ink2">{s.body}</p>
                    </div>
                </motion.li>
            ))}
        </ol>
    );
}
