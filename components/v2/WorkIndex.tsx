import Link from "next/link";
import Reveal from "./Reveal";
import { projectCount } from "@/lib/projects";

const ITEMS: { slug: string; name: string; kind: string; line: string }[] = [
    { slug: "tryit", name: "TryIt", kind: "Client app, iOS", line: "AI virtual try-on. You take a photo and Gemini puts the clothes on you." },
    { slug: "sunz", name: "Sunz", kind: "Client app, iOS", line: "A tanning coach that reads the live UV index and plans safe sun for your skin type." },
    { slug: "relay", name: "Relay", kind: "Native app, macOS", line: "A Messenger client for the Mac in SwiftUI, over a Go back end that speaks Meta's protocol." },
    { slug: "leadsniper", name: "LeadSniper", kind: "Lead engine, web, open source", line: "Finds businesses on Google Places, audits their sites with Playwright and drafts the outreach." },
    { slug: "studioos", name: "StudioOS", kind: "My studio's platform, web", line: "Analytics and an AI content factory over one database, with 1,550 unit tests." },
    { slug: "hope-hr", name: "Hope HR", kind: "Healthcare, macOS and Windows", line: "Warns a home-health agency 60, 30 and 14 days before a clinician's licence expires." },
    { slug: "fader", name: "Fader", kind: "Native app, macOS", line: "The per-app volume mixer macOS never shipped, built on Core Audio taps." },
    { slug: "adpulse", name: "AdPulse", kind: "Open source, iOS", line: "An analytics dashboard with Swift Charts, Live Activities and anomaly alerts." },
];

export default function WorkIndex() {
    return (
        <section className="mx-auto mt-28 max-w-page px-6 md:mt-36 md:px-12" aria-labelledby="more-work-title">
            <Reveal>
                <div className="flex items-baseline justify-between gap-6">
                    <h2 id="more-work-title" className="text-[2.2rem] font-bold tracking-title md:text-[2.9rem]">More of the work</h2>
                    <Link href="/work" className="link shrink-0 text-[15px]">All {projectCount} projects</Link>
                </div>
            </Reveal>
            <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
                {ITEMS.map((it, i) => (
                    <Reveal key={it.slug} delay={(i % 2) * 0.05}>
                        <Link href={`/work/${it.slug}`} className="group block">
                            <p className="text-sm font-medium text-ink3">{it.kind}</p>
                            <h3 className="mt-1.5 text-[1.55rem] font-bold tracking-title transition-colors group-hover:text-accent">{it.name}</h3>
                            <p className="mt-1.5 max-w-[34rem] text-[16px] leading-relaxed text-ink2">{it.line}</p>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
