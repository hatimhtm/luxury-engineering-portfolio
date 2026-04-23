"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { CircuitPattern, GridDots, CrossHatch } from "@/components/ui/Decorative";
import LiveTerminal from "@/components/ui/LiveTerminal";
import { Smartphone, Bot, Shield, Terminal, Code2, Zap, ArrowUpRight, Github, Mail, ChevronDown, Quote, Star, Linkedin } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCounting) return;
        let startTime: number | null = null;
        let animationFrame: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, startCounting]);

    return count;
}

/* ─── Animated Stat Component ─── */
function AnimatedStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useCounter(value, 2000, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="neo-card bg-ink text-cream p-4 md:p-6 text-center relative overflow-hidden neo-glow"
        >
            <div className="relative z-10">
                <div className="font-heading font-bold text-3xl md:text-4xl text-acid">
                    {count}{suffix}
                </div>
                <div className="font-mono text-[0.6rem] font-bold uppercase tracking-widest mt-1 text-cream/50">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Data ─── */
const techLogos = [
    "React", "Next.js", "TypeScript", "SwiftUI", "Python",
    "Node.js", "PostgreSQL", "OpenAI", "LangChain", "Docker",
    "Tailwind", "Framer Motion", "Redis", "Supabase", "FastAPI",
];

const BAR_HEIGHTS = Array.from({ length: 24 }, (_, i) => {
    // Deterministic pseudo-random generation for stable rendering
    const seed = (i + 1) * 0.5;
    const rand = Math.abs(Math.sin(seed * 123.45));
    return 20 + rand * 80;
});

const testimonials = [
    {
        quote: "Hatim delivered in 12 hours what our previous team quoted 3 weeks for. The quality was production-ready from day one.",
        author: "Client Feedback",
        role: "Startup Founder",
        accent: "bg-acid",
    },
    {
        quote: "His ability to go from concept to deployed product overnight is unlike anything I've seen. Fast, clean, and bulletproof.",
        author: "Client Feedback",
        role: "Product Manager",
        accent: "bg-electric",
    },
    {
        quote: "Working with Hatim felt like having a 10x engineer on retainer. He doesn't just code — he solves problems at speed.",
        author: "Client Feedback",
        role: "CTO, Tech Startup",
        accent: "bg-hotpink",
    },
];

/* ─── Stagger Animations ─── */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ─── Konami Code Easter Egg ─── */
function useKonamiCode(callback: () => void) {
    const sequence = [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
        "b", "a",
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === sequence[index]) {
                const next = index + 1;
                if (next === sequence.length) {
                    callback();
                    setIndex(0);
                } else {
                    setIndex(next);
                }
            } else {
                setIndex(0);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [index, callback]);
}

export default function Home() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const [konamiActive, setKonamiActive] = useState(false);
    useKonamiCode(() => setKonamiActive(true));

    return (
        <div className={`min-h-screen bg-cream pb-24 ${konamiActive ? "hue-rotate-180 transition-all duration-1000" : ""}`}>

            {/* ══════════════════════════════════════
                TOP MARQUEE
               ══════════════════════════════════════ */}
            <div className="w-full bg-acid border-b-[3px] border-ink py-2 overflow-hidden">
                <div className="marquee-container font-mono font-bold text-ink uppercase tracking-widest text-xs">
                    <div className="marquee-content animate-marquee">
                        <span className="px-4 md:px-6">FULL-STACK ENGINEER&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">SHIP IN HOURS NOT WEEKS&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">AI-POWERED&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">ANTI-BLOAT&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">FULL-STACK ENGINEER&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">SHIP IN HOURS NOT WEEKS&nbsp;///&nbsp;</span>
                    </div>
                    <div className="marquee-content animate-marquee" aria-hidden="true">
                        <span className="px-4 md:px-6">FULL-STACK ENGINEER&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">SHIP IN HOURS NOT WEEKS&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">AI-POWERED&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">ANTI-BLOAT&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">FULL-STACK ENGINEER&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">SHIP IN HOURS NOT WEEKS&nbsp;///&nbsp;</span>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
                HERO SECTION (Parallax)
               ══════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
                {/* Animated background blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-72 md:w-[500px] h-72 md:h-[500px] bg-acid/10 rounded-full blur-3xl animate-blob" />
                    <div className="absolute bottom-10 -left-20 w-60 md:w-[400px] h-60 md:h-[400px] bg-electric/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
                    <div className="absolute top-1/3 left-1/3 w-48 md:w-[300px] h-48 md:h-[300px] bg-hotpink/8 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full relative z-10">

                    <motion.div style={{ y: heroY, opacity: heroOpacity }}>
                        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <div className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-ink/50 mb-4">
                                    Portfolio / {new Date().getFullYear()}
                                </div>
                                <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase">
                                    Hatim<br />
                                    <span className="relative inline-block">
                                        El Hassak
                                        <span className="absolute -right-2 -top-2 md:-right-5 md:-top-5 w-5 h-5 md:w-8 md:h-8 bg-acid border-[3px] border-ink animate-spin-slow" />
                                    </span>
                                </h1>
                                <p className="font-mono text-sm md:text-lg font-bold text-ink/60 mt-6 max-w-xl leading-relaxed">
                                    Full-stack mercenary. I ship production-ready products in hours,
                                    not weeks. From native iOS to AI agents — if it needs to be built
                                    fast and built right, I&apos;m your guy.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col items-start md:items-end gap-4"
                            >
                                <a
                                    href="/contact"
                                    className="neo-card bg-ink text-cream px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-acid hover:text-ink transition-all group neo-glow"
                                >
                                    Start a Project
                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                                <div className="flex items-center gap-3 text-ink/30">
                                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Available for hire</span>
                                </div>
                            </motion.div>
                        </header>

                        {/* Scroll indicator */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="mt-12 md:mt-20 flex justify-center"
                        >
                            <ChevronDown size={24} className="text-ink/20" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                STATS STRIP
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-4 mb-12 md:mb-20 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <AnimatedStat value={5} suffix="+" label="Projects Shipped" />
                    <AnimatedStat value={12} suffix="h" label="Avg Delivery" />
                    <AnimatedStat value={5} suffix="+" label="Languages Spoken" />
                    <AnimatedStat value={3} suffix="+" label="Years Building" />
                </div>
            </section>

            {/* ══════════════════════════════════════
                ABOUT / BIO
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="grid md:grid-cols-5 gap-5">
                    {/* Photo card */}
                    <div className="md:col-span-2 neo-card bg-acid p-0 relative overflow-hidden min-h-[300px] md:min-h-[400px]">
                        <Image
                            src="/headshot.png"
                            alt="Hatim El Hassak"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
                            <div className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">Based in the Philippines</div>
                        </div>
                        {/* Corner decoration */}
                        <div className="absolute top-3 right-3 w-8 h-8 border-[3px] border-ink bg-acid animate-spin-slow" />
                    </div>

                    {/* Bio card */}
                    <div className="md:col-span-3 neo-card bg-cream p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                        <CrossHatch className="absolute top-0 right-0 w-32 h-32 text-ink" />
                        <div className="relative z-10">
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">About</div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6 leading-tight">
                                The Global<br />Mercenary
                            </h2>
                            <p className="font-mono text-sm md:text-base font-bold text-ink/70 leading-relaxed mb-4">
                                From the streets of Tangier to the universities of Nanchang to building
                                in the Philippines — I&apos;ve coded on borrowed computers and hustled for
                                every inch of ground. That hunger is baked into my work.
                            </p>
                            <p className="font-mono text-sm md:text-base font-bold text-ink/70 leading-relaxed">
                                I don&apos;t care about perfect academic code. I care about results.
                                SwiftUI on the front, Python and Node on the back, LLMs wherever
                                intelligence is needed. I am the driver; AI is the engine.
                                I don&apos;t prototype. I ship.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t-[3px] border-ink/10 relative z-10">
                            <a href="https://github.com/hatimhtm" target="_blank" className="neo-pill bg-ink text-cream hover:bg-acid hover:text-ink flex items-center gap-2">
                                <Github size={14} /> GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/hatim-elhassak/" target="_blank" className="neo-pill bg-ink text-cream hover:bg-electric hover:text-cream flex items-center gap-2">
                                <Linkedin size={14} /> LinkedIn
                            </a>
                            <a href="mailto:hatimelhassak.official@gmail.com" className="neo-pill bg-ink text-cream hover:bg-vivid hover:text-cream flex items-center gap-2">
                                <Mail size={14} /> Email
                            </a>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                LIVE TERMINAL
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Live Feed</div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight text-ink mb-4">System Status</h2>
                <LiveTerminal />
            </section>

            {/* ══════════════════════════════════════
                TECH LOGO MARQUEE
               ══════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="border-[3px] border-ink bg-ink py-4 overflow-hidden">
                    <div className="marquee-container font-mono font-bold text-cream/40 uppercase tracking-[0.3em] text-xs md:text-sm">
                        <div className="marquee-content animate-marquee" style={{ animationDuration: "30s" }}>
                            {techLogos.map((logo) => (
                                <span key={logo} className="px-6 md:px-8 hover:text-acid transition-colors">{logo}&nbsp;•&nbsp;</span>
                            ))}
                        </div>
                        <div className="marquee-content animate-marquee" aria-hidden="true" style={{ animationDuration: "30s" }}>
                            {techLogos.map((logo) => (
                                <span key={`dup-${logo}`} className="px-6 md:px-8">{logo}&nbsp;•&nbsp;</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
                BENTO GRID — PROJECTS
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-end justify-between mb-6"
                >
                    <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Featured</div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">Selected Work</h2>
                    </div>
                    <a href="/work" className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-electric transition-colors flex items-center gap-1 group">
                        View All <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </motion.div>

                <BentoGrid className="md:auto-rows-[18rem] gap-5">
                    {/* AG1 Dashboard */}
                    <BentoGridItem
                        index={0}
                        className="md:col-span-2 md:row-span-2"
                        title="AG1 Dashboard"
                        description="iOS 17 • SwiftUI • 60FPS Analytics"
                        bgColor="bg-electric"
                        textColor="text-cream"
                        icon={<Smartphone size={36} className="text-cream" />}
                        href="/work/ag1-dashboard"
                        header={
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[8rem] md:text-[14rem] font-heading font-bold tracking-tighter text-cream/8 leading-none select-none">iOS</span>
                            </div>
                        }
                    />

                    {/* EchoScribe */}
                    <BentoGridItem
                        index={1}
                        className="md:col-span-1 md:row-span-2"
                        title="EchoScribe"
                        description="AI Agent • Python • OpenAI"
                        bgColor="bg-hotpink"
                        textColor="text-cream"
                        icon={<Bot size={36} className="text-cream" />}
                        href="/work/echoscribe"
                        header={
                            <div className="h-full flex flex-col justify-center space-y-3 font-mono text-sm font-bold pl-3 border-l-[3px] border-cream/30 ml-4 mt-4">
                                <p className="text-cream/60">&gt; Audio Transcribed.</p>
                                <p className="text-cream/60">&gt; Summary Generated.</p>
                                <p className="text-cream/60">&gt; Sent to Slack.</p>
                                <p className="text-cream animate-blink">_</p>
                            </div>
                        }
                    />

                    {/* Fortress */}
                    <BentoGridItem
                        index={2}
                        className="md:col-span-1"
                        title="Fortress"
                        description="Security CLI • Python"
                        bgColor="bg-vivid"
                        textColor="text-cream"
                        icon={<Shield size={28} className="text-cream" />}
                        href="/work/fortress"
                        header={
                            <div className="absolute inset-0 pointer-events-none">
                                <CircuitPattern className="w-full h-full text-cream/10" />
                            </div>
                        }
                    />

                    {/* The Arsenal Link */}
                    <BentoGridItem
                        index={3}
                        className="md:col-span-1"
                        title="The Arsenal"
                        description="My full tech stack"
                        bgColor="bg-acid"
                        textColor="text-ink"
                        icon={<Terminal size={28} className="text-ink" />}
                        href="/stack"
                        header={
                            <div className="absolute top-3 right-3 animate-spin-slow">
                                <Code2 size={40} className="opacity-10 text-ink" />
                            </div>
                        }
                    />

                    {/* System status filler */}
                    <BentoGridItem
                        index={4}
                        className="md:col-span-1"
                        title=""
                        description=""
                        bgColor="bg-ink"
                        header={
                            <div className="h-full w-full flex flex-col justify-between p-4">
                                <div className="font-mono text-[0.6rem] font-bold text-cream/30 text-right tracking-widest uppercase">SYS://882-991-X</div>
                                <div className="flex justify-between items-end h-16 w-full gap-[2px]">
                                    {BAR_HEIGHTS.map((height, i) => (
                                        <div key={i} className="bg-acid/50 w-[3px] transition-all duration-300" style={{ height: `${height}%` }} />
                                    ))}
                                </div>
                                <div className="font-heading font-bold text-base text-cream uppercase tracking-tight">System Normal</div>
                            </div>
                        }
                    />
                </BentoGrid>
            </section>

            {/* ══════════════════════════════════════
                PHILOSOPHY / APPROACH
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="neo-card bg-ink text-cream p-6 md:p-12 relative overflow-hidden gradient-top-accent">
                    <CircuitPattern className="absolute top-0 right-0 w-48 md:w-80 h-48 md:h-80 text-cream/5" />
                    <GridDots className="absolute bottom-0 left-0 w-40 h-40 text-cream/5" />
                    {/* Subtle gradient glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-16">
                        <div>
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cream/30 mb-3">Philosophy</div>
                            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream leading-tight mb-6">
                                Anti-Bloat.<br /><span className="gradient-text-acid">Pro-Speed.</span>
                            </h2>
                            <p className="font-mono text-sm font-bold text-cream/60 leading-relaxed mb-6">
                                I hate inefficiency the way most people hate traffic.
                                While teams spend weeks debating architecture, I&apos;m already
                                shipping. Every hour of delay is an hour of lost insight.
                                I use AI not because I&apos;m lazy — but because I want to move
                                at the speed of thought. I am the driver; AI is the engine.
                            </p>
                            <div className="flex items-center gap-3 p-4 border-[3px] border-cream/10">
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

            {/* ══════════════════════════════════════
                TESTIMONIALS / SOCIAL PROOF
               ══════════════════════════════════════ */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Reputation</div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">What People Say</h2>

                <div className="grid md:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.div key={i} variants={fadeUp}>
                            <div className="neo-card bg-cream p-6 md:p-8 h-full flex flex-col relative overflow-hidden neo-glow group">
                                {/* Accent corner */}
                                <div className={`absolute top-0 left-0 w-16 h-16 ${t.accent} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity`} />
                                <div className="relative z-10 flex flex-col h-full">
                                    <Quote size={24} className="text-ink/10 mb-4 flex-shrink-0" />
                                    <p className="font-mono text-sm font-bold text-ink/70 leading-relaxed mb-6 flex-grow">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                    <div className="border-t-[3px] border-ink/10 pt-4">
                                        <div className="font-heading font-bold text-base uppercase tracking-tight">{t.author}</div>
                                        <div className="font-mono text-[0.65rem] font-bold text-ink/40 uppercase tracking-wider">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                SERVICES PREVIEW
               ══════════════════════════════════════ */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">What I Do</div>
                <div className="flex items-end justify-between mb-6">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">Services</h2>
                    <a href="/services" className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-vivid transition-colors flex items-center gap-1 group">
                        Details <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <motion.div variants={fadeUp}>
                        <div className="neo-card bg-acid text-ink p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent neo-glow">
                            <CrossHatch className="absolute top-0 right-0 w-24 h-24 text-ink opacity-50" />
                            <div className="relative z-10">
                                <Zap size={32} className="mb-4" />
                                <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">Velocity Launch</h3>
                                <p className="font-mono text-sm font-bold opacity-70 leading-relaxed mb-4">
                                    Production-ready MVPs in 12 hours. Full-stack, deployed, and converting.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {["Web App", "iOS", "API", "DB"].map((t) => (
                                        <span key={t} className="px-2 py-1 border-2 border-ink/30 font-mono text-[0.6rem] font-bold uppercase">{t}</span>
                                    ))}
                                </div>
                                <a href="/services" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                    Learn More <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                        <div className="neo-card bg-electric text-cream p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent neo-glow-blue">
                            <CircuitPattern className="absolute bottom-0 left-0 w-32 h-32 text-cream/10" />
                            <div className="relative z-10">
                                <Bot size={32} className="mb-4 text-acid" />
                                <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">AI Augmentation</h3>
                                <p className="font-mono text-sm font-bold opacity-70 leading-relaxed mb-4">
                                    LLM integration, custom agents, RAG pipelines. Intelligence built into every layer.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {["LLMs", "Agents", "RAG", "Fine-tune"].map((t) => (
                                        <span key={t} className="px-2 py-1 border-2 border-cream/30 font-mono text-[0.6rem] font-bold uppercase">{t}</span>
                                    ))}
                                </div>
                                <a href="/services" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                    Learn More <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                CTA SECTION
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
            >
                <div className="neo-card bg-hotpink text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                    <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
                    {/* Gradient glow */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-acid/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="font-heading font-bold text-3xl md:text-6xl uppercase tracking-tight mb-4">Ready to build?</h2>
                        <p className="font-mono text-sm md:text-base font-bold opacity-80 mb-4 max-w-xl mx-auto">
                            I&apos;m currently available for freelance projects, contract work, and high-velocity collaborations.
                            No BS. Just results.
                        </p>
                        <div className="flex items-center justify-center gap-2 mb-8 text-cream/60">
                            <Star size={14} className="text-acid" />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider">Average response time: &lt; 2 hours</span>
                            <Star size={14} className="text-acid" />
                        </div>
                        <a
                            href="/contact"
                            className="inline-block bg-cream text-ink font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all hover-shake"
                        >
                            Start a Project →
                        </a>
                    </div>
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                BOTTOM MARQUEE
               ══════════════════════════════════════ */}
            <div className="w-full bg-acid border-t-[3px] border-ink py-3 overflow-hidden">
                <div className="marquee-container font-mono font-bold text-ink uppercase tracking-widest text-sm">
                    <div className="marquee-content animate-marquee-reverse">
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                    </div>
                    <div className="marquee-content animate-marquee-reverse" aria-hidden="true">
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                    </div>
                </div>
            </div>

            {/* Easter egg - Konami code resets */}
            {konamiActive && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-[400] neo-card bg-acid text-ink px-6 py-3 font-mono text-sm font-bold uppercase"
                >
                    🎮 lord_decay mode activated
                    <button onClick={() => setKonamiActive(false)} className="ml-4 underline text-xs">dismiss</button>
                </motion.div>
            )}
        </div>
    );
}
