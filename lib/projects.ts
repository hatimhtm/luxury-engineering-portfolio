export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    metrics: { label: string; value: string }[];
    color: string;
    textColor: string;
    link: string;
    category: string;
    problem: string;
    solution: string;
    outcomes: string[];
}

export const projects: Project[] = [
    {
        id: "001",
        slug: "leadsniper",
        title: "LeadSniper",
        description: "Full-stack B2B prospecting engine — discovers businesses, crawls their sites, scores 23 opportunity signals, and drafts personalized outreach with AI.",
        longDescription: "LeadSniper is an end-to-end lead generation pipeline built for freelancers and small agencies. A local Playwright crawler pulls businesses from Google Places, audits their sites against PageSpeed and a 23-factor scoring rubric, then Gemini 2.5 drafts channel-specific outreach. A Next.js dashboard on Supabase keeps the whole pipeline visible and operable.",
        tech: ["Next.js 14", "TypeScript", "Supabase", "Playwright", "Gemini 2.5", "PageSpeed API"],
        metrics: [
            { label: "Scoring Factors", value: "23" },
            { label: "Channels", value: "Email / WhatsApp / LinkedIn" },
            { label: "Infra Cost", value: "$0" },
        ],
        color: "bg-acid",
        textColor: "text-ink",
        link: "https://github.com/hatimhtm/LeadSniper",
        category: "AI / ML",
        problem: "Lead generation for freelancers is a manual slog: searching directories, visiting dozens of sites, copying emails into a spreadsheet, then writing cold messages from scratch. Most tools solve one slice and cost hundreds a month.",
        solution: "Split the system into a local scraper (free compute, free bandwidth) and a hosted dashboard (free Vercel + Supabase tiers). The scraper idles in watch mode waiting for search jobs from the dashboard; the dashboard handles pipeline state, scoring, and AI drafts.",
        outcomes: [
            "Runs end-to-end on free infrastructure",
            "23-factor niche-aware opportunity scoring",
            "Channel-specific AI drafts (email / WhatsApp / LinkedIn)",
            "Watch-mode scraper with idle RAM footprint",
        ],
    },
    {
        id: "002",
        slug: "ag1-dashboard",
        title: "AG1 Dashboard",
        description: "Meta Ads performance analytics dashboard for iOS — SwiftUI Charts, Live Activities, interactive chart selection, and iOS 17 symbol effects.",
        longDescription: "A native iOS analytics app that turns Meta Ads campaign data into a fast, readable dashboard. Uses SwiftUI Charts for interactive ROAS and budget visualisations, iOS 17 Live Activities for real-time tracking, and symbol effects + sensory feedback for a polished, native feel.",
        tech: ["SwiftUI", "SwiftUI Charts", "iOS 17", "Live Activities", "Swift 5.9"],
        metrics: [
            { label: "Platform", value: "iOS 17+" },
            { label: "KPIs per Screen", value: "6–8" },
            { label: "Dataset", value: "1.2k rows" },
        ],
        color: "bg-electric",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/AG1Dashboard",
        category: "iOS",
        problem: "Most Meta Ads reporting tools are web-first and slow, or mobile afterthoughts that miss the iOS feel entirely. Operators wanted a dashboard that was native, fast, and pleasant to use on the go.",
        solution: "Built the full app in SwiftUI with a dedicated design system and used iOS 17's Charts API with selection, context menus, and presentation detents. Every interaction has contextual haptics; top KPIs use numericText transitions and symbol bounce animations.",
        outcomes: [
            "Interactive chart selection on ROAS / budget / product",
            "Live Activities for real-time campaign tracking",
            "Context menus with previews on creative lists",
            "Custom theme layer with semantic colors and spacing",
        ],
    },
    {
        id: "003",
        slug: "echoscribe",
        title: "EchoScribe",
        description: "Meeting assistant that records audio, transcribes with Google Cloud Speech-to-Text, summarises with GPT, and posts structured notes to Slack.",
        longDescription: "EchoScribe is a CLI + Docker-packaged pipeline that handles the full meeting-notes flow: record → transcribe → summarise → distribute. Configurable via env vars, extensible per channel, and packaged with tests and CI.",
        tech: ["Python", "Google Cloud STT", "OpenAI GPT", "Slack API", "Docker"],
        metrics: [
            { label: "Packaging", value: "Docker + CLI" },
            { label: "CI", value: "GitHub Actions" },
            { label: "Output", value: "Structured Markdown" },
        ],
        color: "bg-hotpink",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/EchoScribe",
        category: "AI / ML",
        problem: "Meeting notes are either forgotten, inconsistent, or require a dedicated note-taker. Teams wanted a single command that turns a recording into a distributed summary with action items.",
        solution: "Chained Google Cloud Speech-to-Text (accuracy for non-English speakers), GPT for structured summaries with action items, and the Slack Web API for delivery. Shipped as a CLI with Docker support so it runs anywhere.",
        outcomes: [
            "Single-command meeting → Slack pipeline",
            "Dockerized for portable deployment",
            "Structured summaries with extracted action items",
            "Config via env vars, no code changes needed",
        ],
    },
    {
        id: "004",
        slug: "gopilates",
        title: "GoPilates",
        description: "Native iOS app that teaches Pilates — video lessons, progress tracking, and weekly challenges wrapped in a calm, studio-quality UI.",
        longDescription: "GoPilates is a full consumer iOS app built for a Pilates instructor who wanted to scale without adding staff. Users follow video-led sessions, track streaks and progress, and join weekly challenges to stay engaged. Built in Swift with a focus on quiet, high-contrast design suitable for workouts.",
        tech: ["Swift", "SwiftUI", "iOS", "Video Playback", "Progress Tracking"],
        metrics: [
            { label: "Platform", value: "iOS" },
            { label: "Content Type", value: "Video Lessons" },
            { label: "Engagement", value: "Streaks + Challenges" },
        ],
        color: "bg-vivid",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/gopilates-ios",
        category: "iOS",
        problem: "A solo Pilates instructor couldn't scale her practice past the hours in a day. Generic fitness apps didn't fit her method, and hiring a dev shop to build something custom was out of reach on her budget.",
        solution: "Scoped the app to the three features that actually moved the needle — video playback, progress tracking, and weekly challenges — and built it natively in Swift for App Store distribution.",
        outcomes: [
            "Shipped to App Store as a native iOS app",
            "Video playback tuned for workout contexts",
            "Progress and streak tracking to drive retention",
            "Weekly challenge cadence for habit formation",
        ],
    },
    {
        id: "005",
        slug: "lessonforge",
        title: "LessonForge",
        description: "Offline-capable lesson dashboard for language teachers — multi-page lessons, student profiles, timers, and a print-ready layout.",
        longDescription: "LessonForge replaces the browser-tab chaos language teachers live in. One screen: lesson pages with rich-text editing and drag-to-reorder, a resource toolkit of grammar/vocab cards, a dual-mode class timer, student profile switching, and a print stylesheet that strips UI chrome to leave just the lesson.",
        tech: ["Vite", "JavaScript", "Custom CSS", "LocalStorage", "Print CSS"],
        metrics: [
            { label: "Storage", value: "Offline / Local" },
            { label: "Undo Depth", value: "50 snapshots" },
            { label: "Print", value: "Clean layout" },
        ],
        color: "bg-hotpink",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/LessonForge",
        category: "Web App",
        problem: "Language teachers were juggling Google Docs, timer apps, vocab lists across tabs, and student notes in spreadsheets — losing focus mid-class to hunt for the right tab.",
        solution: "One keyboard-driven dashboard with everything in place: lesson content, timer, cards, and student profiles. LocalStorage-backed so it keeps working between time zones and spotty connections. Print stylesheet for teachers who still hand out paper.",
        outcomes: [
            "All-in-one teaching surface (lessons + timer + cards)",
            "Fully offline, data stays on device",
            "Undo/redo with 50-step history",
            "Print-ready layout with Ctrl+P",
        ],
    },
    {
        id: "006",
        slug: "scriptdeck",
        title: "ScriptDeck",
        description: "Keyboard-first call-script runner for sales and support teams — step tracking, categorised rebuttals, session analytics, and a built-in call timer.",
        longDescription: "ScriptDeck is a browser-based, offline-capable script runner for inbound/outbound call teams. Walk through an 8-step conversation flow, pull categorised rebuttals (trust / objection / value / pricing / competitor) with one-click copy, and get per-step time analytics at the end of each call.",
        tech: ["Vite", "JavaScript", "Custom CSS", "LocalStorage"],
        metrics: [
            { label: "Flow", value: "8-step scripts" },
            { label: "Rebuttals", value: "5 categories" },
            { label: "Analytics", value: "Per-step time" },
        ],
        color: "bg-electric",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/ScriptDeck",
        category: "Web App",
        problem: "Call-center operators were bouncing between a Word doc of scripts, a separate rebuttals PDF, and a stopwatch app — losing the thread and leaking seconds on every call.",
        solution: "One keyboard-navigable deck that holds the script, the rebuttals, the checklist, and the timer in one view. Arrow-key and number-key navigation so operators never have to take their hands off the keyboard mid-call.",
        outcomes: [
            "Keyboard-first navigation (arrow / number keys)",
            "One-click copy on any response card",
            "Per-step time tracking and session history",
            "Fully offline, works behind call-center firewalls",
        ],
    },
    {
        id: "007",
        slug: "rudratek-dashboard",
        title: "Rudratek Dashboard",
        description: "High-fidelity project management dashboard with debounced search, multi-select filters, responsive sidebar-to-mobile-nav transition, and dark mode.",
        longDescription: "Production-ready SaaS dashboard skeleton built on Next.js 14 App Router. Analytics overview, advanced filtering, team collaboration indicators, and a glassmorphism-leaning design system with strict typographic hierarchy.",
        tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "React Context"],
        metrics: [
            { label: "Type Safety", value: "100%" },
            { label: "Rendering", value: "App Router" },
            { label: "Theme", value: "Light / Dark" },
        ],
        color: "bg-ink",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/rudratek-dashboard",
        category: "Web App",
        problem: "Client needed a production-grade dashboard skeleton that wasn't another templated SaaS kit — something with real hierarchy, real responsive behaviour, and a design that would read as premium to their customers.",
        solution: "Built the entire thing in Next.js 14 App Router with strict TypeScript, Tailwind for zero-runtime CSS, and React Context for theme and session state. Sidebar gracefully transforms into a mobile nav; every interactive state is designed, not defaulted.",
        outcomes: [
            "Strict TypeScript across the codebase",
            "Responsive sidebar → mobile nav transformation",
            "Debounced search with multi-select filters",
            "Persistent theme via React Context",
        ],
    },
    {
        id: "008",
        slug: "infinitecs",
        title: "InfiniteCS Website",
        description: "Enterprise BPO marketing site with GSAP scroll choreography, glassmorphism UI, animated counters, and SVG ring charts — all in zero-framework JS.",
        longDescription: "Conversion-focused landing page for Infinite Contact Solutions. Built without a framework — pure HTML/CSS/JS with GSAP ScrollTrigger handling all the reveal choreography. Dense with sections (hero, impact, services, strategy, ops, contact) but stays under 8 KB gzipped JS.",
        tech: ["HTML", "CSS", "Vanilla JS", "GSAP", "Vite"],
        metrics: [
            { label: "JS Bundle", value: "~8 KB gz" },
            { label: "Framework", value: "None" },
            { label: "Deps", value: "CDN-only" },
        ],
        color: "bg-acid",
        textColor: "text-ink",
        link: "https://github.com/hatimhtm/InfiniteCS-Website",
        category: "Web",
        problem: "BPO marketing sites all look the same — stock photos, generic stats, bullet lists. The client wanted a site that would make enterprise buyers pause and take them seriously.",
        solution: "Custom design system with glassmorphism cards, GSAP-choreographed reveals, SVG ring charts that animate on scroll, and a marquee with gradient typography. Shipped as a static site on CDN-only dependencies — no framework tax.",
        outcomes: [
            "No-framework stack, ~8 KB gzipped JS",
            "GSAP ScrollTrigger choreography across 9 sections",
            "Animated SVG ring charts and counters",
            "Sub-second loads on cheap hosting",
        ],
    },
    {
        id: "009",
        slug: "click2minimize",
        title: "Click2Minimize",
        description: "macOS utility that adds click-to-minimize to the Dock — native Cocoa integration with an AppleScript fallback for Catalyst and Electron apps.",
        longDescription: "A lightweight accessibility utility that extends the macOS Dock with a feature power users have been asking for since OS X: click an app's Dock icon to minimise its windows. Uses AXUIElement accessibility APIs natively, with an AppleScript fallback for stubborn cross-platform apps.",
        tech: ["Swift", "Cocoa", "ApplicationServices", "AppleScript", "AXUIElement"],
        metrics: [
            { label: "Target", value: "macOS 13+" },
            { label: "Footprint", value: "Background / minimal" },
            { label: "Compatibility", value: "Native + Catalyst + Electron" },
        ],
        color: "bg-ink",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/Click2Minimize",
        category: "macOS",
        problem: "macOS doesn't let you minimise an app by clicking its Dock icon — a small papercut that power users have complained about for twenty years.",
        solution: "Swift + AXUIElement accessibility APIs to interact with the macOS Window Server directly, plus an AppleScript fallback for Catalyst/Electron apps that don't expose proper AX hierarchies. Runs silently in the background with minimal resource use.",
        outcomes: [
            "Adds click-to-minimise to the Dock",
            "Native accessibility-API path with AppleScript fallback",
            "Handles modern Catalyst and Electron apps",
            "Background-only, minimal resource footprint",
        ],
    },
    {
        id: "010",
        slug: "fortress",
        title: "Fortress",
        description: "Cryptographically secure password generator with entropy calculation, crack-time estimation, and a colour-rich CLI. Zero dependencies for the core library.",
        longDescription: "Fortress generates passwords via Python's `secrets` module (never `random`), calculates exact entropy per password, and estimates crack time across a few attacker profiles. Ships as an importable library with zero runtime dependencies, plus an optional Rich-powered CLI.",
        tech: ["Python", "secrets", "Rich (CLI)", "pytest", "GitHub Actions"],
        metrics: [
            { label: "Core Deps", value: "0" },
            { label: "Test Coverage", value: "80%+" },
            { label: "CI", value: "GitHub Actions" },
        ],
        color: "bg-hotpink",
        textColor: "text-cream",
        link: "https://github.com/hatimhtm/Fortress",
        category: "CLI",
        problem: "Most password generators either use `random` (insecure) or bury entropy behind a vague 'strength meter'. Developers wanted a tool that was cryptographically correct and showed its work.",
        solution: "Built on Python's `secrets` module, exposed entropy and crack-time as first-class outputs, and kept the core library dependency-free so it's safe to drop into any security-sensitive project.",
        outcomes: [
            "Cryptographically secure via `secrets` module",
            "Entropy calculation per generated password",
            "Crack-time estimation against attacker profiles",
            "Zero runtime dependencies in core library",
        ],
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return projects.map((p) => p.slug);
}
