import test from 'node:test';
import assert from 'node:assert';

test('missing-field error path', async () => {
    // Override require for next/server since next/server doesn't resolve simply outside
    // the Next.js execution context without proper configuration.
    const Module = (await import('module')).default;
    const originalRequire = Module.prototype.require;
    Module.prototype.require = function(request) {
        if (request === 'next/server') {
            return {
                NextRequest: class NextRequest {},
                NextResponse: class NextResponse {
                    static json(body: any, init?: any) {
                        return {
                            status: init?.status ?? 200,
                            json: async () => body
                        };
                    }
                }
            };
        }
        return originalRequire.apply(this, arguments);
    };

    const { POST } = await import('./route');

    const testCases = [
        { name: 'Missing email', body: { name: 'John', brief: 'Some brief' } },
        { name: 'Missing name', body: { email: 'john@example.com', brief: 'Some brief' } },
        { name: 'Missing brief', body: { name: 'John', email: 'john@example.com' } },
        { name: 'All fields missing', body: {} }
    ];

    try {
        for (const testCase of testCases) {
            const mockReq = {
                json: async () => testCase.body
            } as any;

            const response = await POST(mockReq);

            assert.strictEqual(response.status, 400, `Expected status 400 for ${testCase.name}`);
            const data = await response.json();
            assert.strictEqual(data.error, "Name, email, and project brief are required.", `Expected error message for ${testCase.name}`);
        }
    } finally {
        // Cleanup
        Module.prototype.require = originalRequire;
    }
});
