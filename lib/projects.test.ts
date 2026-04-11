import { test, expect, describe } from "bun:test";
import { getAllSlugs, projects } from "./projects";

describe("getAllSlugs", () => {
    test("returns an array of strings representing project slugs", () => {
        const slugs = getAllSlugs();

        // It should return the exact number of projects
        expect(slugs).toHaveLength(projects.length);

        // Ensure every returned item is a string
        slugs.forEach(slug => {
            expect(typeof slug).toBe("string");
        });

        // Ensure the slugs match the actual project slugs
        const expectedSlugs = projects.map(p => p.slug);
        expect(slugs).toEqual(expectedSlugs);
    });

    test("returns specific known slugs from the static list", () => {
        const slugs = getAllSlugs();

        // Based on the static projects list, these should be present
        expect(slugs).toContain("ag1-dashboard");
        expect(slugs).toContain("echoscribe");
        expect(slugs).toContain("fortress");
        expect(slugs).toContain("portfolio-v3");
    });
});
