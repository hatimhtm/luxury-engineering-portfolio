"use client";

import { motion } from "framer-motion";

const comparisonData = [
    { feature: "Average delivery time", agency: "4–8 weeks", me: "12–48 hours" },
    { feature: "Who does the work", agency: "Junior devs", me: "Me. Personally." },
    { feature: "Communication", agency: "Account managers", me: "Direct Slack/Email" },
    { feature: "Tech stack decisions", agency: "Whatever we know", me: "Best tool for the job" },
    { feature: "Post-launch support", agency: "Extra contract", me: "Included" },
    { feature: "AI capabilities", agency: "❌ No", me: "✅ Built-in" },
    { feature: "Bloat factor", agency: "High", me: "Zero" },
];

export function ComparisonSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
        >
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Why Me</div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-8">Me vs. An Agency</h2>

            <div className="neo-card bg-cream overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-3 bg-ink text-cream">
                    <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider border-r border-cream/10"></div>
                    <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-center border-r border-cream/10 text-cream/50">
                        Typical Agency
                    </div>
                    <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-center text-acid">
                        Hatim
                    </div>
                </div>

                {/* Rows */}
                {comparisonData.map((row, i) => (
                    <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-cream" : "bg-ink/[0.02]"} border-t-[2px] border-ink/10`}>
                        <div className="p-4 font-mono text-xs font-bold text-ink/60">{row.feature}</div>
                        <div className="p-4 font-mono text-xs font-bold text-ink/40 text-center border-x-[2px] border-ink/10">{row.agency}</div>
                        <div className="p-4 font-mono text-xs font-bold text-ink text-center">{row.me}</div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
