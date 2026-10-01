import Link from "next/link";
import AutoVideo from "./AutoVideo";
import Reveal from "./Reveal";

/** GoPilates, told by its launch film, with the facts in a glass panel over the picture. */
export default function FilmChapter() {
    return (
        <section className="mx-auto mt-6 max-w-page px-4 md:mt-10 md:px-10" aria-labelledby="gopilates-title">
            <div className="relative overflow-hidden rounded-[28px] border border-hairline bg-raised md:rounded-[34px] md:border-0 md:bg-black">
                <AutoVideo
                    src="/media/gopilates-film.mp4"
                    poster="/media/gopilates-film-poster.jpg"
                    label="GoPilates launch film"
                    className="aspect-video w-full"
                />
                <Reveal className="md:absolute md:bottom-8 md:left-8 md:w-[440px]">
                    <div className="glass-md p-7 md:rounded-[26px] md:p-8">
                        <h2 id="gopilates-title" className="text-[2rem] font-bold tracking-title md:text-[2.4rem]">GoPilates</h2>
                        <p className="mt-3 text-[16px] leading-relaxed text-ink2">
                            A French-first Pilates subscription app I built for a studio, live on the App Store and Google Play.
                        </p>
                        <p className="mt-3 text-[16px] font-medium leading-relaxed text-ink">
                            Rated 4.4 by 208 people in France. About 16,000 lines of Swift, a native Kotlin app on Android and an Apple Watch companion.
                        </p>
                        <Link href="/work/gopilates" className="link mt-4 inline-block">
                            Read the case study
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
