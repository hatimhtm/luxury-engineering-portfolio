import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { BOOK_CALL, EMAIL, GITHUB, LINKEDIN } from "@/lib/site";

export const metadata: Metadata = {
    title: "Contact",
    description: "Book a call with Hatim El Hassak or send a message. Replies the same day.",
};

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-page px-6 pt-32 md:px-12 md:pt-40">
            <div className="grid gap-12 md:grid-cols-12">
                <div className="md:col-span-5">
                    <h1 className="text-[2.8rem] font-bold leading-[1.02] tracking-display md:text-[4rem]">Contact</h1>
                    <p className="mt-4 text-lg leading-relaxed text-ink2">The fastest way is a 30-minute call. I reply to messages the same day.</p>
                    <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="pill pill-accent mt-8">Book a call</a>
                    <dl className="mt-12 space-y-5 text-[16px]">
                        <div>
                            <dt className="text-sm text-ink3">Email</dt>
                            <dd><a href={`mailto:${EMAIL}`} className="link">{EMAIL}</a></dd>
                        </div>
                        <div>
                            <dt className="text-sm text-ink3">Elsewhere</dt>
                            <dd className="flex gap-5">
                                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="link">GitHub</a>
                                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm text-ink3">Hours</dt>
                            <dd className="text-ink2">Live on European mornings, 3 to 7 PM in Manila.</dd>
                        </div>
                    </dl>
                </div>
                <div className="md:col-span-7">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
