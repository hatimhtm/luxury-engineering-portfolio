import { getAllSlugs, projects } from './projects';

describe('getAllSlugs', () => {
    it('should return an array of strings', () => {
        const slugs = getAllSlugs();
        expect(Array.isArray(slugs)).toBe(true);
        slugs.forEach((slug) => {
            expect(typeof slug).toBe('string');
        });
    });

    it('should return all project slugs', () => {
        const slugs = getAllSlugs();
        const expectedSlugs = projects.map((p) => p.slug);
        expect(slugs).toEqual(expectedSlugs);
    });

    it('should have the correct length', () => {
        const slugs = getAllSlugs();
        expect(slugs.length).toBe(projects.length);
    });

    it('should contain specific known slugs', () => {
        const slugs = getAllSlugs();
        expect(slugs).toContain('ag1-dashboard');
        expect(slugs).toContain('echoscribe');
        expect(slugs).toContain('fortress');
        expect(slugs).toContain('portfolio-v3');
    });
});
