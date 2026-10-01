import Reveal from "./Reveal";

const HOW = [
    ["Running on day one", "I get your project building, read the code, and ask my questions in writing."],
    ["Small pull requests", "Early and often, in your repo and your tools: Git, Jira or Linear, Slack."],
    ["A written update every day", "What shipped, what's next, what's blocking. Your mornings in Europe are my afternoons, and I'm live for them."],
    ["A clean handover", "Docs, access, scheduled jobs and the weak spots, written down before I leave."],
];

export default function About() {
    return (
        <section id="about" className="mx-auto mt-28 max-w-page scroll-mt-28 px-6 md:mt-36 md:px-12" aria-labelledby="about-title">
            <div className="grid gap-12 md:grid-cols-12">
                <Reveal className="md:col-span-5">
                    <h2 id="about-title" className="text-[2.2rem] font-bold tracking-title md:text-[2.9rem]">I&apos;m Hatim.</h2>
                    <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink2">
                        <p>
                            I&apos;ve built software since 2020: websites for clients first, then products as a founding engineer at Merc and Decode Metrics, and since late 2023 apps for a French app studio.
                        </p>
                        <p>I work from Manila, alone or inside a team. I speak English, French, Arabic and Mandarin.</p>
                    </div>
                </Reveal>
                <div className="md:col-span-7 md:pl-6">
                    <Reveal>
                        <h3 className="text-lg font-bold">How I work</h3>
                    </Reveal>
                    <dl className="mt-5 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                        {HOW.map(([t, d], i) => (
                            <Reveal key={t} delay={i * 0.05}>
                                <dt className="text-[17px] font-bold">{t}</dt>
                                <dd className="mt-1.5 text-[15.5px] leading-relaxed text-ink2">{d}</dd>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
