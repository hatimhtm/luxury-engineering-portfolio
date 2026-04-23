"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const commands = [
    { prompt: "$ deploying echoscribe", result: "✓ Live on production", delay: 0 },
    { prompt: "$ running fortress --scan", result: "✓ 0 vulnerabilities found", delay: 800 },
    { prompt: "$ building ag1-dashboard", result: "✓ 60fps. Shipped.", delay: 1600 },
    { prompt: "$ initializing lord_decay", result: "✓ Ready to build", delay: 2400 },
];

export default function LiveTerminal() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [visibleLines, setVisibleLines] = useState(0);
    const [typedChars, setTypedChars] = useState<number[]>([]);

    useEffect(() => {
        if (!isInView) return;

        const timeouts: ReturnType<typeof setTimeout>[] = [];
        const intervals: ReturnType<typeof setInterval>[] = [];

        commands.forEach((cmd, i) => {
            // Start typing prompt
            const timeoutId = setTimeout(() => {
                setVisibleLines(i + 1);
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    charIndex++;
                    setTypedChars((prev) => {
                        const newArr = [...prev];
                        newArr[i] = charIndex;
                        return newArr;
                    });
                    if (charIndex >= cmd.prompt.length) {
                        clearInterval(typeInterval);
                    }
                }, 30);
                intervals.push(typeInterval);
            }, cmd.delay);
            timeouts.push(timeoutId);
        });

        return () => {
            timeouts.forEach((t) => clearTimeout(t));
            intervals.forEach((t) => clearInterval(t));
        };
    }, [isInView]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="neo-card bg-ink text-cream p-5 md:p-6 font-mono text-xs md:text-sm relative overflow-hidden"
        >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cream/10">
                <div className="w-2.5 h-2.5 bg-hotpink" />
                <div className="w-2.5 h-2.5 bg-acid" />
                <div className="w-2.5 h-2.5 bg-electric" />
                <span className="ml-2 text-cream/30 text-[0.6rem] uppercase tracking-widest">lord_decay@arsenal</span>
            </div>

            {/* Lines */}
            <div className="space-y-2">
                {commands.slice(0, visibleLines).map((cmd, i) => {
                    const chars = typedChars[i] || 0;
                    const promptText = cmd.prompt.slice(0, chars);
                    const isComplete = chars >= cmd.prompt.length;

                    return (
                        <div key={i}>
                            <div className="flex items-start gap-0">
                                <span className="text-acid font-bold select-none">{promptText}</span>
                                {!isComplete && (
                                    <span className="inline-block w-2 h-4 bg-acid animate-blink ml-0.5" />
                                )}
                            </div>
                            {isComplete && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    className="text-cream/50 mt-0.5 pl-2"
                                >
                                    {cmd.result}
                                </motion.div>
                            )}
                        </div>
                    );
                })}

                {/* Blinking cursor at end */}
                {visibleLines >= commands.length && (typedChars[commands.length - 1] || 0) >= commands[commands.length - 1].prompt.length && (
                    <div className="flex items-center gap-1 mt-2">
                        <span className="text-acid">$</span>
                        <span className="inline-block w-2 h-4 bg-acid animate-blink" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
