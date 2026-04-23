"use client";

import LiveTerminal from "@/components/ui/LiveTerminal";

export default function LiveTerminalSection() {
    return (
        <>
            {/* ══════════════════════════════════════
                LIVE TERMINAL
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Live Feed</div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight text-ink mb-4">System Status</h2>
                <LiveTerminal />
            </section>

        </>
    );
}
