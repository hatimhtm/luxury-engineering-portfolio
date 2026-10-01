"use client";

import { useState } from "react";
import { EMAIL } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field = "mt-2 w-full rounded-2xl border border-hairline bg-raised px-4 py-3.5 text-[16px] text-ink placeholder:text-ink3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [form, setForm] = useState({ name: "", email: "", brief: "" });
    const valid = form.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.brief.trim().length > 10;

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!valid || status === "sending") return;
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, budget: "" }),
            });
            setStatus(res.ok ? "sent" : "error");
        } catch {
            setStatus("error");
        }
    }

    if (status === "sent") {
        return (
            <div className="rounded-[28px] border border-hairline bg-raised p-8 md:p-10" role="status">
                <h2 className="text-[1.6rem] font-bold tracking-title">Message sent.</h2>
                <p className="mt-2 text-[16px] leading-relaxed text-ink2">I read every message and reply the same day, from {EMAIL}.</p>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="rounded-[28px] border border-hairline bg-raised p-7 md:p-9" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-[15px] font-semibold">
                    Your name
                    <input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" required maxLength={100} />
                </label>
                <label className="block text-[15px] font-semibold">
                    Email
                    <input className={field} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" required maxLength={200} />
                </label>
            </div>
            <label className="mt-5 block text-[15px] font-semibold">
                What are you building?
                <textarea className={`${field} min-h-[160px] resize-y`} value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} required maxLength={5000} />
                <span className="mt-2 block text-[13.5px] font-normal text-ink3">The product, the platform, and when you need it.</span>
            </label>
            {status === "error" && (
                <p className="mt-4 text-[15px] text-red-700 dark:text-red-400" role="alert">
                    That didn&apos;t send. Try again, or write to {EMAIL}.
                </p>
            )}
            <button type="submit" disabled={!valid || status === "sending"} className="pill pill-accent mt-6 disabled:cursor-not-allowed disabled:opacity-50">
                {status === "sending" ? "Sending" : "Send message"}
            </button>
        </form>
    );
}
