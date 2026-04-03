import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock next/server
vi.mock('next/server', () => {
  return {
    NextRequest: vi.fn(),
    NextResponse: {
      json: vi.fn((body, init) => {
        return { body, status: init?.status ?? 200 };
      })
    }
  };
});

describe('POST /api/contact', () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env = originalEnv;
  });

  const createMockRequest = (body: any) => {
    return {
      json: vi.fn().mockResolvedValue(body)
    } as unknown as NextRequest;
  };

  it('should return 400 if required fields are missing', async () => {
    const req = createMockRequest({
      name: 'John Doe',
      // email is missing
      brief: 'Test project'
    });

    const response = await POST(req) as any;

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Name, email, and project brief are required.' });
  });

  it('should return 400 if email is invalid', async () => {
    const req = createMockRequest({
      name: 'John Doe',
      email: 'invalid-email',
      brief: 'Test project'
    });

    const response = await POST(req) as any;

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Please provide a valid email address.' });
  });

  it('should return 200 on successful Formspree submission', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true
    });

    const req = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      budget: '1000',
      brief: 'Test project'
    });

    const response = await POST(req) as any;

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200); // NextResponse.json mock sets status to 200 by default
    expect(response.body).toEqual({ success: true, message: 'Message sent successfully!' });
  });

  it('should return 500 if Formspree API returns an error', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      text: vi.fn().mockResolvedValue('Formspree error details')
    });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const req = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      brief: 'Test project'
    });

    const response = await POST(req) as any;

    expect(consoleErrorSpy).toHaveBeenCalledWith('Formspree error:', 'Formspree error details');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to send message. Please try again or email directly.' });

    consoleErrorSpy.mockRestore();
  });

  it('should return 500 on unexpected exceptions', async () => {
    const req = {
      json: vi.fn().mockRejectedValue(new Error('JSON parse error'))
    } as unknown as NextRequest;

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const response = await POST(req) as any;

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Something went wrong. Please email hatimelhassak.official@gmail.com directly.' });

    consoleErrorSpy.mockRestore();
  });
});
