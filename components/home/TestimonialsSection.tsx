import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { stagger, fadeUp } from "./animations";

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

export function TestimonialsSection() {
    return (
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
    );
}
