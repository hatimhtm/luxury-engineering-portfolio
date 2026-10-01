import { BOOK_CALL, EMAIL } from "@/lib/site";
import Reveal from "./Reveal";

export default function ContactBand() {
    return (
        <section className="mx-auto mt-28 max-w-page px-4 md:mt-36 md:px-10">
            <Reveal>
                <div className="glass rounded-[34px] px-7 py-14 text-center md:px-16 md:py-20">
                    <h2 className="mx-auto max-w-3xl text-[2rem] font-bold leading-tight tracking-title md:text-[2.8rem]">
                        Have an app to build, or a team that needs an iOS engineer?
                    </h2>
                    <p className="mt-4 text-[17px] text-ink2">Tell me about it. I reply the same day.</p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="pill pill-accent">Book a call</a>
                        <a href={`mailto:${EMAIL}`} className="link text-[15px]">{EMAIL}</a>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
