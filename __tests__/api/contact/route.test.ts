import { POST } from '../../../app/api/contact/route';
import { NextRequest } from 'next/server';

// Mock the global fetch
global.fetch = jest.fn();

describe('POST /api/contact', () => {
  const mockFetch = global.fetch as jest.Mock;

  beforeEach(() => {
    mockFetch.mockClear();
    // Silence console.error during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    process.env.FORMSPREE_ENDPOINT = 'https://formspree.io/f/test-endpoint';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const createMockRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  it('should return 400 if required fields are missing', async () => {
    const req = createMockRequest({ name: '', email: 'test@example.com', brief: 'A brief' });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Name, email, and project brief are required.');
  });

  it('should return 400 if email is invalid', async () => {
    const req = createMockRequest({ name: 'Test', email: 'invalid-email', brief: 'A brief' });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Please provide a valid email address.');
  });

  it('should return 200 on successful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const payload = { name: 'Test User', email: 'test@example.com', budget: '$1k', brief: 'A brief' };
    const req = createMockRequest(payload);
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe('Message sent successfully!');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://formspree.io/f/test-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        budget: payload.budget,
        brief: payload.brief,
        _subject: `New Project Inquiry from ${payload.name}`,
      }),
    });
  });

  it('should return 500 on Formspree error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Error from Formspree',
    });

    const payload = { name: 'Test User', email: 'test@example.com', brief: 'A brief' };
    const req = createMockRequest(payload);
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to send message. Please try again or email directly.');
    expect(console.error).toHaveBeenCalledWith('Formspree error:', 'Error from Formspree');
  });

  it('should return 500 on unexpected network/system error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const payload = { name: 'Test User', email: 'test@example.com', brief: 'A brief' };
    const req = createMockRequest(payload);
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Something went wrong. Please email hatimelhassak.official@gmail.com directly.');
    expect(console.error).toHaveBeenCalledWith('Contact form error:', expect.any(Error));
  });
});
