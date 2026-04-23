import { isValidName, isValidEmail, isValidBrief } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, budget, brief } = body;

        // Basic validation
        if (!isValidName(name) || !isValidEmail(email) || !isValidBrief(brief)) {
            if (!isValidName(name) || !email || !isValidBrief(brief)) {
                return NextResponse.json(
                    { error: "Name, email, and project brief are required." },
                    { status: 400 }
                );
            }
            if (!isValidEmail(email)) {
                return NextResponse.json(
                    { error: "Please provide a valid email address." },
                    { status: 400 }
                );
            }
        }

        // Send to Formspree (free tier - up to 50/month)
        // Replace YOUR_FORM_ID with your Formspree form endpoint
        // Use environmental variable FORMSPREE_ID if present, otherwise fallback to endpoint
        const FORMSPREE_ID = process.env.FORMSPREE_ID;
        const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || (FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "https://formspree.io/f/YOUR_FORM_ID");

        const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                budget: budget || "Not specified",
                brief,
                _subject: `New Project Inquiry from ${name}`,
            }),
        });

        if (!formspreeResponse.ok) {
            const errorText = await formspreeResponse.text();
            console.error("Formspree error:", errorText);
            return NextResponse.json(
                { error: "Failed to send message. Please try again or email directly." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please email hatimelhassak.official@gmail.com directly." },
            { status: 500 }
        );
    }
}
