import Image from "next/image";
import Link from "next/link";
import AutoVideo from "./AutoVideo";
import Reveal from "./Reveal";

function Kind({ children }: { children: React.ReactNode }) {
    return <p className="text-sm font-medium text-ink3">{children}</p>;
}

/** Four builds, each in a tile shaped by what there is to show. */
export default function CaseStudies() {
    return (
        <section className="mx-auto mt-28 max-w-page px-4 md:mt-36 md:px-10" aria-labelledby="case-studies-title">
            <Reveal>
                <h2 id="case-studies-title" className="px-2 text-[2.2rem] font-bold tracking-title md:text-[2.9rem]">
                    Case studies
                </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-12 md:gap-5">
                <Reveal className="md:col-span-7">
                    <Link href="/work/practicesync" className="group block h-full overflow-hidden rounded-[28px] border border-hairline bg-raised">
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                                src="/media/hope-day-v3.png"
                                alt="Hope Assistant's overview screen on a Mac display"
                                fill
                                sizes="(min-width: 768px) 58vw, 100vw"
                                className="theme-day object-cover object-[50%_45%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                            <Image
                                src="/media/hope-night-v3.png"
                                alt="Hope Assistant's overview screen on a Mac display, at night"
                                fill
                                sizes="(min-width: 768px) 58vw, 100vw"
                                className="theme-night object-cover object-[50%_45%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                        </div>
                        <div className="p-7 md:p-8">
                            <Kind>Healthcare automation, macOS</Kind>
                            <h3 className="mt-2 text-[1.7rem] font-bold tracking-title">Hope Assistant</h3>
                            <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-ink2">
                                Reads each visit in Practice Fusion and books the matching coded appointment in SimplePractice. The AI runs on the Mac and can&apos;t invent a billing code.
                            </p>
                            <span className="link mt-4 inline-block">Read the case study</span>
                        </div>
                    </Link>
                </Reveal>
                <Reveal className="md:col-span-5" delay={0.06}>
                    <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-hairline bg-raised">
                        <AutoVideo src="/media/estelle-film.mp4" poster="/media/estelle-film-poster.jpg" label="Estelle launch film" className="aspect-video w-full" />
                        <Link href="/work/estelle" className="block flex-1 p-7 md:p-8">
                            <Kind>My own app, iOS</Kind>
                            <h3 className="mt-2 text-[1.7rem] font-bold tracking-title">Estelle</h3>
                            <p className="mt-2 text-[16px] leading-relaxed text-ink2">
                                An affirmations app I designed, built and published alone. Eleven days from decision to the App Store, live in 148 countries.
                            </p>
                            <span className="link mt-4 inline-block">Read the case study</span>
                        </Link>
                    </div>
                </Reveal>
                <Reveal className="md:col-span-5">
                    <Link href="/work/viralos" className="block h-full rounded-[28px] border border-hairline bg-raised p-7 md:p-9">
                        <Kind>Operations platform, web</Kind>
                        <h3 className="mt-2 text-[1.7rem] font-bold tracking-title">Viral OS</h3>
                        <p className="mt-2 text-[16px] leading-relaxed text-ink2">
                            A studio&apos;s revenue, subscriptions, ad spend and alerts in one Postgres schema of 63 tables, with access set per role and money hidden from roles that shouldn&apos;t see it.
                        </p>
                        <span className="link mt-4 inline-block">Read the case study</span>
                    </Link>
                </Reveal>
                <Reveal className="md:col-span-7" delay={0.06}>
                    <Link href="/work/cloneos" className="block h-full rounded-[28px] bg-accent/[0.08] p-7 ring-1 ring-inset ring-accent/15 md:p-9">
                        <Kind>AI pipeline, web</Kind>
                        <h3 className="mt-2 text-[1.7rem] font-bold tracking-title">CloneOS</h3>
                        <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink2">
                            Takes one reference post and produces on-brand visuals: Gemini reads the post, three image models redraw it, captions come back in French or English, and every post stays under a one-dollar cap.
                        </p>
                        <span className="link mt-4 inline-block">Read the case study</span>
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
