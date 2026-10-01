import Link from "next/link";

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-[70dvh] max-w-page flex-col justify-center px-6 pt-32 md:px-12">
            <h1 className="text-[2.8rem] font-bold leading-[1.02] tracking-display md:text-[4rem]">This page doesn&apos;t exist.</h1>
            <p className="mt-4 text-lg text-ink2">The link may be old. The work is all here:</p>
            <div className="mt-8 flex gap-3">
                <Link href="/work" className="pill pill-accent">See the work</Link>
                <Link href="/" className="pill glass text-ink">Home</Link>
            </div>
        </div>
    );
}
