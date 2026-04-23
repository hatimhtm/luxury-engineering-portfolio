import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("POST /api/contact", () => {
    let consoleSpy: any;

    beforeEach(() => {
        // Suppress console.error during the test to keep output clean
        consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
        vi.restoreAllMocks();
    });

    it("returns 400 if required fields are missing", async () => {
        const req = new NextRequest("http://localhost/api/contact", {
            method: "POST",
            body: JSON.stringify({ name: "John" }) // Missing email and brief
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBe("Name, email, and project brief are required.");
    });

    it("returns 400 if email is invalid", async () => {
        const req = new NextRequest("http://localhost/api/contact", {
            method: "POST",
            body: JSON.stringify({ name: "John", email: "invalid-email", brief: "Hello" })
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBe("Please provide a valid email address.");
    });

    it("returns 500 if Formspree fetch fails", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            text: async () => "Formspree rejected"
        });

        const req = new NextRequest("http://localhost/api/contact", {
            method: "POST",
            body: JSON.stringify({ name: "John", email: "john@example.com", brief: "Hello" })
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data.error).toBe("Failed to send message. Please try again or email directly.");
    });

    it("returns 200 on success", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true
        });

        const req = new NextRequest("http://localhost/api/contact", {
            method: "POST",
            body: JSON.stringify({ name: "John", email: "john@example.com", brief: "Hello" })
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toBe("Message sent successfully!");
    });

    it("handles JSON parsing error (hits catch block)", async () => {
        const req = new NextRequest("http://localhost/api/contact", {
            method: "POST",
            body: "invalid json" // This will cause req.json() to throw
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data.error).toBe("Something went wrong. Please email hatimelhassak.official@gmail.com directly.");
    });
});
