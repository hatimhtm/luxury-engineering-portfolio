"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Github, Loader2, Send, Mail } from "lucide-react";
import { CrossHatch } from "@/components/ui/Decorative";

const budgetOptions = ["< $5k", "$5k – $10k", "$10k – $25k", "$25k+", "Not sure yet"];

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        budget: "",
        brief: "",
    });

    const isValid =
        formData.name.trim().length > 1 &&
        formData.email.includes("@") &&
        formData.email.includes(".") &&
        formData.brief.trim().length > 10;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

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
            setError("Something went wrong. Please try again — or email me directly.");
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
                    className="neo-card bg-acid text-ink p-8 md:p-12 text-center min-h-[420px] flex flex-col items-center justify-center"
                >
                    <CheckCircle size={48} className="mb-4" />
                    <h3 className="font-heading font-bold text-3xl uppercase tracking-tight mb-3">
                        Message sent
                    </h3>
                    <p className="font-mono text-sm opacity-85 max-w-sm mx-auto leading-relaxed">
                        I&apos;ll get back to you shortly. In the meantime, browse the work or
                        poke around the repos.
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
                <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="neo-card bg-cream p-6 md:p-8 relative overflow-hidden"
                >
                    <CrossHatch className="absolute top-0 right-0 w-24 h-24 text-ink opacity-[0.03]" />

                    {/* Prominent direct-email option */}
                    <div className="relative z-10 mb-6 p-4 border-[3px] border-ink/15 bg-ink/[0.02] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink/70 mb-1">
                                Prefer email?
                            </div>
                            <div className="font-mono text-sm text-ink/85">
                                Skip the form and write to me directly.
                            </div>
                        </div>
                        <a
                            href="mailto:hatimelhassak.official@gmail.com?subject=New%20project%20enquiry"
                            className="inline-flex items-center gap-2 bg-ink text-cream px-4 py-2.5 font-heading font-bold text-sm uppercase tracking-wider hover:bg-acid hover:text-ink transition-colors flex-shrink-0"
                        >
                            <Mail size={16} /> Email Direct
                        </a>
                    </div>

                    <div className="relative z-10 space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink/70 mb-2 block">
                                    Your name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Jane Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-transparent border-[3px] border-ink/15 focus:border-acid outline-none font-mono text-base p-3 transition-colors placeholder:text-ink/30"
                                />
                            </div>
                            <div>
                                <label className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink/70 mb-2 block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="jane@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-transparent border-[3px] border-ink/15 focus:border-acid outline-none font-mono text-base p-3 transition-colors placeholder:text-ink/30"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink/70 mb-2 block">
                                Budget range (optional)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                {budgetOptions.map((b) => {
                                    const selected = formData.budget === b;
                                    return (
                                        <button
                                            type="button"
                                            key={b}
                                            onClick={() => setFormData({ ...formData, budget: selected ? "" : b })}
                                            className={`p-2.5 border-[3px] font-mono text-xs font-bold text-center transition-all ${selected
                                                    ? "bg-acid text-ink border-acid"
                                                    : "bg-cream text-ink/80 border-ink/15 hover:border-ink/40"
                                                }`}
                                        >
                                            {b}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink/70 mb-2 block">
                                Tell me about the project
                            </label>
                            <textarea
                                placeholder="What are you building? What problem does it solve? Any existing stack or constraints?"
                                value={formData.brief}
                                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                                rows={6}
                                className="w-full bg-transparent border-[3px] border-ink/15 focus:border-acid outline-none font-mono text-sm p-3 transition-colors placeholder:text-ink/30 resize-none"
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-3 bg-hotpink/10 border-[3px] border-hotpink/40 font-mono text-sm text-hotpink"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className={`w-full sm:w-auto neo-card px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all ${isValid && !isSubmitting
                                    ? "bg-acid text-ink hover:shadow-neo"
                                    : "bg-ink/10 text-ink/40 cursor-not-allowed"
                                }`}
                        >
                            {isSubmitting ? (
                                <><Loader2 size={16} className="animate-spin" /> Sending...</>
                            ) : (
                                <><Send size={16} /> Send Message</>
                            )}
                        </button>
                    </div>
                </motion.form>
            )}
        </AnimatePresence>
    );
}
