import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getProjectBySlug, getAllSlugs, projects } from './projects.ts';

describe('projects data access', () => {
    describe('getProjectBySlug', () => {
        test('returns project when given a valid slug', () => {
            const project = getProjectBySlug('ag1-dashboard');
            assert.strictEqual(project?.id, '001');
            assert.strictEqual(project?.title, 'AG1 Dashboard');
        });

        test('returns undefined when given an invalid slug', () => {
            const project = getProjectBySlug('non-existent-slug');
            assert.strictEqual(project, undefined);
        });
    });

    describe('getAllSlugs', () => {
        test('returns an array of all project slugs', () => {
            const slugs = getAllSlugs();
            assert.strictEqual(slugs.length, projects.length);
            assert.ok(slugs.includes('ag1-dashboard'));
            assert.ok(slugs.includes('echoscribe'));

            // verify it matches actual project slugs
            const expectedSlugs = projects.map(p => p.slug);
            assert.deepStrictEqual(slugs, expectedSlugs);
        });
    });
});
