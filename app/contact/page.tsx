"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ContactForm } from "@/components/contact/ContactForm";

import { useState } from "react";
import { ArrowUpRight, Mail, Send, Loader2, CheckCircle, MapPin, Clock, MessageCircle, Github, Linkedin, ChevronDown } from "lucide-react";
import { CircuitPattern, GridDots, CrossHatch } from "@/components/ui/Decorative";

/* ─── Data ─── */
const contactInfo = [
    { icon: <Mail size={18} />, label: "Email", value: "hatimelhassak.official@gmail.com", href: "mailto:hatimelhassak.official@gmail.com" },
    { icon: <MapPin size={18} />, label: "Location", value: "Philippines · Remote worldwide" },
    { icon: <Clock size={18} />, label: "Response", value: "Usually same day" },
    { icon: <MessageCircle size={18} />, label: "Languages", value: "English, French, Arabic, Mandarin" },
];

const faqs = [
    { q: "What's a typical turnaround?", a: "It depends on scope — a focused MVP usually lands in a week or two; a larger full-stack app runs 3–6 weeks. I give you a realistic estimate before we start and flag any slip the moment it's on the horizon." },
    { q: "Do you work with startups or established companies?", a: "Both. Most of my work is for solo founders and small teams, but I've also contracted with established businesses that needed a specific slice built fast. The process is the same either way." },
    { q: "What do you specialise in?", a: "Product engineering end-to-end: Next.js for web, SwiftUI for iOS, Python for backend and AI pipelines. I pick tools that fit the project, not the trend cycle." },
    { q: "Do you handle the whole thing, or just development?", a: "End-to-end — design direction, architecture, shipping, and post-launch support. If you have an existing designer or PM, I slot into their workflow; if you don't, I can run the whole loop." },
    { q: "How do you handle existing codebases?", a: "Read-before-rewrite. I'll start by understanding the repo's conventions, then ship changes as small PRs you can review. No surprise rewrites without a conversation first." },
];

/* ─── Animations ─── */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-cream pb-24">
            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/70 uppercase tracking-widest">secure://contact</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">Encrypted</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <section className="mt-8 md:mt-16 mb-8 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">Get in Touch</div>
                        <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                            Let&apos;s<br />Build
                        </h1>
                        <p className="font-mono text-sm md:text-base text-ink/85 max-w-xl leading-relaxed">
                            Tell me what you&apos;re working on — current state, what you need built,
                            and any deadline or constraint I should know about. I reply with a
                            realistic plan, not a pitch deck.
                        </p>
                    </motion.div>
                </section>

                <div className="grid lg:grid-cols-5 gap-5 mb-12 md:mb-20">
                    {/* ─── Form ─── */}
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>

                    {/* ─── Sidebar ─── */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Contact info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="neo-card bg-ink text-cream p-6 relative overflow-hidden gradient-top-accent"
                        >
                            <CircuitPattern className="absolute top-0 right-0 w-24 h-24 text-cream/5" />
                            <div className="relative z-10">
                                <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream/70 mb-4">Direct Lines</div>
                                <div className="space-y-4">
                                    {contactInfo.map((info) => (
                                        <div key={info.label} className="flex items-start gap-3">
                                            <div className="text-acid mt-0.5 flex-shrink-0">{info.icon}</div>
                                            <div>
                                                <div className="font-mono text-xs font-bold uppercase tracking-widest text-cream/70">{info.label}</div>
                                                {info.href ? (
                                                    <a href={info.href} className="font-mono text-sm font-bold text-cream hover:text-acid transition-colors break-all" rel="noopener noreferrer" target={info.href.startsWith("http") ? "_blank" : undefined}>
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <div className="font-mono text-sm font-bold text-cream">{info.value}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 gap-3"
                        >
                            <a
                                href="https://github.com/hatimhtm"
                                target="_blank" rel="noopener noreferrer"
                                className="neo-card bg-cream p-4 text-center font-mono text-sm font-bold uppercase hover:bg-ink hover:text-cream transition-all flex items-center justify-center gap-2 group"
                            >
                                <Github size={16} /> GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/hatim-elhassak/"
                                target="_blank" rel="noopener noreferrer"
                                className="neo-card bg-cream p-4 text-center font-mono text-sm font-bold uppercase hover:bg-electric hover:text-cream transition-all flex items-center justify-center gap-2 group"
                            >
                                <Linkedin size={16} /> LinkedIn
                            </a>
                        </motion.div>

                        {/* What to expect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="neo-card bg-acid text-ink p-5"
                        >
                            <div className="font-heading font-bold text-lg uppercase tracking-tight mb-2">What to expect</div>
                            <ul className="font-mono text-xs opacity-85 leading-relaxed space-y-1.5 list-disc list-inside">
                                <li>Reply within a working day</li>
                                <li>A call only if the project warrants one</li>
                                <li>A written plan with scope, timeline, and price</li>
                                <li>No NDA gatekeeping before I understand the work</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* ─── FAQ ─── */}
                <motion.section
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="mb-12 md:mb-20"
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">Common Questions</div>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6">FAQ</h2>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="neo-card w-full bg-cream p-5 text-left group"
                                >
                                    <div className="flex justify-between items-center gap-4">
                                        <h4 className="font-heading font-bold text-base uppercase tracking-tight group-hover:text-electric transition-colors">
                                            {faq.q}
                                        </h4>
                                        <ChevronDown
                                            size={18}
                                            className={`flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="font-mono text-sm text-ink/85 leading-relaxed mt-4 pt-4 border-t-[2px] border-ink/10">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
