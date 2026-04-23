const techLogos = [
    "Next.js 14", "TypeScript", "SwiftUI", "Swift",
    "Python", "Node.js", "FastAPI",
    "PostgreSQL", "Supabase", "Redis",
    "OpenAI", "Gemini 2.5", "LangChain",
    "Playwright", "Docker", "Tailwind",
    "Framer Motion", "GSAP", "Vite",
];

export function TechLogoMarquee() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
            <div className="border-[3px] border-ink bg-ink py-4 overflow-hidden">
                <div className="marquee-container font-mono font-bold text-cream/70 uppercase tracking-[0.3em] text-xs md:text-sm">
                    <div className="marquee-content animate-marquee" style={{ animationDuration: "40s" }}>
                        {techLogos.map((logo) => (
                            <span key={logo} className="px-6 md:px-8 hover:text-acid transition-colors">{logo}&nbsp;•&nbsp;</span>
                        ))}
                    </div>
                    <div className="marquee-content animate-marquee" aria-hidden="true" style={{ animationDuration: "40s" }}>
                        {techLogos.map((logo) => (
                            <span key={`dup-${logo}`} className="px-6 md:px-8">{logo}&nbsp;•&nbsp;</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
