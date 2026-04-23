import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { stagger, fadeUp } from "./animations";

const testimonials = [
    {
        quote: "Hatim built GoPilates and TryIt end-to-end. He ships fast without cutting corners — the kind of engineer you want in the room when a deadline is moving.",
        author: "Max",
        role: "Founder, GoPilates",
        accent: "bg-acid",
    },
    {
        quote: "LessonForge saved me from juggling tabs. Hatim built exactly what I described, and then some — everything works offline, which matters when you're teaching between time zones.",
        author: "Narcylyn Esguerra",
        role: "Language Teacher",
        accent: "bg-electric",
    },
    {
        quote: "ScriptDeck changed how we run calls. Rebuttals, step tracking, analytics — all in one tool, all keyboard-driven. Hatim got the workflow in one conversation.",
        author: "Winbel Capina",
        role: "Operations, Infinite Contact Solutions",
        accent: "bg-hotpink",
    },
    {
        quote: "Hatim built our internal dashboard under a tight window. Clean code, no drama, and he stays available when things need tweaking after shipping.",
        author: "Kamal Maya",
        role: "Founder, China Global Study",
        accent: "bg-vivid",
    },
    {
        quote: "I worked with Hatim on an AI tool before ChatGPT made this space hot. He was already building agent workflows when most devs didn't know what a token was.",
        author: "Michael Jamal Smith",
        role: "Engineer / Collaborator",
        accent: "bg-acid",
    },
];

export function TestimonialsSection() {
    return (
        <motion.section
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
        >
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">What clients say</div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-8">In Their Words</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map((t, i) => (
                    <motion.div key={i} variants={fadeUp}>
                        <div className="neo-card bg-cream p-6 md:p-7 h-full flex flex-col relative overflow-hidden neo-glow group">
                            <div className={`absolute top-0 left-0 w-16 h-16 ${t.accent} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity`} />
                            <div className="relative z-10 flex flex-col h-full">
                                <Quote size={22} className="text-ink/20 mb-4 flex-shrink-0" />
                                <p className="font-mono text-sm text-ink/80 leading-relaxed mb-6 flex-grow">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="border-t-[3px] border-ink/10 pt-4">
                                    <div className="font-heading font-bold text-base uppercase tracking-tight text-ink">{t.author}</div>
                                    <div className="font-mono text-xs font-bold text-ink/60 uppercase tracking-wider mt-0.5">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
