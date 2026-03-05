import { motion } from "framer-motion";

export function PhilosophySection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
        >
            <div className="neo-card bg-ink text-cream p-6 md:p-12 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative z-10">
                    <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cream/40 mb-3">Methodology</div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream mb-6 leading-tight">
                            Build fast.<br />
                            Don&apos;t break<br />
                            <span className="text-vivid">things.</span>
                        </h2>
                        <p className="font-mono text-sm md:text-base font-bold text-cream/70 leading-relaxed mb-6">
                            The &quot;move fast and break things&quot; era is over. Today, you need to move fast and
                            ship bulletproof software. My methodology combines extreme velocity with
                            military-grade reliability.
                        </p>
                        <div className="inline-flex items-center gap-3 p-4 border-[3px] border-cream/10">
                            <div className="w-3 h-3 bg-acid animate-pulse-dot flex-shrink-0" />
                            <span className="font-mono text-xs font-bold text-cream/40 uppercase tracking-wider">Currently shipping at full velocity</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { num: "01", title: "Brief", desc: "30-min call. I understand your vision, constraints, and timeline." },
                            { num: "02", title: "Build", desc: "Heads-down engineering. Real commits, not slide decks." },
                            { num: "03", title: "Ship", desc: "Production deployment. Real users, real feedback." },
                            { num: "04", title: "Scale", desc: "Optimize, iterate, and grow based on data." },
                        ].map((step, idx) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                className="flex gap-4 items-start group"
                            >
                                <div className="font-heading font-bold text-2xl md:text-3xl text-acid w-12 flex-shrink-0 group-hover:translate-x-1 transition-transform">{step.num}</div>
                                <div className="border-l-[3px] border-cream/10 pl-4 group-hover:border-acid/40 transition-colors">
                                    <div className="font-heading font-bold text-lg uppercase tracking-tight">{step.title}</div>
                                    <div className="font-mono text-xs font-bold text-cream/40 mt-1">{step.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
