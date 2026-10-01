import type { Metadata } from "next";
import Reveal from "@/components/v2/Reveal";
import { BOOK_CALL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Services",
    description: "Three ways to work with Hatim El Hassak: inside your team, on a whole app, or on one well-scoped job.",
};

const WAYS = [
    {
        title: "Join your team",
        body: "An iOS engineer on your client's project, working in your repo and tools, with a written update every day and live hours on European mornings. Monthly.",
    },
    {
        title: "Build a whole app",
        body: "From the first screen to the App Store and Google Play: design, subscriptions, analytics, the back end it needs, and the release.",
    },
    {
        title: "One well-scoped job",
        body: "An audit, a migration, an App Review rejection, a feature or a performance problem. A clear result and a date.",
    },
];

const STEPS = [
    ["A 30-minute call", "Your product, your users, the deadline, and what done looks like."],
    ["A small first task", "Half a day of real work, so you can judge it before you commit."],
    ["The work", "Small pull requests, a daily written update, and a build you can open any time."],
    ["The handover", "Docs, access and the weak spots, written down, whenever you need them."],
];

export default function ServicesPage() {
    return (
        <div className="mx-auto max-w-page px-6 pt-32 md:px-12 md:pt-40">
            <h1 className="text-[2.8rem] font-bold leading-[1.02] tracking-display md:text-[4rem]">Services</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink2">Three ways to work together. Agencies usually start with the first.</p>

            <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5">
                <Reveal className="md:col-span-7">
                    <div className="h-full rounded-[28px] bg-accent/[0.08] p-8 ring-1 ring-inset ring-accent/15 md:p-10">
                        <h2 className="text-[2rem] font-bold tracking-title">{WAYS[0].title}</h2>
                        <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-ink2">{WAYS[0].body}</p>
                        <ul className="mt-8 grid gap-3 text-[16px] font-medium sm:grid-cols-3">
                            <li className="rounded-2xl bg-page/70 px-4 py-3">Your repo, your tools</li>
                            <li className="rounded-2xl bg-page/70 px-4 py-3">A written update daily</li>
                            <li className="rounded-2xl bg-page/70 px-4 py-3">Live 3 to 7 PM Manila</li>
                        </ul>
                    </div>
                </Reveal>
                <div className="grid gap-4 md:col-span-5 md:gap-5">
                    {WAYS.slice(1).map((w, i) => (
                        <Reveal key={w.title} delay={0.05 + i * 0.04}>
                            <div className="h-full rounded-[28px] border border-hairline bg-raised p-7 md:p-8">
                                <h2 className="text-[1.5rem] font-bold tracking-title">{w.title}</h2>
                                <p className="mt-2 text-[16px] leading-relaxed text-ink2">{w.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            <section className="mt-28" aria-labelledby="steps-title">
                <Reveal>
                    <h2 id="steps-title" className="text-[2.2rem] font-bold tracking-title md:text-[2.7rem]">How a project runs</h2>
                </Reveal>
                <ol className="mt-10 grid gap-8 md:grid-cols-4">
                    {STEPS.map(([t, d], i) => (
                        <Reveal key={t} delay={i * 0.05}>
                            <li className="border-t-2 border-ink pt-5">
                                <span className="text-sm font-bold text-accent">{i + 1}</span>
                                <h3 className="mt-1 text-[1.2rem] font-bold">{t}</h3>
                                <p className="mt-2 text-[15.5px] leading-relaxed text-ink2">{d}</p>
                            </li>
                        </Reveal>
                    ))}
                </ol>
            </section>

            <Reveal className="mt-24">
                <div className="glass flex flex-col items-start justify-between gap-6 rounded-[30px] p-8 md:flex-row md:items-center md:p-10">
                    <p className="text-[1.5rem] font-bold leading-snug tracking-title">Tell me what you&apos;re building.</p>
                    <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="pill pill-accent">Book a call</a>
                </div>
            </Reveal>
        </div>
    );
}
