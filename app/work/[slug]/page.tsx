import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, AppStoreLogo, GooglePlayLogo, GithubLogo, Globe, LockSimple } from "@phosphor-icons/react/ssr";
import { getProjectBySlug, flagships, kindOf, projects } from "@/lib/projects";
import ProjectMedia, { hasMedia } from "@/components/v2/ProjectMedia";
import Reveal from "@/components/v2/Reveal";
import { BOOK_CALL } from "@/lib/site";

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const p = getProjectBySlug(params.slug);
    if (!p) return {};
    return { title: p.title, description: p.description };
}

function LinkPill({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="pill glass glass-over text-ink">
            {children}
            <ArrowUpRight size={14} weight="bold" />
        </a>
    );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const p = getProjectBySlug(params.slug);
    if (!p) notFound();
    const order = [...flagships, ...projects.filter((x) => !flagships.includes(x))];
    const next = order[(order.findIndex((x) => x.slug === p.slug) + 1) % order.length];
    const publicCode = !p.private && p.link && p.link !== "https://github.com/hatimhtm";

    return (
        <article className="mx-auto max-w-page px-4 pt-28 md:px-10 md:pt-36">
            <div className="px-2">
                <Link href="/work" className="inline-flex items-center gap-2 text-[15px] font-medium text-ink2 hover:text-ink">
                    <ArrowLeft size={16} weight="bold" /> All work
                </Link>
                <p className="mt-10 text-[15px] font-medium text-ink3">{kindOf(p)}</p>
                <h1 className="mt-2 text-[2.8rem] font-bold leading-[1.02] tracking-display md:text-[4.2rem]">{p.title}</h1>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink2 md:text-[20px]">{p.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                    {p.appStore && (
                        <LinkPill href={p.appStore}>
                            <AppStoreLogo size={17} weight="fill" /> App Store
                        </LinkPill>
                    )}
                    {p.playStore && (
                        <LinkPill href={p.playStore}>
                            <GooglePlayLogo size={17} weight="fill" /> Google Play
                        </LinkPill>
                    )}
                    {p.liveDemo && (
                        <LinkPill href={p.liveDemo}>
                            <Globe size={17} weight="bold" /> Live site
                        </LinkPill>
                    )}
                    {publicCode && (
                        <LinkPill href={p.link}>
                            <GithubLogo size={17} weight="fill" /> Source code
                        </LinkPill>
                    )}
                    {!publicCode && (
                        <span className="inline-flex items-center gap-2 px-1 text-[15px] text-ink3">
                            <LockSimple size={16} weight="bold" /> Private code{p.clientWork ? ", owned by the client" : ""}
                        </span>
                    )}
                </div>
            </div>

            {hasMedia(p) && (
                <Reveal className="mt-12">
                    <div className="overflow-hidden rounded-[28px] border border-hairline md:rounded-[34px]">
                        <ProjectMedia project={p} sizes="(min-width: 1280px) 1200px, 100vw" priority />
                    </div>
                </Reveal>
            )}

            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-hairline px-2 pt-8 md:grid-cols-3">
                {p.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                        <dt className="text-sm text-ink3">{m.label}</dt>
                        <dd className="mt-1 text-[1.6rem] font-bold tracking-title md:text-[2rem]">{m.value}</dd>
                    </div>
                ))}
            </dl>

            <div className="mt-16 grid gap-12 px-2 md:grid-cols-12">
                <div className="md:col-span-7">
                    <Reveal>
                        <h2 className="text-[1.5rem] font-bold tracking-title">The problem</h2>
                        <p className="mt-3 text-[17px] leading-relaxed text-ink2">{p.problem}</p>
                    </Reveal>
                    <Reveal>
                        <h2 className="mt-12 text-[1.5rem] font-bold tracking-title">What I built</h2>
                        <div className="prose-body mt-3 text-[17px] leading-relaxed text-ink2">
                            <p>{p.longDescription}</p>
                            <p>{p.solution}</p>
                        </div>
                    </Reveal>
                </div>
                <div className="md:col-span-5 md:pl-6">
                    <Reveal>
                        <div className="glass rounded-[26px] p-7">
                            <h2 className="text-[1.2rem] font-bold">Results</h2>
                            <ul className="mt-4 space-y-3 text-[15.5px] leading-relaxed text-ink2">
                                {p.outcomes.map((o) => (
                                    <li key={o} className="flex gap-3">
                                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                        {o}
                                    </li>
                                ))}
                            </ul>
                            <h2 className="mt-8 text-[1.2rem] font-bold">Built with</h2>
                            <p className="mt-3 text-[15.5px] leading-relaxed text-ink2">{p.tech.join(", ")}</p>
                        </div>
                    </Reveal>
                </div>
            </div>

            <div className="mt-24 grid gap-4 px-2 md:grid-cols-2">
                <Link href={`/work/${next.slug}`} className="group rounded-[26px] border border-hairline bg-raised p-7 md:p-8">
                    <p className="text-sm text-ink3">Next project</p>
                    <p className="mt-1 text-[1.6rem] font-bold tracking-title transition-colors group-hover:text-accent">{next.title}</p>
                    <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-ink2">{next.description}</p>
                </Link>
                <div className="rounded-[26px] bg-accent/[0.07] p-7 ring-1 ring-inset ring-accent/15 md:p-8">
                    <p className="text-[1.25rem] font-bold leading-snug">Need something like {p.title}?</p>
                    <p className="mt-1 text-[15px] text-ink2">Tell me about it. I reply the same day.</p>
                    <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="pill pill-accent mt-5">
                        Book a call
                    </a>
                </div>
            </div>
        </article>
    );
}
