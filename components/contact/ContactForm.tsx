"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle, Github, Loader2, Send } from "lucide-react";
import { CrossHatch } from "@/components/ui/Decorative";

const budgetOptions = ["< $5k", "$5k - $10k", "$10k - $25k", "$25k+"];

export function ContactForm() {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        budget: "",
        brief: "",
    });

    const canAdvance = () => {
        if (step === 0) return formData.name.length > 2;
        if (step === 1) return formData.email.includes("@") && formData.email.includes(".");
        if (step === 2) return formData.budget !== "";
        if (step === 3) return formData.brief.length > 10;
        return false;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canAdvance()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to send message");

            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again or email me directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence mode="wait">
            {isSuccess ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="neo-card bg-acid text-ink p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center"
                >
                    <CheckCircle size={48} className="mb-4" />
                    <h3 className="font-heading font-bold text-3xl uppercase tracking-tight mb-3">
                        Message Sent!
                    </h3>
                    <p className="font-mono text-sm font-bold opacity-70 max-w-sm mx-auto">
                        I&apos;ll get back to you within 2 hours. In the meantime, check out my work
                        or stalk my GitHub.
                    </p>
                    <div className="flex gap-3 mt-6">
                        <a href="/work" className="neo-card bg-ink text-cream px-4 py-2 font-mono text-sm font-bold uppercase">
                            View Work
                        </a>
                        <a href="https://github.com/hatimhtm" target="_blank" rel="noopener noreferrer" className="neo-card bg-ink text-cream px-4 py-2 font-mono text-sm font-bold uppercase flex items-center gap-2">
                            <Github size={14} /> GitHub
                        </a>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="neo-card bg-cream p-6 md:p-8 relative overflow-hidden"
                >
                    <CrossHatch className="absolute top-0 right-0 w-24 h-24 text-ink opacity-[0.03]" />

                    {/* Step indicator */}
                    <div className="flex gap-2 mb-8">
                        {[0, 1, 2, 3].map((s) => (
                            <div key={s} className={`h-1 flex-1 transition-colors ${s <= step ? "bg-acid" : "bg-ink/10"}`} />
                        ))}
                    </div>

                    {/* Step label */}
                    <div className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ink/30 mb-2">
                        Step {step + 1} of 4
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 className="font-heading font-bold text-2xl uppercase tracking-tight mb-6">
                                    What&apos;s your name?
                                </h3>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-transparent border-b-[3px] border-ink/20 focus:border-acid outline-none font-mono text-lg font-bold py-3 transition-colors placeholder:text-ink/20"
                                    autoFocus
                                    onKeyDown={(e) => e.key === "Enter" && canAdvance() && setStep(1)}
                                />
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 className="font-heading font-bold text-2xl uppercase tracking-tight mb-6">
                                    Your email?
                                </h3>
                                <input
                                    type="email"
                                    placeholder="hello@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-transparent border-b-[3px] border-ink/20 focus:border-acid outline-none font-mono text-lg font-bold py-3 transition-colors placeholder:text-ink/20"
                                    autoFocus
                                    onKeyDown={(e) => e.key === "Enter" && canAdvance() && setStep(2)}
                                />
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 className="font-heading font-bold text-2xl uppercase tracking-tight mb-6">
                                    What&apos;s your budget?
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {budgetOptions.map((b) => (
                                        <button
                                            key={b}
                                            onClick={() => setFormData({ ...formData, budget: b })}
                                            className={`neo-card p-4 font-mono text-sm font-bold text-left transition-all ${formData.budget === b
                                                    ? "bg-acid text-ink border-acid"
                                                    : "bg-cream text-ink hover:bg-ink/5"
                                                }`}
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 className="font-heading font-bold text-2xl uppercase tracking-tight mb-6">
                                    Tell me about the project
                                </h3>
                                <textarea
                                    placeholder="What are you building? What problem does it solve? Any tech preferences?"
                                    value={formData.brief}
                                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                                    rows={6}
                                    className="w-full bg-transparent border-[3px] border-ink/10 focus:border-acid outline-none font-mono text-sm font-bold p-4 transition-colors placeholder:text-ink/20 resize-none"
                                    autoFocus
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 p-4 bg-red-500/10 text-red-500 font-mono text-sm font-bold border-l-[3px] border-red-500"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t-[3px] border-ink/10">
                        <button
                            onClick={() => setStep(Math.max(0, step - 1))}
                            disabled={step === 0}
                            className={`font-mono text-sm font-bold uppercase transition-colors ${step === 0 ? "text-ink/20 pointer-events-none" : "text-ink/40 hover:text-ink"
                                }`}
                        >
                            ← Back
                        </button>

                        {step < 3 ? (
                            <button
                                onClick={() => canAdvance() && setStep(step + 1)}
                                disabled={!canAdvance()}
                                className={`neo-card px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all ${canAdvance()
                                        ? "bg-ink text-cream hover:bg-acid hover:text-ink"
                                        : "bg-ink/20 text-ink/30 cursor-not-allowed"
                                    }`}
                            >
                                Next <ArrowUpRight size={14} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!canAdvance() || isSubmitting}
                                className={`neo-card px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all ${canAdvance() && !isSubmitting
                                        ? "bg-acid text-ink hover:shadow-neo"
                                        : "bg-ink/20 text-ink/30 cursor-not-allowed"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                                ) : (
                                    <><Send size={16} /> Send Message</>
                                )}
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
