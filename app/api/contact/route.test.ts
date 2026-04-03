import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';

vi.mock('next/server', () => {
  return {
    NextResponse: {
      json: (body: any, init?: any) => {
        return {
          status: init?.status ?? 200,
          json: async () => body,
          body,
        };
      },
    },
  };
});

describe('POST /api/contact', () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;
    process.env = originalEnv;
  });

  it('should return 400 if required fields are missing', async () => {
    const req = {
      json: async () => ({ name: 'John Doe', email: 'john@example.com' }), // missing brief
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Name, email, and project brief are required.',
    });
  });

  it('should return 400 if email is invalid', async () => {
    const req = {
      json: async () => ({
        name: 'John Doe',
        email: 'invalid-email',
        brief: 'Test project brief',
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Please provide a valid email address.',
    });
  });

  it('should return 500 if Formspree API call fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'Rate limit exceeded',
    } as Response);

    const req = {
      json: async () => ({
        name: 'John Doe',
        email: 'john@example.com',
        brief: 'Test project brief',
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Failed to send message. Please try again or email directly.',
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Formspree error:', 'Rate limit exceeded');
  });

  it('should return 200 on successful submission', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
    } as Response);

    const req = {
      json: async () => ({
        name: 'John Doe',
        email: 'john@example.com',
        brief: 'Test project brief',
      }),
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Message sent successfully!',
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should return 500 if an unexpected error occurs', async () => {
    const req = {
      json: async () => {
        throw new Error('Unexpected error parsing JSON');
      },
    } as any;

    const response = await POST(req);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Something went wrong. Please email hatimelhassak.official@gmail.com directly.',
    });
    expect(console.error).toHaveBeenCalledWith('Contact form error:', expect.any(Error));
  });
});
