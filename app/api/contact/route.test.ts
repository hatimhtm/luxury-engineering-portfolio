import { test, describe, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert";
import Module from "node:module";
import { NextRequest } from "next/server";

// We need to mock Next.js next/server
const originalRequire = Module.prototype.require;
(Module.prototype as any).require = function (id: string) {
    if (id === "next/server") {
        return {
            NextRequest: class MockNextRequest {
                input: string;
                init: any;
                constructor(input: string, init: any) {
                    this.input = input;
                    this.init = init;
                }
                async json() {
                    return JSON.parse(this.init?.body || "{}");
                }
            },
            NextResponse: {
                json: (body: any, init: any) => {
                    return { body, init };
                }
            }
        };
    }
    return originalRequire.apply(this, arguments as any);
};

describe("Contact API", () => {
    let originalFetch: typeof global.fetch;
    let originalConsoleError: typeof console.error;

    beforeEach(() => {
        originalFetch = global.fetch;
        originalConsoleError = console.error;
        console.error = mock.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
        console.error = originalConsoleError;
        mock.restoreAll();
    });

    test("handles Formspree fetch failure", async () => {
        // Need to import after the require mock is set up
        const { POST } = await import("./route");
        const { NextRequest } = require("next/server");

        // Mock fetch to simulate Formspree failure
        global.fetch = mock.fn(async () => {
            return {
                ok: false,
                text: async () => "Forbidden",
            } as Response;
        });

        // Create a fake NextRequest
        const req = new NextRequest("http://localhost/api/contact", {
            method: "POST",
            body: JSON.stringify({
                name: "John Doe",
                email: "john@example.com",
                brief: "Test brief",
            }),
        });

        // Execute the handler
        const response = await POST(req as any);

        // Assert the expected error response
        assert.deepStrictEqual(response.body, { error: "Failed to send message. Please try again or email directly." });
        assert.deepStrictEqual(response.init, { status: 500 });

        // Verify fetch was called with the expected endpoint
        assert.strictEqual((global.fetch as any).mock.calls.length, 1);
        assert.strictEqual((global.fetch as any).mock.calls[0].arguments[0], "https://formspree.io/f/YOUR_FORM_ID");

        // Verify console.error was called
        assert.strictEqual((console.error as any).mock.calls.length, 1);
        assert.strictEqual((console.error as any).mock.calls[0].arguments[0], "Formspree error:");
        assert.strictEqual((console.error as any).mock.calls[0].arguments[1], "Forbidden");
    });
});
