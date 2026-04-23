import test from 'node:test';
import assert from 'node:assert';
import Module from 'node:module';

// Mock next/server before importing the route
const originalRequire = Module.prototype.require;
Module.prototype.require = function (id: string) {
    if (id === 'next/server') {
        return {
            NextRequest: class NextRequest {
                input: any;
                init: any;
                constructor(input: any, init?: any) {
                    this.input = input;
                    this.init = init;
                }
                async json() {
                    return typeof this.init?.body === 'string' ? JSON.parse(this.init.body) : (this.init?.body || {});
                }
            },
            NextResponse: {
                json: (body: any, init?: any) => {
                    return { body, status: init?.status || 200 };
                }
            }
        };
    }
    return originalRequire.apply(this, arguments as any);
};

test('Contact API - Missing Field Validation', async (t) => {
    // Dynamically import the route to use the mocked next/server
    const { POST } = await import('./route.ts');

    // For convenience in tests
    const createReq = (bodyObj: any) => {
        const { NextRequest } = require('next/server');
        return new NextRequest('http://localhost/api/contact', {
            method: 'POST',
            body: bodyObj
        });
    };

    await t.test('returns 400 when name is missing', async () => {
        const req = createReq({ email: 'test@example.com', brief: 'A brief', budget: '100' });
        const res = await POST(req);
        assert.strictEqual(res.status, 400);
        assert.deepStrictEqual(res.body, { error: 'Name, email, and project brief are required.' });
    });

    await t.test('returns 400 when email is missing', async () => {
        const req = createReq({ name: 'John Doe', brief: 'A brief', budget: '100' });
        const res = await POST(req);
        assert.strictEqual(res.status, 400);
        assert.deepStrictEqual(res.body, { error: 'Name, email, and project brief are required.' });
    });

    await t.test('returns 400 when brief is missing', async () => {
        const req = createReq({ name: 'John Doe', email: 'test@example.com', budget: '100' });
        const res = await POST(req);
        assert.strictEqual(res.status, 400);
        assert.deepStrictEqual(res.body, { error: 'Name, email, and project brief are required.' });
    });

    await t.test('returns 400 when all required fields are missing', async () => {
        const req = createReq({});
        const res = await POST(req);
        assert.strictEqual(res.status, 400);
        assert.deepStrictEqual(res.body, { error: 'Name, email, and project brief are required.' });
    });

    await t.test('returns 400 when fields are empty strings', async () => {
        const req = createReq({ name: '', email: '', brief: '' });
        const res = await POST(req);
        assert.strictEqual(res.status, 400);
        assert.deepStrictEqual(res.body, { error: 'Name, email, and project brief are required.' });
    });
});
