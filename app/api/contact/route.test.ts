import { test, describe, beforeEach, afterEach } from 'node:test';
import * as assert from 'node:assert';

describe('Contact API Route', () => {
    let originalFetch: typeof fetch;

    beforeEach(() => {
        originalFetch = global.fetch;
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test('should return 400 for missing fields', async () => {
        const route = await import('./route.ts');
        const { NextRequest } = await import('next/server');

        const req = new NextRequest('http://localhost/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: '',
                email: 'test@example.com',
                brief: 'Testing'
            })
        });

        const response = await route.POST(req);
        assert.strictEqual(response.status, 400);

        const data = await response.json();
        assert.strictEqual(data.error, "Name, email, and project brief are required.");
    });

    test('should return 400 for invalid email', async () => {
        const route = await import('./route.ts');
        const { NextRequest } = await import('next/server');

        const req = new NextRequest('http://localhost/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test',
                email: 'invalid-email',
                brief: 'Testing'
            })
        });

        const response = await route.POST(req);
        assert.strictEqual(response.status, 400);

        const data = await response.json();
        assert.strictEqual(data.error, "Please provide a valid email address.");
    });

    test('should return 400 for email missing domain', async () => {
        const route = await import('./route.ts');
        const { NextRequest } = await import('next/server');

        const req = new NextRequest('http://localhost/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test',
                email: 'test@',
                brief: 'Testing'
            })
        });

        const response = await route.POST(req);
        assert.strictEqual(response.status, 400);

        const data = await response.json();
        assert.strictEqual(data.error, "Please provide a valid email address.");
    });

    test('should return 400 for email missing @', async () => {
        const route = await import('./route.ts');
        const { NextRequest } = await import('next/server');

        const req = new NextRequest('http://localhost/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test',
                email: 'test.example.com',
                brief: 'Testing'
            })
        });

        const response = await route.POST(req);
        assert.strictEqual(response.status, 400);

        const data = await response.json();
        assert.strictEqual(data.error, "Please provide a valid email address.");
    });

    test('should return 200 for valid submission', async () => {
        const route = await import('./route.ts');
        const { NextRequest } = await import('next/server');

        const req = new NextRequest('http://localhost/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test',
                email: 'test@example.com',
                brief: 'Testing'
            })
        });

        // Mock successful fetch response
        global.fetch = async () => ({
            ok: true,
            text: async () => ''
        }) as any;

        const response = await route.POST(req);
        assert.strictEqual(response.status, 200);

        const data = await response.json();
        assert.strictEqual(data.success, true);
        assert.strictEqual(data.message, "Message sent successfully!");
    });

    test('should return 500 when Formspree fails', async () => {
        const route = await import('./route.ts');
        const { NextRequest } = await import('next/server');

        const req = new NextRequest('http://localhost/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test',
                email: 'test@example.com',
                brief: 'Testing'
            })
        });

        // Mock failed fetch response
        global.fetch = async () => ({
            ok: false,
            text: async () => 'Internal Server Error'
        }) as any;

        const response = await route.POST(req);
        assert.strictEqual(response.status, 500);

        const data = await response.json();
        assert.strictEqual(data.error, "Failed to send message. Please try again or email directly.");
    });
});
