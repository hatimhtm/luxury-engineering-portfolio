"use client";

import { motion } from "framer-motion";

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProcessSection() {
    return (
        <motion.section
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
        >
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">How It Works</div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-8">The Process</h2>

            <div className="grid md:grid-cols-4 gap-5">
                {[
                    { num: "01", title: "Brief", desc: "30-min call. We align on scope, stack, and timeline. No fluff, no PowerPoints.", color: "bg-acid", textColor: "text-ink" },
                    { num: "02", title: "Build", desc: "Heads-down engineering. You get daily updates and a staging link from day one.", color: "bg-ink", textColor: "text-cream" },
                    { num: "03", title: "Ship", desc: "Production deployment with CI/CD, monitoring, and domain setup. Real users from day one.", color: "bg-electric", textColor: "text-cream" },
                    { num: "04", title: "Scale", desc: "Post-launch support. I optimize based on real data, not assumptions.", color: "bg-hotpink", textColor: "text-cream" },
                ].map((step) => (
                    <motion.div key={step.num} variants={fadeUp}>
                        <div className={`neo-card ${step.color} ${step.textColor} p-6 h-full relative overflow-hidden`}>
                            <div className="absolute top-3 right-3 font-heading font-bold text-4xl opacity-10 select-none">{step.num}</div>
                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-xl uppercase tracking-tight mb-3">{step.title}</h3>
                                <p className="font-mono text-xs font-bold opacity-70 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
