/**
 * Every film on the Video work page.
 * To add one: put <slug>.mp4 and <slug>-poster.jpg in public/work, then add a line to the right list (newest first).
 * The page lays itself out for any number of films.
 */

/** A vertical film (9:16) made for a shop or a brand from its own photos and footage. */
export type ShortFilm = { slug: string; name: string; place: string; kind: string; seconds: number; note: string };

export const SHORT_FILMS: ShortFilm[] = [
    { slug: "fragrosense", name: "Fragrosense", place: "Dubai", kind: "Perfume", seconds: 23, note: "A misted pane of glass clears onto the shop's own bottles, then its Scent on Demand service." },
    { slug: "arab-kandora", name: "Arab Kandora", place: "Dubai", kind: "Fashion", seconds: 23, note: "Four Gulf cuts drawn in tailor's chalk, then the shop's own photos in every colour." },
    { slug: "le-zent", name: "Le Zent", place: "Dubai", kind: "Perfume", seconds: 19, note: "A perfume range, each bottle on its own colour, from the shop's product shots." },
];

/** A wide film (16:9). `href` links the name to its case study. */
export type WideFilm = { slug: string; name: string; seconds: number; note: string; href?: string };

export const LAUNCH_FILMS: WideFilm[] = [
    { slug: "estelle", name: "Estelle", seconds: 25, note: "Launch film for my own iPhone app. Motion design, a 3D phone and sound design.", href: "/work/estelle" },
    { slug: "gopilates", name: "GoPilates", seconds: 42, note: "Launch film for a client's fitness app, built in Blender.", href: "/work/gopilates" },
];

export const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`;
