import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/v2/Reveal";
import { BOOK_CALL, EMAIL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Video work",
    description: "Showreel, films for shops, a documentary and launch films edited, animated and scored by Hatim El Hassak.",
    openGraph: { images: [{ url: "/work/reel-poster.jpg", width: 1600, height: 900 }] },
};

/** A film with real controls: on this page people come to watch, with sound. */
function Film({ src, poster, label, ratio = "aspect-video" }: { src: string; poster: string; label: string; ratio?: string }) {
    return (
        <div className="overflow-hidden rounded-[28px] bg-ink/5 md:rounded-[34px]">
            <video src={src} poster={poster} controls playsInline preload="metadata" aria-label={label} className={`${ratio} w-full bg-black object-contain`} />
        </div>
    );
}

/** Vertical films made for shops, each from the shop's own product photos. */
const SHOP_FILMS = [
    { slug: "arab-kandora", name: "Arab Kandora", place: "Dubai", note: "Four Gulf cuts drawn in tailor's chalk, then the shop's own photos in every colour.", src: "/work/arab-kandora.mp4", poster: "/work/arab-kandora-poster.jpg" },
    { slug: "le-zent", name: "Le Zent", place: "Dubai", note: "A perfume range, each bottle on its own colour, from the shop's product shots.", src: "/work/le-zent.mp4", poster: "/work/le-zent-poster.jpg" },
];

const LAUNCH_FILMS = [
    { slug: "estelle", name: "Estelle", note: "Launch film for my own iPhone app. Motion design, a 3D phone and sound design.", src: "/work/estelle.mp4", poster: "/work/estelle-poster.jpg" },
    { slug: "gopilates", name: "GoPilates", note: "Launch film for a client's fitness app, built in Blender.", src: "/work/gopilates.mp4", poster: "/work/gopilates-poster.jpg" },
];

export default function ReelPage() {
    return (
        <div className="pb-24 pt-32 md:pt-40">
            <header className="mx-auto max-w-[1280px] px-5 md:px-10">
                <SplitReveal as="h1" text="Video work" className="display text-[4.2rem] text-ink md:text-[8rem]" />
                <Reveal delay={0.3}>
                    <p className="mt-2 max-w-2xl text-[19px] leading-relaxed text-ink2">
                        Short films for shops, a narrated documentary and launch films. I cut, animate, caption and mix them myself.
                    </p>
                </Reveal>
            </header>

            <section className="mx-auto mt-12 max-w-[1280px] px-5 md:px-10">
                <Reveal delay={0.4}>
                    <Film src="/work/reel.mp4" poster="/work/reel-poster.jpg" label="Showreel, 34 seconds" />
                    <p className="mt-4 text-[15px] text-ink3">Showreel, 34 seconds. Sound on.</p>
                </Reveal>
            </section>

            <section className="mx-auto mt-20 grid max-w-[1280px] gap-8 px-5 md:mt-28 md:grid-cols-12 md:px-10">
                <div className="md:col-span-4">
                    <h2 className="display text-[2.4rem] leading-[1.05] text-ink md:text-[3rem]">Films for shops</h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-ink2">
                        Twenty seconds, vertical, made for Reels, TikTok and WhatsApp status. Each one is built from the shop&apos;s own product photos and carries its name, logo and number.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:col-span-8 md:gap-8">
                    {SHOP_FILMS.map((f) => (
                        <Reveal key={f.slug}>
                            <Film src={f.src} poster={f.poster} label={`Film for ${f.name}`} ratio="aspect-[9/16]" />
                            <p className="mt-4 text-[16px] leading-relaxed text-ink2">
                                <span className="font-semibold text-ink">{f.name}</span>, {f.place}. {f.note}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mx-auto mt-20 grid max-w-[1280px] gap-8 px-5 md:mt-28 md:grid-cols-12 md:px-10">
                <div className="md:col-span-4">
                    <h2 className="display text-[2.4rem] leading-[1.05] text-ink md:text-[3rem]">Documentary</h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-ink2">
                        From The Long Minute, a true-crime series I write, edit and animate: the 1962 Alcatraz escape, told almost minute by minute, with a tide model of where the raft could have drifted.
                    </p>
                </div>
                <Reveal className="md:col-span-8">
                    <Film src="/work/alcatraz-excerpt.mp4" poster="/work/alcatraz-poster.jpg" label="The Long Minute, Alcatraz excerpt" />
                </Reveal>
            </section>

            <section className="mx-auto mt-20 max-w-[1280px] px-5 md:mt-28 md:px-10">
                <h2 className="display text-[2.4rem] leading-[1.05] text-ink md:text-[3rem]">Launch films</h2>
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                    {LAUNCH_FILMS.map((f) => (
                        <Reveal key={f.slug}>
                            <Film src={f.src} poster={f.poster} label={`${f.name} launch film`} />
                            <p className="mt-4 text-[16px] leading-relaxed text-ink2">
                                <Link href={`/work/${f.slug}`} className="link font-semibold text-ink">{f.name}</Link>. {f.note}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mx-auto mt-20 max-w-[1280px] px-5 md:mt-28 md:px-10">
                <div className="tray flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
                    <p className="text-[19px] leading-relaxed text-ink2">Have footage, a script or a channel? Send it over and I&apos;ll tell you what I&apos;d make.</p>
                    <div className="flex flex-wrap gap-3">
                        <a href={`mailto:${EMAIL}`} className="btn btn-accent">Email me <span className="dot"><ArrowUpRight size={15} weight="bold" /></span></a>
                        <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-ink">Book a call <span className="dot"><ArrowUpRight size={15} weight="bold" /></span></a>
                    </div>
                </div>
            </section>
        </div>
    );
}
