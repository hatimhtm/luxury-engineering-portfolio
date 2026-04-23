import { test, expect, vi, describe, afterEach, beforeEach } from "vitest";
import { POST } from "./route";
import { NextResponse } from "next/server";

vi.mock("next/server", () => {
    return {
        NextResponse: {
            json: vi.fn((body, init) => ({ body, init }))
        }
    };
});

describe("POST /api/contact", () => {
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = vi.fn();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        global.fetch = originalFetch;
        vi.clearAllMocks();
    });

    test("returns 400 if required fields are missing", async () => {
        const req = {
            json: async () => ({
                name: "John",
                // email missing
                brief: "Some brief"
            })
        } as any;

        const response = await POST(req);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: "Name, email, and project brief are required." },
            { status: 400 }
        );
    });

    test("returns 400 if email is invalid", async () => {
        const req = {
            json: async () => ({
                name: "John",
                email: "invalid-email",
                brief: "Some brief"
            })
        } as any;

        const response = await POST(req);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: "Please provide a valid email address." },
            { status: 400 }
        );
    });

    test("returns 500 if formspree fails", async () => {
        const req = {
            json: async () => ({
                name: "John",
                email: "test@example.com",
                brief: "Some brief"
            })
        } as any;

        (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            text: async () => "Internal Server Error"
        });

        const response = await POST(req);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: "Failed to send message. Please try again or email directly." },
            { status: 500 }
        );
        expect(global.fetch).toHaveBeenCalled();
    });

    test("returns 200 on success", async () => {
        const req = {
            json: async () => ({
                name: "John",
                email: "test@example.com",
                brief: "Some brief"
            })
        } as any;

        (global.fetch as any).mockResolvedValueOnce({
            ok: true
        });

        const response = await POST(req);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { success: true, message: "Message sent successfully!" }
        );
        expect(global.fetch).toHaveBeenCalled();
    });

    test("returns 500 on unexpected error (e.g. invalid json)", async () => {
        const req = {
            json: async () => { throw new Error("Invalid JSON"); }
        } as any;

        const response = await POST(req);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: "Something went wrong. Please email hatimelhassak.official@gmail.com directly." },
            { status: 500 }
        );
    });
});
