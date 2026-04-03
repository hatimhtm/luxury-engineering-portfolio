import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug, getAllSlugs } from './projects';

describe('projects util', () => {
  describe('getAllSlugs', () => {
    it('returns an array of strings', () => {
      const slugs = getAllSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.length).toBeGreaterThan(0);
      slugs.forEach(slug => {
        expect(typeof slug).toBe('string');
      });
    });

    it('returns the correct number of slugs', () => {
      const slugs = getAllSlugs();
      expect(slugs.length).toBe(projects.length);
    });

    it('contains expected slugs', () => {
      const slugs = getAllSlugs();
      const expectedSlugs = projects.map(p => p.slug);
      expectedSlugs.forEach(expectedSlug => {
        expect(slugs).toContain(expectedSlug);
      });
    });
  });

  describe('getProjectBySlug', () => {
    it('returns the correct project for a valid slug', () => {
      const targetProject = projects[0];
      const result = getProjectBySlug(targetProject.slug);
      expect(result).toBeDefined();
      expect(result?.id).toBe(targetProject.id);
      expect(result?.title).toBe(targetProject.title);
    });

    it('returns undefined for an invalid slug', () => {
      const result = getProjectBySlug('non-existent-slug-12345');
      expect(result).toBeUndefined();
    });
  });
});
