import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const SITE_URL = "https://hatimelhassak.is-a.dev";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${SITE_URL}/stack`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ];

    const caseStudies: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${SITE_URL}/work/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...caseStudies];
}
