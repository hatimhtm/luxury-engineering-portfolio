import Link from "next/link";
import { BOOK_CALL, EMAIL, GITHUB, LINKEDIN } from "@/lib/site";

export default function SiteFooter() {
    return (
        <footer className="mx-auto max-w-page px-6 pb-14 pt-24 md:px-10">
            <div className="grid gap-10 border-t border-hairline pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
                <div>
                    <p className="text-lg font-bold tracking-title">Hatim El Hassak</p>
                    <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink2">
                        Senior product engineer. Native apps for iPhone, Mac and Android, and the systems behind them.
                    </p>
                </div>
                <nav className="flex flex-col gap-2 text-[15px] text-ink2" aria-label="Footer">
                    <Link href="/work" className="hover:text-ink">Work</Link>
                    <Link href="/stack" className="hover:text-ink">Stack</Link>
                    <Link href="/services" className="hover:text-ink">Services</Link>
                    <Link href="/contact" className="hover:text-ink">Contact</Link>
                </nav>
                <div className="flex flex-col gap-2 text-[15px] text-ink2">
                    <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Book a call</a>
                    <a href={`mailto:${EMAIL}`} className="hover:text-ink">{EMAIL}</a>
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
                </div>
            </div>
            <p className="mt-10 text-sm text-ink3">© 2026 Hatim El Hassak</p>
        </footer>
    );
}
