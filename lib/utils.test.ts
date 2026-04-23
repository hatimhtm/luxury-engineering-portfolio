import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { cn } from './utils.ts';

describe('cn utility', () => {
    it('merges basic tailwind classes', () => {
        assert.strictEqual(cn('p-4', 'm-4'), 'p-4 m-4');
    });

    it('handles conditional classes', () => {
        assert.strictEqual(cn('p-4', true && 'm-4', false && 'text-red-500'), 'p-4 m-4');
    });

    it('merges tailwind classes correctly (overrides)', () => {
        assert.strictEqual(cn('p-4', 'p-8'), 'p-8');
        assert.strictEqual(cn('text-red-500', 'text-blue-500'), 'text-blue-500');
    });

    it('handles arrays and objects', () => {
        assert.strictEqual(cn(['p-4', 'm-4'], { 'text-red-500': true, 'text-blue-500': false }), 'p-4 m-4 text-red-500');
    });
});
