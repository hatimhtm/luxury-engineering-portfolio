import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock process.env
process.env.FORMSPREE_ID = 'test_id';

describe('Contact API', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();

    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
      text: async () => 'Success'
    });
  });

  const createMockRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  };

  it('should return 400 if required fields are missing', async () => {
    const req = createMockRequest({
      name: 'Test',
      // email missing
      brief: 'Test brief'
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('Name, email, and project brief are required.');
  });

  it('should return 400 if email is invalid', async () => {
    const req = createMockRequest({
      name: 'Test',
      email: 'invalid-email',
      brief: 'Test brief'
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('Please provide a valid email address.');
  });

  it('should send successful response if all fields are valid', async () => {
    const req = createMockRequest({
      name: 'Test Name',
      email: 'test@example.com',
      brief: 'Test brief description'
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe('Message sent successfully!');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://formspree.io/f/test_id',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    );
  });
});
