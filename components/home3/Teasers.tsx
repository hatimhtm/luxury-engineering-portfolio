import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, DeviceMobile, Stack, UsersThree } from "@phosphor-icons/react/ssr";
import Reveal from "@/components/v2/Reveal";
import { BOOK_CALL } from "@/lib/site";

const WAYS = [
    { icon: UsersThree, title: "Inside your team", body: "An iOS engineer on your client's project, in your repo and tools, live on European mornings." },
    { icon: DeviceMobile, title: "Build a whole app", body: "From the first screen to the App Store and Google Play, subscriptions included." },
    { icon: Stack, title: "One scoped job", body: "An audit, a migration, an App Review rejection or one feature, with a date." },
];

export function ServicesTeaser() {
    return (
        <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="ways-title">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
                <h2 id="ways-title" className="display max-w-2xl text-[2.6rem] text-ink md:text-[4rem]">Three ways to work together.</h2>
                <Link href="/services" className="link text-[16px]">How each one works</Link>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
                {WAYS.map((w, i) => (
                    <Reveal key={w.title} delay={i * 0.06}>
                        <Link href="/services" className="tray group block h-full">
                            <div className="plate h-full p-8 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1">
                                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                                    <w.icon size={24} weight="duotone" />
                                </span>
                                <h3 className="display mt-8 text-[2rem] text-ink">{w.title}</h3>
                                <p className="mt-3 text-[16px] leading-relaxed text-ink2">{w.body}</p>
                            </div>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export function AboutTeaser() {
    return (
        <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-10 md:pb-32" aria-labelledby="about-teaser-title">
            <Reveal>
                <div className="tray">
                    <div className="plate grid items-center gap-10 p-8 md:grid-cols-[280px_1fr] md:p-12">
                        <div className="w-[200px] md:w-[280px]">
                            <Image quality={90} src="/avatar.png" alt="Hatim's avatar: a drawing of him in profile, with headphones" width={280} height={280} className="theme-day w-full rounded-[28px]" />
                            <Image quality={90} src="/avatar-dark.png" alt="" width={280} height={280} className="theme-night w-full rounded-[28px]" />
                        </div>
                        <div>
                            <h2 id="about-teaser-title" className="display text-[2.6rem] text-ink md:text-[3.6rem]">I&apos;m Hatim.</h2>
                            <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-ink2">
                                I&apos;ve built software since 2020: websites for clients first, then products as a founding engineer, and since late 2023 apps for a French studio. I work from Manila, in English, French and Arabic.
                            </p>
                            <Link href="/about" className="btn btn-ink mt-8">
                                More about me <span className="dot"><ArrowUpRight size={15} weight="bold" /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

export function CtaBand() {
    return (
        <section className="relative overflow-hidden bg-[#0d0f14]" aria-labelledby="cta-title">
            <Image quality={90} src="/work/hero-night.jpg" alt="" fill sizes="100vw" className="object-cover object-[70%_50%] opacity-80" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0d0f14] via-[#0d0f14]/70 to-transparent" />
            <div className="relative mx-auto flex max-w-[1280px] flex-col items-start gap-8 px-5 py-28 md:flex-row md:items-end md:justify-between md:px-10 md:py-40">
                <Reveal>
                    <h2 id="cta-title" className="display max-w-3xl text-[3rem] text-white md:text-[5.2rem]">Have an app in mind?</h2>
                    <p className="mt-4 text-[18px] text-white/75">Tell me about it. I reply the same day.</p>
                </Reveal>
                <Reveal delay={0.08}>
                    <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-accent text-[17px]">
                        Book a call <span className="dot"><ArrowUpRight size={16} weight="bold" /></span>
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
