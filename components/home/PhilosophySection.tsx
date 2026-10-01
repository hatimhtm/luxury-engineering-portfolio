"use client";

export function PhilosophySection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="neo-card bg-ink text-cream p-6 md:p-12 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative z-10">
                    <div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream mb-6 leading-tight">
                            Small team,<br />
                            clear loop,<br />
                            <span className="text-acid">real commits.</span>
                        </h2>
                        <p className="font-sans text-sm md:text-base text-cream/85 leading-relaxed mb-6">
                            Solo or inside your team, the loop is the same: a direct line for
                            questions, a written update every day, and a running build you can
                            click on any time. I work in your tools and hand over cleanly.
                        </p>
                        <div className="inline-flex items-center gap-3 p-4 border-[3px] border-cream/20">
                            <div className="w-3 h-3 bg-acid animate-pulse-dot flex-shrink-0" />
                            <span className="font-mono text-xs font-bold text-cream/75 uppercase tracking-wider">Currently taking new work</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { num: "01", title: "Brief", desc: "A 30-minute call to understand the product, users, constraints and deadline." },
                            { num: "02", title: "Build", desc: "Heads-down engineering in a shared repo from day one. You see every commit." },
                            { num: "03", title: "Ship", desc: "Production deploy, real users, real feedback, not a staging demo." },
                            { num: "04", title: "Support", desc: "On call for fixes after launch, and a written handover whenever you need one." },
                        ].map((step, idx) => (
                            <div
                                key={step.title}
                                className="flex gap-4 items-start group reveal-up"
                                style={{ animationDelay: `${Math.min(idx * 0.06, 0.4)}s` }}
                            >
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
