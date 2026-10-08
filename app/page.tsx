import Hero from "@/components/home3/Hero";
import FilmZoom from "@/components/home3/FilmZoom";
import CaseRail from "@/components/home3/CaseRail";
import Numbers from "@/components/home3/Numbers";
import AppDock from "@/components/home3/AppDock";
import ScrubText from "@/components/motion/ScrubText";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { AboutTeaser, CtaBand, ServicesTeaser } from "@/components/home3/Teasers";

const WORDS = ["SwiftUI", "Kotlin", "watchOS", "Next.js", "Postgres", "Gemini", "macOS", "TypeScript", "Electron", "Supabase", "StoreKit", "Python"];

export default function Home() {
    return (
        <>
            <Hero />
            <section className="mx-auto max-w-[1280px] px-5 pb-24 pt-14 md:px-10 md:py-40">
                <ScrubText
                    className="display max-w-[22ch] text-[2.4rem] leading-[1.08] text-ink md:text-[4.4rem]"
                    text="One engineer for the whole product: the screens people touch, the subscriptions that pay for them, the database behind them, and the release."
                />
            </section>
            <FilmZoom />
            <CaseRail />
            <div className="pt-4 md:pt-32" />
            <Numbers />
            <AppDock />
            <ServicesTeaser />
            <VelocityMarquee words={WORDS} />
            <div className="pt-20 md:pt-32" />
            <AboutTeaser />
            <CtaBand />
        </>
    );
}
