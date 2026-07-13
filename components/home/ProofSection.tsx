"use client";

import { ArrowUpRight, Apple, Package, Github, Globe, Boxes } from "lucide-react";
import { projects, clientWorkCount } from "@/lib/projects";

/* Every item below is independently verifiable by clicking it —
   evidence instead of testimonials. */
const receipts = [
    {
        icon: <Apple size={18} />,
        label: "TryIt",
        value: "Live on the App Store",
        href: "https://apps.apple.com/app/id6761598749",
        accent: "bg-acid",
    },
    {
        icon: <Apple size={18} />,
        label: "GoPilates",
        value: "Live on the App Store",
        href: "https://apps.apple.com/us/app/gopilates-app/id6760300479",
        accent: "bg-hotpink",
    },
    {
        icon: <Package size={18} />,
        label: "Relay v1.0.7",
        value: "Shipped · signed Sparkle updates",
        href: "https://github.com/hatimhtm/Relay/releases/latest",
        accent: "bg-electric",
    },
    {
        icon: <Package size={18} />,
        label: "Fader v1.2 · Deck v1.1.6 · Eli",
        value: "Native macOS · public releases",
        href: "https://github.com/hatimhtm?tab=repositories",
        accent: "bg-vivid",
    },
    {
        icon: <Boxes size={18} />,
        label: "Fortress",
        value: "pip install fortress · PyPI",
        href: "https://pypi.org/project/fortress/",
        accent: "bg-acid",
    },
    {
        icon: <Globe size={18} />,
        label: `${clientWorkCount} client builds`,
        value: "Shipped for real clients · live links",
        href: "/work#client",
        accent: "bg-hotpink",
    },
    {
        icon: <Github size={18} />,
        label: "The commits",
        value: "Most of it public — read the source",
        href: "https://github.com/hatimhtm",
        accent: "bg-electric",
    },
    {
        icon: <Boxes size={18} />,
        label: `${projects.length} shipped projects`,
        value: "Every one documented as a case study",
        href: "/work",
        accent: "bg-vivid",
    },
];

export function ProofSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
            <div className="reveal-up">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">Proof, not promises</div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-2">The Receipts</h2>
                <p className="font-mono text-sm text-ink/70 max-w-xl leading-relaxed mb-8">
                    No borrowed praise. Every claim on this site is a link you can click
                    and check yourself.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {receipts.map((r, i) => (
                    <a
                        key={r.label}
                        href={r.href}
                        target={r.href.startsWith("http") ? "_blank" : undefined}
                        rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="neo-card bg-cream p-5 group relative overflow-hidden reveal-up"
                        style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}
                    >
                        <div className={`absolute top-0 left-0 w-full h-1 ${r.accent}`} />
                        <div className="flex items-start justify-between gap-2">
                            <div className="text-ink/70 group-hover:text-ink transition-colors">{r.icon}</div>
                            <ArrowUpRight
                                size={16}
                                className="text-ink/30 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                            />
                        </div>
                        <div className="mt-4 font-heading font-bold text-base uppercase tracking-tight text-ink leading-tight">
                            {r.label}
                        </div>
                        <div className="mt-1 font-mono text-xs font-bold text-ink/60 uppercase tracking-wider leading-relaxed">
                            {r.value}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
