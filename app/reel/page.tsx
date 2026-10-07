import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/v2/Reveal";
import FilmPlayer from "@/components/reel/FilmPlayer";
import FilmRail from "@/components/reel/FilmRail";
import { LAUNCH_FILMS, SHORT_FILMS } from "@/lib/films";
import { BOOK_CALL, EMAIL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Video work",
    description: "Showreel, films for shops, a documentary and launch films edited, animated and scored by Hatim El Hassak.",
    openGraph: { images: [{ url: "/work/reel-poster.jpg", width: 1600, height: 900 }] },
};

/** A wide film in the site's tray, with a line under it. */
function Wide({ slug, label, seconds, poster }: { slug: string; label: string; seconds: number; poster?: string }) {
    return (
        <div className="tray">
            <div className="plate">
                <FilmPlayer src={`/work/${slug}.mp4`} poster={poster ?? `/work/${slug}-poster.jpg`} label={label} seconds={seconds} />
            </div>
        </div>
    );
}

export default function ReelPage() {
    return (
        <div className="pb-24 pt-28 md:pt-40">
            <header className="mx-auto max-w-[1280px] px-5 md:px-10">
                <SplitReveal as="h1" text="Video work" className="display text-[3.6rem] text-ink md:text-[8rem]" />
                <Reveal delay={0.3}>
                    <p className="mt-2 max-w-2xl text-[18px] leading-relaxed text-ink2 md:text-[19px]">
                        Short films for shops and brands, launch films and a documentary. I cut, animate, caption and mix them myself.
                    </p>
                </Reveal>
            </header>

            <FilmRail
                title="Films for brands"
                intro="Twenty seconds, vertical, for Reels, TikTok and WhatsApp status. Built from the shop's own photos, with its name, logo and number."
                films={SHORT_FILMS}
            />

            <section className="mx-auto mt-20 grid max-w-[1280px] gap-7 px-5 md:mt-28 md:grid-cols-12 md:gap-8 md:px-10">
                <div className="md:col-span-4">
                    <h2 className="display text-[2.2rem] leading-[1.05] text-ink md:text-[3rem]">Showreel</h2>
                    <p className="mt-3 text-[17px] leading-relaxed text-ink2 md:mt-4">Thirty-four seconds of app films, 3D and motion design. Sound on.</p>
                </div>
                <Reveal className="md:col-span-8">
                    <Wide slug="reel" label="the showreel" seconds={34} />
                </Reveal>
            </section>

            <section className="mx-auto mt-20 max-w-[1280px] px-5 md:mt-28 md:px-10">
                <h2 className="display text-[2.2rem] leading-[1.05] text-ink md:text-[3rem]">Launch films</h2>
                <div className="mt-7 grid gap-8 md:mt-8 md:grid-cols-2">
                    {LAUNCH_FILMS.map((f) => (
                        <Reveal key={f.slug}>
                            <Wide slug={f.slug} label={`the ${f.name} launch film`} seconds={f.seconds} />
                            <p className="mt-4 px-1.5 text-[16px] leading-relaxed text-ink2">
                                {f.href ? <Link href={f.href} className="link font-semibold text-ink">{f.name}</Link> : <span className="font-semibold text-ink">{f.name}</span>}. {f.note}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mx-auto mt-20 grid max-w-[1280px] gap-7 px-5 md:mt-28 md:grid-cols-12 md:gap-8 md:px-10">
                <div className="md:col-span-4">
                    <h2 className="display text-[2.2rem] leading-[1.05] text-ink md:text-[3rem]">Documentary</h2>
                    <p className="mt-3 text-[17px] leading-relaxed text-ink2 md:mt-4">
                        From The Long Minute, a true-crime series I write, edit and animate: the 1962 Alcatraz escape, told almost minute by minute, with a tide model of where the raft could have drifted.
                    </p>
                </div>
                <Reveal className="md:col-span-8">
                    <Wide slug="alcatraz-excerpt" poster="/work/alcatraz-poster.jpg" label="The Long Minute, an excerpt from the Alcatraz episode" seconds={30} />
                </Reveal>
            </section>

            <section className="mx-auto mt-20 max-w-[1280px] px-5 md:mt-28 md:px-10">
                <div className="tray flex flex-col items-start gap-5 !p-6 md:flex-row md:items-center md:justify-between md:!p-8">
                    <p className="text-[19px] leading-relaxed text-ink2">Have a shop, an app or a channel? Send me your photos or footage and I&apos;ll tell you what I&apos;d make.</p>
                    <div className="flex flex-wrap gap-3">
                        <a href={`mailto:${EMAIL}`} className="btn btn-accent">Email me <span className="dot"><ArrowUpRight size={15} weight="bold" /></span></a>
                        <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-ink">Book a call <span className="dot"><ArrowUpRight size={15} weight="bold" /></span></a>
                    </div>
                </div>
            </section>
        </div>
    );
}
