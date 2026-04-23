import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

// Mock next/server
vi.mock("next/server", () => {
    return {
        NextResponse: {
            json: vi.fn((body, init) => {
                return { body, init };
            }),
        },
    };
});

import { NextResponse } from "next/server";

describe("POST /api/contact", () => {
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        vi.spyOn(console, "error").mockImplementation(() => {});
        vi.clearAllMocks();
    });

    afterEach(() => {
        global.fetch = originalFetch;
        vi.restoreAllMocks();
    });

    it("should return 400 when required fields are missing", async () => {
        const req = {
            json: async () => ({
                name: "John Doe",
                // email missing
                brief: "Test project brief",
            }),
        } as any;

        await POST(req);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: "Name, email, and project brief are required." },
            { status: 400 }
        );
    });

    it("should return 400 when email is invalid", async () => {
        const req = {
            json: async () => ({
                name: "John Doe",
                email: "invalid-email",
                brief: "Test project brief",
            }),
        } as any;

        await POST(req);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: "Please provide a valid email address." },
            { status: 400 }
        );
    });

    it("should return 500 when Formspree API fails", async () => {
        // Mock fetch to return a failed response
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            text: async () => "Mocked Formspree error",
        });

        const req = {
            json: async () => ({
                name: "John Doe",
                email: "john@example.com",
                brief: "Test project brief",
                budget: "1000",
            }),
        } as any;

        await POST(req);

        expect(global.fetch).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: "Failed to send message. Please try again or email directly." },
            { status: 500 }
        );
        expect(console.error).toHaveBeenCalledWith("Formspree error:", "Mocked Formspree error");
    });

    it("should return 200 when Formspree API succeeds", async () => {
        // Mock fetch to return a successful response
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
        });

        const req = {
            json: async () => ({
                name: "John Doe",
                email: "john@example.com",
                brief: "Test project brief",
                budget: "1000",
            }),
        } as any;

        await POST(req);

        expect(global.fetch).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(
            { success: true, message: "Message sent successfully!" }
        );
    });

    it("should return 500 when an unexpected error occurs", async () => {
        const req = {
            json: async () => {
                throw new Error("Unexpected error");
            },
        } as any;

        await POST(req);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: "Something went wrong. Please email hatimelhassak.official@gmail.com directly." },
            { status: 500 }
        );
        expect(console.error).toHaveBeenCalled();
    });
});
