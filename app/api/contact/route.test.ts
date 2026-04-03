import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((body, init) => ({
      status: init?.status ?? 200,
      json: async () => body,
      body, // Include body for easier assertion in tests without parsing json
    })),
  },
}));

describe('Contact API POST', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup a default mock for fetch to prevent unhandled rejections or accidental network calls
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
    } as unknown as Response);

    // Silence console.error during tests to keep output clean
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return 400 if required fields are missing', async () => {
    const mockRequest = {
      json: vi.fn().mockResolvedValue({ name: 'Test', email: '' }), // Missing brief, empty email
    } as unknown as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(400);
    expect((response as any).body).toEqual({
      error: 'Name, email, and project brief are required.',
    });
  });

  it('should return 400 if email is invalid', async () => {
    const mockRequest = {
      json: vi.fn().mockResolvedValue({ name: 'Test', email: 'invalid-email', brief: 'Hello' }),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(400);
    expect((response as any).body).toEqual({
      error: 'Please provide a valid email address.',
    });
  });

  it('should return 500 when formspree API fails', async () => {
    const mockRequest = {
      json: vi.fn().mockResolvedValue({ name: 'Test', email: 'test@example.com', brief: 'Hello' }),
    } as unknown as NextRequest;

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: vi.fn().mockResolvedValue('Simulated formspree error'),
    } as unknown as Response);

    const response = await POST(mockRequest);

    expect(response.status).toBe(500);
    expect((response as any).body).toEqual({
      error: 'Failed to send message. Please try again or email directly.',
    });

    // Verify console.error was called for the formspree error
    expect(console.error).toHaveBeenCalledWith('Formspree error:', 'Simulated formspree error');
  });

  it('should return 200 when formspree API succeeds', async () => {
    const mockRequest = {
      json: vi.fn().mockResolvedValue({ name: 'Test', email: 'test@example.com', brief: 'Hello' }),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(200);
    expect((response as any).body).toEqual({
      success: true,
      message: 'Message sent successfully!',
    });
  });

  it('should return 500 when an exception is thrown in the try block', async () => {
    // Simulating an error when trying to parse the JSON body
    const mockError = new Error('Simulated JSON parsing error');
    const mockRequest = {
      json: vi.fn().mockRejectedValue(mockError),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);

    // Verify it handles the catch block correctly
    expect(response.status).toBe(500);
    expect((response as any).body).toEqual({
      error: 'Something went wrong. Please email hatimelhassak.official@gmail.com directly.',
    });

    // Verify it logged the error
    expect(console.error).toHaveBeenCalledWith('Contact form error:', mockError);
  });
});
