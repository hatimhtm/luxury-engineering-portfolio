import Image from "next/image";
import type { Project } from "@/lib/projects";
import { RENDERS } from "@/lib/media";
import AutoVideo from "./AutoVideo";

/** The best visual a project has: its film, then a render, then a site screenshot. Nothing otherwise. */
export function hasMedia(p: Project) {
    return Boolean(p.film || RENDERS[p.slug] || p.image);
}

export default function ProjectMedia({ project, sizes, priority = false, className = "" }: { project: Project; sizes: string; priority?: boolean; className?: string }) {
    if (project.film) {
        return <AutoVideo src={project.film.src} poster={project.film.poster} label={`${project.title} film`} className={`aspect-video w-full ${className}`} />;
    }
    const r = RENDERS[project.slug];
    if (r) {
        return (
            <div className={`relative aspect-[16/10] w-full overflow-hidden ${className}`}>
                <Image src={r.day} alt={r.alt} fill sizes={sizes} priority={priority} className={`${r.night ? "theme-day " : ""}object-cover`} />
                {r.night && <Image src={r.night} alt={r.alt} fill sizes={sizes} priority={priority} className="theme-night object-cover" />}
            </div>
        );
    }
    if (project.image) {
        return (
            <div className={`relative aspect-[16/10] w-full overflow-hidden bg-ink/5 ${className}`}>
                <Image src={project.image} alt={`${project.title}, screenshot`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
            </div>
        );
    }
    return null;
}
