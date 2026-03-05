import { POST } from "./route";
import { NextRequest } from "next/server";
import { describe, it, expect } from "vitest";

function createMockRequest(body: any): NextRequest {
    return {
        json: async () => body,
    } as unknown as NextRequest;
}

describe("POST /api/contact", () => {
    it("should return 400 when name is missing", async () => {
        const req = createMockRequest({
            email: "test@example.com",
            brief: "This is a brief",
        });
        const res = await POST(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toBe("Name, email, and project brief are required.");
    });

    it("should return 400 when email is missing", async () => {
        const req = createMockRequest({
            name: "John Doe",
            brief: "This is a brief",
        });
        const res = await POST(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toBe("Name, email, and project brief are required.");
    });

    it("should return 400 when brief is missing", async () => {
        const req = createMockRequest({
            name: "John Doe",
            email: "test@example.com",
        });
        const res = await POST(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toBe("Name, email, and project brief are required.");
    });

    it("should return 400 when email format is invalid", async () => {
        const req = createMockRequest({
            name: "John Doe",
            email: "not-an-email",
            brief: "This is a brief",
        });
        const res = await POST(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toBe("Please provide a valid email address.");
    });
});
