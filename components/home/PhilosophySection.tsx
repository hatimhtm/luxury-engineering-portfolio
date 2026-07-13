"use client";

export function PhilosophySection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="neo-card bg-ink text-cream p-6 md:p-12 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative z-10">
                    <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cream/70 mb-3">How I Work</div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream mb-6 leading-tight">
                            Small team,<br />
                            clear loop,<br />
                            <span className="text-vivid">real commits.</span>
                        </h2>
                        <p className="font-mono text-sm md:text-base text-cream/85 leading-relaxed mb-6">
                            I work the way a solo founder works: one person in the code, a direct
                            line for questions, and a running build you can click on any time.
                            No Jira theatre, no handoffs, no scope creep wrapped as process.
                        </p>
                        <div className="inline-flex items-center gap-3 p-4 border-[3px] border-cream/20">
                            <div className="w-3 h-3 bg-acid animate-pulse-dot flex-shrink-0" />
                            <span className="font-mono text-xs font-bold text-cream/75 uppercase tracking-wider">Currently taking new work</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { num: "01", title: "Brief", desc: "30-minute call to understand the product, users, constraints, and deadline." },
                            { num: "02", title: "Build", desc: "Heads-down engineering. Public repo from day one; you see every commit." },
                            { num: "03", title: "Ship", desc: "Production deploy, real users, real feedback — not a staging demo." },
                            { num: "04", title: "Support", desc: "Stay on-call for tweaks and bug fixes after launch. No ghosting." },
                        ].map((step, idx) => (
                            <div
                                key={step.num}
                                className="flex gap-4 items-start group reveal-up"
                                style={{ animationDelay: `${Math.min(idx * 0.06, 0.4)}s` }}
                            >
                                <div className="font-heading font-bold text-2xl md:text-3xl text-acid w-12 flex-shrink-0 group-hover:translate-x-1 transition-transform">{step.num}</div>
                                <div className="border-l-[3px] border-cream/20 pl-4 group-hover:border-acid/40 transition-colors">
                                    <div className="font-heading font-bold text-lg uppercase tracking-tight">{step.title}</div>
                                    <div className="font-mono text-xs text-cream/70 mt-1 leading-relaxed">{step.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
