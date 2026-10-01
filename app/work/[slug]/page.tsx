import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, AppStoreLogo, GooglePlayLogo, GithubLogo, Globe, LockSimple } from "@phosphor-icons/react/ssr";
import { getProjectBySlug, flagships, kindOf, projects } from "@/lib/projects";
import { MEDIA } from "@/lib/media.generated";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/v2/Reveal";
import { Gallery, LeadMedia } from "@/components/work3/CaseMedia";
import { BOOK_CALL } from "@/lib/site";

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const p = getProjectBySlug(params.slug);
    if (!p) return {};
    const m = MEDIA[p.slug];
    return { title: p.title, description: p.description, openGraph: m?.cover ? { images: [{ url: m.cover, width: 1600, height: 1000 }] } : undefined };
}

function Pill({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
            {children}
            <span className="dot"><ArrowUpRight size={14} weight="bold" /></span>
        </a>
    );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const p = getProjectBySlug(params.slug);
    if (!p) notFound();
    const m = MEDIA[p.slug] ?? {};
    const name = p.title.replace(": Manifest Affirmations", "");
    const order = [...flagships, ...projects.filter((x) => !flagships.includes(x))];
    const next = order[(order.findIndex((x) => x.slug === p.slug) + 1) % order.length];
    const nextMedia = MEDIA[next.slug] ?? {};
    const publicCode = !p.private && p.link && p.link !== "https://github.com/hatimhtm";
    const gallery = [...(m.trailer && m.cover ? [m.cover] : []), ...(m.shots ?? [])];

    return (
        <article className="pb-24 pt-28 md:pt-36">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <Link href="/work" className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink2 hover:text-ink">
                    <ArrowLeft size={16} weight="bold" /> All work
                </Link>
                <div className="mt-10 flex items-center gap-4">
                    {m.icon && <Image quality={90} src={m.icon} alt="" width={64} height={64} className="rounded-[22%] shadow-[0_10px_24px_-10px_rgb(16_22_44/0.5)]" />}
                    <p className="text-[15px] font-semibold text-ink3">{kindOf(p)}</p>
                </div>
                <SplitReveal as="h1" text={name} className="display mt-4 text-[3.4rem] text-ink md:text-[6.4rem]" />
                <Reveal delay={0.35}>
                    <p className="mt-5 max-w-3xl text-[19px] leading-relaxed text-ink2 md:text-[21px]">{p.description}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        {p.appStore && <Pill href={p.appStore}><AppStoreLogo size={17} weight="fill" /> App Store</Pill>}
                        {p.playStore && <Pill href={p.playStore}><GooglePlayLogo size={17} weight="fill" /> Google Play</Pill>}
                        {p.liveDemo && <Pill href={p.liveDemo}><Globe size={17} weight="bold" /> Live</Pill>}
                        {publicCode && <Pill href={p.link}><GithubLogo size={17} weight="fill" /> Source code</Pill>}
                        {!publicCode && (
                            <span className="inline-flex items-center gap-2 px-1 text-[15px] text-ink3">
                                <LockSimple size={16} weight="bold" /> Private code{p.clientWork ? ", owned by the client" : ""}
                            </span>
                        )}
                    </div>
                </Reveal>
            </div>

            <div className="mx-auto mt-14 max-w-[1280px] px-4 md:px-10">
                <LeadMedia m={m} name={name} />
            </div>

            <dl className="mx-auto mt-16 grid max-w-[1280px] grid-cols-2 gap-8 px-5 md:grid-cols-3 md:px-10">
                {p.metrics.slice(0, 3).map((x, i) => (
                    <Reveal key={x.label} delay={i * 0.06}>
                        <dt className="text-[14px] font-semibold text-ink3">{x.label}</dt>
                        <dd className="display mt-1 text-[2.4rem] text-ink md:text-[3.6rem]">{x.value}</dd>
                    </Reveal>
                ))}
            </dl>

            <div className="mx-auto mt-20 grid max-w-[1280px] gap-14 px-5 md:grid-cols-12 md:px-10">
                <div className="md:col-span-7">
                    <Reveal>
                        <h2 className="display text-[2.2rem] text-ink">The problem</h2>
                        <p className="mt-4 text-[17.5px] leading-relaxed text-ink2">{p.problem}</p>
                    </Reveal>
                    <Reveal>
                        <h2 className="display mt-14 text-[2.2rem] text-ink">What I built</h2>
                        <div className="prose-body mt-4 text-[17.5px] leading-relaxed text-ink2">
                            <p>{p.longDescription}</p>
                            <p>{p.solution}</p>
                        </div>
                    </Reveal>
                </div>
                <aside className="md:col-span-5">
                    <Reveal className="tray md:sticky md:top-32">
                        <div className="plate p-8">
                            <h2 className="display text-[1.7rem] text-ink">Results</h2>
                            <ul className="mt-5 space-y-3.5 text-[15.5px] leading-relaxed text-ink2">
                                {p.outcomes.map((o) => (
                                    <li key={o} className="flex gap-3">
                                        <span aria-hidden className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-accent" />
                                        {o}
                                    </li>
                                ))}
                            </ul>
                            <h2 className="display mt-9 text-[1.7rem] text-ink">Built with</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {p.tech.map((t) => (
                                    <span key={t} className="rounded-full bg-ink/[0.05] px-3 py-1.5 text-[13.5px] font-semibold text-ink2">{t}</span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </aside>
            </div>

            {gallery.length > 0 && (
                <section className="mx-auto mt-24 max-w-[1280px] px-4 md:px-10" aria-label="More screens">
                    <Gallery shots={gallery} name={name} />
                </section>
            )}

            <div className="mx-auto mt-28 grid max-w-[1280px] gap-4 px-4 md:grid-cols-2 md:px-10">
                <Link href={`/work/${next.slug}`} className="tray group block">
                    <div className="plate relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden p-8">
                        {(nextMedia.cover || nextMedia.poster) && (
                            <Image quality={90} src={(nextMedia.cover || nextMedia.poster) as string} alt="" fill sizes="50vw" className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                        )}
                        <div className="relative">
                            <p className="text-[14px] font-semibold text-ink2">Next project</p>
                            <p className="display mt-1 text-[2.4rem] text-ink">{next.title.replace(": Manifest Affirmations", "")}</p>
                        </div>
                        {(nextMedia.cover || nextMedia.poster) && <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-raised via-raised/80 to-transparent" />}
                    </div>
                </Link>
                <div className="tray">
                    <div className="plate flex h-full min-h-[240px] flex-col justify-end p-8" style={{ background: "rgb(var(--accent) / 0.07)" }}>
                        <p className="display text-[2.2rem] leading-tight text-ink">Need something like {name}?</p>
                        <p className="mt-2 text-[16px] text-ink2">Tell me about it. I reply the same day.</p>
                        <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-6 self-start">
                            Book a call <span className="dot"><ArrowUpRight size={15} weight="bold" /></span>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
