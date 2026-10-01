/**
 * Liquid Glass, the refraction part.
 *
 * Builds a displacement map for a rounded rectangle: flat in the middle, a curved bezel at the edges.
 * Red and green encode how far each pixel of the backdrop is pulled inward, so content bends at the rim
 * the way it does through thick glass. `magnify` adds a lens zoom in the middle.
 * Used by an SVG <feDisplacementMap> that runs as a backdrop-filter (Chromium only).
 */
export type MapOptions = { w: number; h: number; radius: number; bezel: number; magnify?: number; scale?: number };

const cache = new Map<string, string>();

export function displacementMap({ w, h, radius, bezel, magnify = 0, scale = 1 }: MapOptions): string {
    // drawn at device resolution so the bend stays smooth on retina screens
    w = Math.max(2, Math.round(w * scale));
    h = Math.max(2, Math.round(h * scale));
    radius *= scale;
    bezel *= scale;
    const r = Math.min(radius, w / 2, h / 2);
    const key = `${w}x${h}r${r}b${bezel}m${magnify}`;
    const hit = cache.get(key);
    if (hit) return hit;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const img = ctx.createImageData(w, h);
    const hw = w / 2, hh = h / 2;
    const bz = Math.max(1, Math.min(bezel, Math.min(hw, hh)));

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const px = x + 0.5 - hw, py = y + 0.5 - hh;
            const qx = Math.abs(px) - (hw - r), qy = Math.abs(py) - (hh - r);
            // distance inside the shape, and the outward normal at the nearest edge
            let dist: number, nx: number, ny: number;
            if (qx > 0 && qy > 0) {
                const len = Math.hypot(qx, qy) || 1;
                dist = r - len;
                nx = (qx / len) * Math.sign(px);
                ny = (qy / len) * Math.sign(py);
            } else if (qx > qy) {
                dist = r - qx;
                nx = Math.sign(px);
                ny = 0;
            } else {
                dist = r - qy;
                nx = 0;
                ny = Math.sign(py);
            }
            let dx = 0, dy = 0;
            if (dist < bz && dist > -1) {
                // convex bezel: steepest at the rim, flat where the bezel meets the face
                const t = Math.max(0, dist) / bz;
                const m = Math.pow(1 - t, 2.4);
                dx = -nx * m;
                dy = -ny * m;
            }
            if (magnify) {
                // lens: sample closer to the centre, so the middle reads bigger
                dx += (-px / hw) * magnify;
                dy += (-py / hh) * magnify;
            }
            const i = (y * w + x) * 4;
            img.data[i] = Math.round(128 + Math.max(-1, Math.min(1, dx)) * 127);
            img.data[i + 1] = Math.round(128 + Math.max(-1, Math.min(1, dy)) * 127);
            img.data[i + 2] = 128;
            img.data[i + 3] = 255;
        }
    }
    ctx.putImageData(img, 0, 0);
    const url = canvas.toDataURL("image/png");
    cache.set(key, url);
    return url;
}

/** Chromium is the only engine that runs SVG filters as backdrop-filter. Everyone else gets frosted glass. */
export function supportsRefraction(): boolean {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    return /Chrome\/\d+/.test(ua) && !/Mobile.*Safari\/\d+(?!.*Chrome)/.test(ua) && !/CriOS|FxiOS/.test(ua);
}
