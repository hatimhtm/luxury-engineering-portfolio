import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';
import { NextRequest, NextResponse } from 'next/server';

vi.mock('next/server', () => {
    return {
        NextResponse: {
            json: vi.fn((data, init) => ({ data, status: init?.status ?? 200 })),
        },
    };
});

describe('Contact API - Environment Variables', () => {
    const originalEnv = process.env;
    let fetchMock: any;

    beforeEach(() => {
        vi.resetModules();
        process.env = { ...originalEnv };
        fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true })
        });
        global.fetch = fetchMock;
    });

    afterEach(() => {
        process.env = originalEnv;
        vi.clearAllMocks();
    });

    const createMockRequest = (body: any) => {
        return {
            json: vi.fn().mockResolvedValue(body)
        } as unknown as NextRequest;
    };

    const validBody = {
        name: 'John Doe',
        email: 'john@example.com',
        brief: 'A test project brief'
    };

    it('should use FORMSPREE_ENDPOINT when provided', async () => {
        process.env.FORMSPREE_ENDPOINT = 'https://custom.endpoint/f/test';
        process.env.FORMSPREE_ID = 'ignored_id';

        const req = createMockRequest(validBody);
        await POST(req);

        expect(fetchMock).toHaveBeenCalledWith(
            'https://custom.endpoint/f/test',
            expect.any(Object)
        );
    });

    it('should fallback to FORMSPREE_ID when FORMSPREE_ENDPOINT is missing', async () => {
        delete process.env.FORMSPREE_ENDPOINT;
        process.env.FORMSPREE_ID = 'test_id_123';

        const req = createMockRequest(validBody);
        await POST(req);

        expect(fetchMock).toHaveBeenCalledWith(
            'https://formspree.io/f/test_id_123',
            expect.any(Object)
        );
    });

    it('should fallback to default YOUR_FORM_ID when both env vars are missing', async () => {
        delete process.env.FORMSPREE_ENDPOINT;
        delete process.env.FORMSPREE_ID;

        const req = createMockRequest(validBody);
        await POST(req);

        expect(fetchMock).toHaveBeenCalledWith(
            'https://formspree.io/f/YOUR_FORM_ID',
            expect.any(Object)
        );
    });
});
