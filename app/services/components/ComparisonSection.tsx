"use client";

import { motion } from "framer-motion";

const comparisonData = [
    { feature: "Delivery shape", agency: "4–8 weeks", me: "Days to a few weeks, scope-dependent" },
    { feature: "Who does the work", agency: "Whoever's billable", me: "Me, personally, every commit" },
    { feature: "Communication", agency: "Via an account manager", me: "Direct: Slack, email, or a call" },
    { feature: "Stack decisions", agency: "Their standard kit", me: "Right tool for this project" },
    { feature: "Post-launch support", agency: "Billed separately", me: "Included in the engagement" },
    { feature: "AI capabilities", agency: "Subcontracted", me: "In-house, from scratch" },
    { feature: "Overhead", agency: "High (management layer)", me: "None — no middleware" },
];

export function ComparisonSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
        >
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">Trade-offs</div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-8">Solo vs. Agency</h2>

            <div className="neo-card bg-cream overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-3 bg-ink text-cream">
                    <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider border-r border-cream/20"></div>
                    <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-center border-r border-cream/20 text-cream/80">
                        Typical Agency
                    </div>
                    <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-center text-acid">
                        Hatim
                    </div>
                </div>

                {/* Rows */}
                {comparisonData.map((row, i) => (
                    <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-cream" : "bg-ink/[0.04]"} border-t-[2px] border-ink/10`}>
                        <div className="p-4 font-mono text-xs md:text-sm font-bold text-ink">{row.feature}</div>
                        <div className="p-4 font-mono text-xs md:text-sm text-ink/75 text-center border-x-[2px] border-ink/10">{row.agency}</div>
                        <div className="p-4 font-mono text-xs md:text-sm font-bold text-ink text-center">{row.me}</div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
