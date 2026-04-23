import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CommandPalette from "@/components/ui/CommandPalette";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import { themeScript } from "@/lib/theme-script";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Hatim El Hassak — Full-Stack Engineer",
    description:
        "Full-stack engineer shipping production-ready products in hours. From native iOS apps to AI-powered agents. Based in the Philippines, building worldwide.",
    keywords: ["full-stack", "engineer", "developer", "portfolio", "iOS", "AI", "Next.js", "Hatim El Hassak"],
    authors: [{ name: "Hatim El Hassak" }],
    icons: {
        icon: "/favicon.svg",
    },
    openGraph: {
        title: "Hatim El Hassak — Full-Stack Engineer",
        description: "Full-stack engineer shipping production-ready products in hours.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: themeScript,
                    }}
                />
            </head>
            <body className="font-mono font-bold bg-cream text-ink antialiased selection:bg-acid selection:text-ink cursor-none">
                <ThemeProvider>
                    <LoadingScreen />
                    <CustomCursor />
                    <ScrollProgress />
                    <CommandPalette />

                    {/* Main content */}
                    <main>{children}</main>

                    {/* Bottom Navigation */}
                    <nav className="fixed bottom-0 left-0 w-full bg-ink border-t-[3px] border-ink z-[100] shadow-[0px_-4px_20px_rgba(0,0,0,0.3)]">
                        <div className="max-w-7xl mx-auto px-3 md:px-8 py-2.5 md:py-3 flex justify-between items-center gap-1">
                            <MagneticButton>
                                <Link
                                    href="/"
                                    className="font-mono text-[0.6rem] md:text-xs font-bold uppercase tracking-wider text-cream/60 hover:text-acid transition-colors px-1.5 md:px-2 py-1"
                                >
                                    Home
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    href="/work"
                                    className="font-mono text-[0.6rem] md:text-xs font-bold uppercase tracking-wider text-cream/60 hover:text-acid transition-colors px-1.5 md:px-2 py-1"
                                >
                                    Work
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    href="/stack"
                                    className="font-mono text-[0.6rem] md:text-xs font-bold uppercase tracking-wider text-cream/60 hover:text-acid transition-colors px-1.5 md:px-2 py-1"
                                >
                                    Stack
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    href="/services"
                                    className="font-mono text-[0.6rem] md:text-xs font-bold uppercase tracking-wider text-cream/60 hover:text-acid transition-colors px-1.5 md:px-2 py-1"
                                >
                                    Services
                                </Link>
                            </MagneticButton>
                            <ThemeToggle />
                            <MagneticButton>
                                <a
                                    href="/resume.pdf"
                                    download="Hatim_El_Hassak_Resume.pdf"
                                    className="hidden md:flex items-center gap-1 font-mono text-[0.6rem] md:text-xs font-bold uppercase tracking-wider text-cream/60 hover:text-acid transition-colors px-2 py-1 border-[2px] md:border-[3px] border-cream/30 hover:border-acid"
                                    aria-label="Download Resume"
                                >
                                    CV ↓
                                </a>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    href="/contact"
                                    className="bg-acid text-ink px-3 md:px-4 py-1.5 md:py-2 font-heading font-bold text-[0.6rem] md:text-xs uppercase tracking-wider border-[2px] md:border-[3px] border-ink hover:bg-cream transition-colors"
                                >
                                    Let&apos;s Talk
                                </Link>
                            </MagneticButton>
                        </div>
                    </nav>

                    {/* Keyboard shortcut hint - desktop only */}
                    <div className="fixed bottom-16 right-4 hidden lg:block z-[99]">
                        <div className="font-mono text-[0.5rem] font-bold text-ink/20 uppercase tracking-wider flex items-center gap-1">
                            <kbd className="px-1 py-0.5 border border-ink/10 text-ink/20">⌘K</kbd>
                            Quick Nav
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
