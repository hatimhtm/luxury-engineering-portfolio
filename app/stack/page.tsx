import type { Metadata } from "next";
import Reveal from "@/components/v2/Reveal";

export const metadata: Metadata = {
    title: "Stack",
    description: "The tools Hatim El Hassak ships with, and the projects where each one is in production.",
};

const GROUPS: { name: string; tools: [string, string][] }[] = [
    {
        name: "Apple platforms",
        tools: [
            ["Swift and SwiftUI", "Every iOS and macOS app here: GoPilates, Estelle, TryIt, Sunz, Relay, Deck, Fader."],
            ["SwiftData and CloudKit", "On-device data with iCloud sync, in GoPilates and Hope HR."],
            ["StoreKit 2 and RevenueCat", "Subscriptions, trials and paywalls in GoPilates, Estelle, TryIt and Sunz."],
            ["HealthKit, WeatherKit, Vision", "Workouts in GoPilates, live UV and a skin scan in Sunz."],
            ["Widgets, Live Activities, watchOS", "GoPilates on the wrist and the Lock Screen; AdPulse on the Dynamic Island."],
            ["AppKit, Core Audio, Accessibility", "The macOS utilities: Fader's per-app volume, Click2Minimize's dock clicks."],
        ],
    },
    {
        name: "Android",
        tools: [
            ["Kotlin and Jetpack Compose", "GoPilates on Google Play, with RevenueCat and Health Connect."],
            ["React Native", "Pause's interface, over a native Kotlin accessibility engine."],
        ],
    },
    {
        name: "Web and back end",
        tools: [
            ["Next.js, React, TypeScript", "Viral OS, CloneOS, StudioOS, LeadSniper and the client CRMs."],
            ["Postgres and Supabase", "Schemas, row-level security, pg_cron jobs and edge functions; 63 tables in Viral OS."],
            ["Node.js and Python", "Serverless functions, crawlers, FastAPI services and CLIs."],
            ["Electron and Playwright", "Hope Assistant and Hope Ledger, which drive real clinical systems."],
            ["C# and .NET", "Hope HR's Windows version."],
        ],
    },
    {
        name: "AI",
        tools: [
            ["Gemini", "Analysis, vision and image generation in CloneOS, TryIt, Viral OS and Estelle."],
            ["OpenAI and Claude APIs", "Image generation in CloneOS; structured triage with Claude."],
            ["On-device models", "Gemma via Ollama and Apple's Foundation Models in Hope Assistant; ONNX face detection in CloneOS."],
        ],
    },
    {
        name: "Shipping",
        tools: [
            ["Xcode Cloud, fastlane, XcodeGen", "iOS builds and App Store releases."],
            ["Vercel and GitHub Actions", "Every web project, with preview deploys and CI-built installers."],
        ],
    },
];

export default function StackPage() {
    return (
        <div className="mx-auto max-w-page px-6 pt-32 md:px-12 md:pt-40">
            <h1 className="text-[2.8rem] font-bold leading-[1.02] tracking-display md:text-[4rem]">Stack</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink2">What I build with, and where each tool is running in production today.</p>
            <div className="mt-14 space-y-16">
                {GROUPS.map((g) => (
                    <section key={g.name} className="grid gap-6 border-t border-hairline pt-8 md:grid-cols-12">
                        <Reveal className="md:col-span-4">
                            <h2 className="text-[1.6rem] font-bold tracking-title">{g.name}</h2>
                        </Reveal>
                        <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2 md:col-span-8">
                            {g.tools.map(([t, d], i) => (
                                <Reveal key={t} delay={(i % 2) * 0.04}>
                                    <dt className="text-[17px] font-bold">{t}</dt>
                                    <dd className="mt-1 text-[15.5px] leading-relaxed text-ink2">{d}</dd>
                                </Reveal>
                            ))}
                        </dl>
                    </section>
                ))}
            </div>
        </div>
    );
}
