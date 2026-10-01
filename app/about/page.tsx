import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code, GlobeHemisphereEast, Lightning, ShieldCheck } from "@phosphor-icons/react/ssr";
import SplitReveal from "@/components/motion/SplitReveal";
import ScrubText from "@/components/motion/ScrubText";
import Timeline from "@/components/motion/Timeline";
import Reveal from "@/components/v2/Reveal";
import { BOOK_CALL } from "@/lib/site";

export const metadata: Metadata = {
    title: "About",
    description: "Hatim El Hassak, senior product engineer: how he got here, how he works, and what he's built since 2020.",
};

const STEPS = [
    { when: "Nov 2023 to now", title: "Lead mobile and full-stack engineer", place: "ViralFactory, a French app studio", body: "GoPilates on iPhone, Apple Watch and Android, TryIt and Sunz, and the platforms behind them: Viral OS for operations and CloneOS for marketing visuals." },
    { when: "2026", title: "Healthcare tools", place: "A US therapy practice", body: "Hope Assistant books appointments across two clinical systems with on-device AI. Hope HR tracks licences on Mac and Windows. Hope Ledger reconciles payments." },
    { when: "Aug 2026", title: "Estelle, my own app", place: "On the App Store in 148 countries", body: "Designed, built, priced and published alone, eleven days from decision to the store." },
    { when: "Feb 2022 to Feb 2024", title: "Founding engineer and CTO", place: "Merc", body: "An international recruitment platform, front end and back end, from the first commit." },
    { when: "Aug 2022 to Oct 2023", title: "Mobile engineer and co-founder", place: "Decode Metrics", body: "An analytics product with dashboards that work offline." },
    { when: "2020 to 2022", title: "Freelance web developer", place: "Fiverr, then my own studio, HTM", body: "Where I started: websites for clients on three continents." },
];

const HOW = [
    { icon: Lightning, title: "Running on day one", body: "I get your project building, read the code and ask my questions in writing." },
    { icon: Code, title: "Small pull requests", body: "Early and often, in your repo and your tools: Git, Jira or Linear, Slack." },
    { icon: GlobeHemisphereEast, title: "Live on your mornings", body: "European mornings are my afternoons. I'm live for them, then I deliver while you sleep." },
    { icon: ShieldCheck, title: "A clean handover", body: "Docs, access, scheduled jobs and the weak spots, written down before I leave." },
];

export default function AboutPage() {
    return (
        <div className="pt-32 md:pt-40">
            <section className="mx-auto grid max-w-[1280px] items-end gap-10 px-5 md:grid-cols-[1fr_380px] md:px-10">
                <div>
                    <SplitReveal as="h1" text="I'm Hatim. I build apps, end to end." className="display text-[3.2rem] text-ink md:text-[5.6rem]" />
                    <Reveal delay={0.4}>
                        <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-ink2">
                            A senior product engineer working from Manila, in English, French and Arabic. I&apos;ve shipped software since 2020, and since late 2023 I&apos;ve built apps for a French studio.
                        </p>
                    </Reveal>
                </div>
                <Reveal delay={0.2} className="tray">
                    <div className="plate overflow-hidden">
                        <Image src="/avatar.png" alt="Hatim's avatar: a drawing of him in profile, with headphones" width={640} height={640} priority className="w-full" />
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
                <ScrubText
                    className="display max-w-[24ch] text-[2.2rem] leading-[1.1] text-ink md:text-[3.8rem]"
                    text="I care about the parts people never notice: a paywall that says exactly what it charges, an AI that can't invent a billing code, a release that clears App Review the first time."
                />
            </section>

            <section className="mx-auto max-w-[1280px] px-5 md:px-10" aria-labelledby="path-title">
                <SplitReveal id="path-title" text="How I got here" className="display mb-14 text-[2.6rem] text-ink md:text-[4rem]" />
                <Timeline steps={STEPS} />
            </section>

            <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="how-title">
                <SplitReveal id="how-title" text="How I work" className="display text-[2.6rem] text-ink md:text-[4rem]" />
                <div className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-5">
                    {HOW.map((h, i) => (
                        <Reveal key={h.title} delay={(i % 2) * 0.06} className="tray">
                            <div className="plate h-full p-8">
                                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent"><h.icon size={24} weight="duotone" /></span>
                                <h3 className="display mt-7 text-[1.9rem] text-ink">{h.title}</h3>
                                <p className="mt-2 text-[16px] leading-relaxed text-ink2">{h.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-10 md:pb-32">
                <Reveal className="tray">
                    <div className="plate flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-12">
                        <div>
                            <p className="display text-[2.2rem] text-ink md:text-[2.8rem]">See what I&apos;ve built.</p>
                            <p className="mt-2 text-[16px] text-ink2">Thirty-nine projects, the big ones with case studies.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/work" className="btn btn-ink">See the work <span className="dot"><ArrowUpRight size={15} weight="bold" /></span></Link>
                            <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">Book a call <span className="dot"><ArrowUpRight size={15} weight="bold" /></span></a>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
