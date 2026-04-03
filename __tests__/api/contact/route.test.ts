import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '../../../app/api/contact/route';
import { NextRequest } from 'next/server';

// Mock NextResponse
vi.mock('next/server', () => {
    return {
        NextResponse: {
            json: vi.fn((body, init) => {
                return { body, status: init?.status || 200 };
            }),
        },
        NextRequest: vi.fn(),
    };
});

describe('Contact API - POST', () => {
    const originalEnv = process.env;
    const originalFetch = global.fetch;
    let consoleErrorSpy: any;

    beforeEach(() => {
        vi.resetModules();
        process.env = { ...originalEnv };
        global.fetch = vi.fn();
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        process.env = originalEnv;
        global.fetch = originalFetch;
        consoleErrorSpy.mockRestore();
    });

    const createMockRequest = (body: any) => {
        return {
            json: vi.fn().mockResolvedValue(body),
        } as unknown as NextRequest;
    };

    const validRequestBody = {
        name: 'John Doe',
        email: 'john@example.com',
        brief: 'Test project brief',
        budget: '1000',
    };

    it('should use YOUR_FORM_ID when both FORMSPREE_ID and FORMSPREE_ENDPOINT are missing', async () => {
        delete process.env.FORMSPREE_ID;
        delete process.env.FORMSPREE_ENDPOINT;

        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
        });

        const req = createMockRequest(validRequestBody);
        await POST(req);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://formspree.io/f/YOUR_FORM_ID',
            expect.any(Object)
        );
    });

    it('should construct endpoint with FORMSPREE_ID if provided', async () => {
        process.env.FORMSPREE_ID = 'test_form_id';
        delete process.env.FORMSPREE_ENDPOINT;

        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
        });

        const req = createMockRequest(validRequestBody);
        await POST(req);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://formspree.io/f/test_form_id',
            expect.any(Object)
        );
    });

    it('should prioritize FORMSPREE_ENDPOINT if both are provided', async () => {
        process.env.FORMSPREE_ID = 'test_form_id';
        process.env.FORMSPREE_ENDPOINT = 'https://custom-endpoint.com/f';

        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
        });

        const req = createMockRequest(validRequestBody);
        await POST(req);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://custom-endpoint.com/f',
            expect.any(Object)
        );
    });

    it('should use FORMSPREE_ENDPOINT when FORMSPREE_ID is missing but ENDPOINT is provided', async () => {
        delete process.env.FORMSPREE_ID;
        process.env.FORMSPREE_ENDPOINT = 'https://another-endpoint.com/api';

        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
        });

        const req = createMockRequest(validRequestBody);
        await POST(req);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://another-endpoint.com/api',
            expect.any(Object)
        );
    });
});
