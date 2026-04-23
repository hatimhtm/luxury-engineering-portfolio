// A simplified script to test the logic directly

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    record.count += 1;
    return false;
}

import assert from 'node:assert';

const testIp = '123.45.67.89';

// Make 5 successful requests
for (let i = 0; i < 5; i++) {
    const limited = isRateLimited(testIp);
    assert.strictEqual(limited, false, `Request ${i + 1} should not be rate limited`);
}

// 6th request should be blocked
const limited = isRateLimited(testIp);
assert.strictEqual(limited, true, '6th request should be rate limited');

console.log("Rate limiter logic test passed!");
