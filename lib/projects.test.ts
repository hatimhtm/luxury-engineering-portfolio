import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getAllSlugs, projects } from './projects.ts';

describe('getAllSlugs', () => {
    it('returns an array of all project slugs', () => {
        const slugs = getAllSlugs();
        const expectedSlugs = projects.map(p => p.slug);

        assert.deepStrictEqual(slugs, expectedSlugs);
    });

    it('returns the correct number of slugs', () => {
        const slugs = getAllSlugs();
        assert.strictEqual(slugs.length, projects.length);
    });

    it('returns an array containing specific known slugs', () => {
        const slugs = getAllSlugs();
        // Since we know the projects array from projects.ts
        assert.ok(slugs.includes('ag1-dashboard'));
        assert.ok(slugs.includes('portfolio-v3'));
    });
});
