import { describe, it, expect, mock, beforeEach, afterEach, spyOn } from 'bun:test';
import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock NextResponse
mock.module('next/server', () => {
  return {
    NextResponse: {
      json: mock((data, options) => ({
        data,
        status: options?.status || 200,
      })),
    },
  };
});

describe('POST /api/contact', () => {
  let originalFetch: typeof global.fetch;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalFetch = global.fetch;
    originalEnv = { ...process.env };
    // silence console.error during tests
    spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env = originalEnv;
  });

  it('should return 400 if required fields are missing', async () => {
    const req = {
      json: async () => ({ name: '', email: '', brief: '' }),
    } as unknown as NextRequest;

    const res: any = await POST(req);

    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "Name, email, and project brief are required." });
  });

  it('should return 400 if email is invalid', async () => {
    const req = {
      json: async () => ({ name: 'John Doe', email: 'invalid-email', brief: 'Test project' }),
    } as unknown as NextRequest;

    const res: any = await POST(req);

    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "Please provide a valid email address." });
  });

  it('should return 500 if Formspree fails', async () => {
    global.fetch = mock().mockResolvedValue({
      ok: false,
      text: async () => 'Error from Formspree',
    });

    const req = {
      json: async () => ({ name: 'John Doe', email: 'john@example.com', brief: 'Test project' }),
    } as unknown as NextRequest;

    const res: any = await POST(req);

    expect(res.status).toBe(500);
    expect(res.data).toEqual({ error: "Failed to send message. Please try again or email directly." });

    expect(global.fetch).toHaveBeenCalled();
  });

  it('should return 200 and success message on success', async () => {
    global.fetch = mock().mockResolvedValue({
      ok: true,
    });

    const req = {
      json: async () => ({ name: 'John Doe', email: 'john@example.com', brief: 'Test project' }),
    } as unknown as NextRequest;

    const res: any = await POST(req);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ success: true, message: "Message sent successfully!" });

    expect(global.fetch).toHaveBeenCalled();
  });

  it('should return 500 if parsing req.json() throws an error', async () => {
    const req = {
      json: async () => { throw new Error('Failed to parse json'); },
    } as unknown as NextRequest;

    const res: any = await POST(req);

    expect(res.status).toBe(500);
    expect(res.data).toEqual({ error: "Something went wrong. Please email hatimelhassak.official@gmail.com directly." });
  });
});
