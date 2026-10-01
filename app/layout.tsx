import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import { themeScript } from "@/lib/theme-script";
import { SITE_URL } from "@/lib/site";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

/* Satoshi (Indian Type Foundry, Fontshare, ITF Free Font License), self-hosted. */
const satoshi = localFont({
    src: [
        { path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
        { path: "./fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
    ],
    variable: "--font-satoshi",
    display: "swap",
});

/* Clash Display (Indian Type Foundry, Fontshare, ITF Free Font License), for big headings. */
const clash = localFont({
    src: [{ path: "./fonts/ClashDisplay-Variable.woff2", weight: "200 700", style: "normal" }],
    variable: "--font-clash",
    display: "swap",
});

const TITLE = "Hatim El Hassak, senior product engineer";
const DESCRIPTION =
    "Native apps for iPhone, Mac and Android, and the systems behind them. GoPilates, Hope Assistant, Viral OS, Estelle and more, written up as case studies.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: TITLE, template: "%s, Hatim El Hassak" },
    description: DESCRIPTION,
    keywords: ["senior iOS developer", "SwiftUI", "Kotlin", "Next.js", "product engineer", "freelance", "Hatim El Hassak"],
    authors: [{ name: "Hatim El Hassak", url: SITE_URL }],
    creator: "Hatim El Hassak",
    alternates: { canonical: "/" },
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }] },
    openGraph: { type: "website", url: SITE_URL, siteName: "Hatim El Hassak", title: TITLE, description: DESCRIPTION },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#F6F5F1" },
        { media: "(prefers-color-scheme: dark)", color: "#121315" },
    ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${satoshi.variable} ${clash.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="bg-page text-ink antialiased">
                <ThemeProvider>
                    <SiteNav />
                    <main>{children}</main>
                    <SiteFooter />
                </ThemeProvider>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
