import type { Metadata } from "next";
import Reveal from "@/components/v2/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
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
        <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-32 md:px-10 md:pt-40">
            <SplitReveal as="h1" text="Services" className="display text-[4.2rem] text-ink md:text-[8rem]" />
            <Reveal delay={0.3}><p className="mt-2 max-w-2xl text-[19px] leading-relaxed text-ink2">Three ways to work together. Agencies usually start with the first.</p></Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5">
                <Reveal className="md:col-span-7">
                    <div className="tray h-full"><div className="plate h-full p-8 md:p-10" style={{ background: "linear-gradient(140deg, rgb(var(--accent) / 0.10), rgb(var(--raised)) 60%)" }}>
                        <h2 className="display text-[2.6rem] text-ink md:text-[3.2rem]">{WAYS[0].title}</h2>
                        <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-ink2">{WAYS[0].body}</p>
                        <ul className="mt-8 grid gap-3 text-[16px] font-medium sm:grid-cols-3">
                            <li className="rounded-2xl bg-page/70 px-4 py-3">Your repo, your tools</li>
                            <li className="rounded-2xl bg-page/70 px-4 py-3">A written update daily</li>
                            <li className="rounded-2xl bg-page/70 px-4 py-3">Live 3 to 7 PM Manila</li>
                        </ul>
                    </div></div>
                </Reveal>
                <div className="grid gap-4 md:col-span-5 md:gap-5">
                    {WAYS.slice(1).map((w, i) => (
                        <Reveal key={w.title} delay={0.05 + i * 0.04}>
                            <div className="tray h-full"><div className="plate h-full p-7 md:p-8">
                                <h2 className="display text-[2rem] text-ink">{w.title}</h2>
                                <p className="mt-2 text-[16px] leading-relaxed text-ink2">{w.body}</p>
                            </div></div>
                        </Reveal>
                    ))}
                </div>
            </div>

            <section className="mt-28" aria-labelledby="steps-title">
                <Reveal>
                    <h2 id="steps-title" className="display text-[2.6rem] text-ink md:text-[4rem]">How a project runs</h2>
                </Reveal>
                <ol className="mt-10 grid gap-8 md:grid-cols-4">
                    {STEPS.map(([t, d], i) => (
                        <Reveal key={t} delay={i * 0.05}>
                            <li className="border-t-2 border-ink pt-5">
                                <span className="display text-[2.4rem] text-accent">{i + 1}</span>
                                <h3 className="display mt-1 text-[1.5rem] text-ink">{t}</h3>
                                <p className="mt-2 text-[15.5px] leading-relaxed text-ink2">{d}</p>
                            </li>
                        </Reveal>
                    ))}
                </ol>
            </section>

            <Reveal className="mt-24">
                <div className="tray"><div className="plate flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-12">
                    <p className="display text-[2.4rem] leading-tight text-ink">Tell me what you&apos;re building.</p>
                    <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">Book a call <span className="dot"><ArrowUpRight size={15} weight="bold" /></span></a></div>
                </div>
            </Reveal>
        </div>
    );
}
