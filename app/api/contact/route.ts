import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    record.count += 1;
    return false;
}

export async function POST(req: NextRequest) {
    try {
        const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { name, email, budget, brief } = body;

        // Basic validation
        if (!name || !email || !brief) {
            return NextResponse.json(
                { error: "Name, email, and project brief are required." },
                { status: 400 }
            );
        }

        // Length validation
        if (typeof name !== 'string' || name.length > 100) {
            return NextResponse.json(
                { error: "Name is too long (maximum 100 characters)." },
                { status: 400 }
            );
        }
        if (typeof email !== 'string' || email.length > 500) {
            return NextResponse.json(
                { error: "Email is too long (maximum 500 characters)." },
                { status: 400 }
            );
        }
        if (typeof brief !== 'string' || brief.length > 5000) {
            return NextResponse.json(
                { error: "Project brief is too long (maximum 5000 characters)." },
                { status: 400 }
            );
        }
        if (budget && (typeof budget !== 'string' || budget.length > 100)) {
            return NextResponse.json(
                { error: "Budget is too long (maximum 100 characters)." },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        // Send to Formspree (free tier - up to 50/month)
        // Use environmental variable FORMSPREE_ID if present, otherwise fallback to endpoint
        const FORMSPREE_ID = process.env.FORMSPREE_ID;
        const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || (FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null);

        if (!FORMSPREE_ENDPOINT) {
            console.error("Formspree configuration missing: FORMSPREE_ID or FORMSPREE_ENDPOINT must be set.");
            return NextResponse.json(
                { error: "Configuration error. Please contact the administrator." },
                { status: 500 }
            );
        }

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
            console.error(`Formspree error: ${formspreeResponse.status} ${formspreeResponse.statusText}`);
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
