import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';

// Mock NextResponse
vi.mock('next/server', () => {
    return {
        NextResponse: {
            json: (body: any, init?: { status?: number }) => {
                return {
                    status: init?.status || 200,
                    json: async () => body,
                } as unknown as Response;
            }
        }
    };
});

describe('Contact API route', () => {
    let originalConsoleError: typeof console.error;
    let consoleErrorOutput: Error | null;

    beforeEach(() => {
        originalConsoleError = console.error;
        consoleErrorOutput = null;
        console.error = (msg: string, err: Error) => {
            consoleErrorOutput = err;
        };
    });

    afterEach(() => {
        console.error = originalConsoleError;
        vi.restoreAllMocks();
    });

    it('should catch errors and return a 500 status', async () => {
        // Create a mock request that throws an error on json()
        const req = {
            json: async () => {
                throw new Error('Test JSON error');
            }
        } as any;

        const response = await POST(req);

        expect(response.status).toBe(500);

        const body = await response.json();
        expect(body).toEqual({
            error: "Something went wrong. Please email hatimelhassak.official@gmail.com directly."
        });

        // Check if error was logged
        expect(consoleErrorOutput).toBeInstanceOf(Error);
        expect(consoleErrorOutput?.message).toBe('Test JSON error');
    });
});
