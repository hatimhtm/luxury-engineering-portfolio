import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { cn } from './utils.ts';

describe('cn utility', () => {
    it('merges simple strings', () => {
        assert.strictEqual(cn('a', 'b', 'c'), 'a b c');
    });

    it('handles conditional classes', () => {
        assert.strictEqual(cn('a', { b: true, c: false }, 'd'), 'a b d');
    });

    it('handles arrays', () => {
        assert.strictEqual(cn(['a', 'b'], 'c'), 'a b c');
    });

    it('merges tailwind classes properly', () => {
        assert.strictEqual(cn('p-4 p-8'), 'p-8');
        assert.strictEqual(cn('text-red-500 bg-blue-500', 'text-green-500'), 'bg-blue-500 text-green-500');
    });

    it('handles falsy values', () => {
        assert.strictEqual(cn('a', null, undefined, false, 0, '', 'b'), 'a b');
    });
});
