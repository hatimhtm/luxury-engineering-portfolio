"use client";

import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { displacementMap, supportsRefraction, touchScreen } from "./displacement";

export type LiquidGlassProps = {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Corner radius in px; anything larger than half the short side makes a pill or a circle. */
    radius?: number;
    /** Width of the curved rim, in px. */
    bezel?: number;
    /** How far the rim bends the backdrop, in px. */
    strength?: number;
    /** Lens zoom in the middle, 0 to about 0.3. */
    magnify?: number;
    /** Frost behind the refraction, in px. 0 is clear glass. */
    frost?: number;
    /** Split the colours slightly at the rim, like real glass. */
    chroma?: boolean;
    /** Tint over the glass, any CSS colour. */
    tint?: string;
    /**
     * What the glass does on phones and tablets. "frost" (the default) blurs what is behind it, which is cheap enough
     * for bars that stay put. "refract" bends the backdrop like on a desktop: keep it for one small hero piece.
     * "plain" drops the backdrop filter: use it for anything that scrolls with the page, where a blur costs frames.
     */
    touch?: "frost" | "refract" | "plain";
    as?: "div" | "nav" | "header" | "section" | "span";
} & Omit<React.HTMLAttributes<HTMLElement>, "style" | "className" | "children">;

/**
 * Liquid Glass on the web. In Chromium the backdrop is bent through an SVG displacement filter
 * (real refraction, rim highlight, slight colour split). Elsewhere it falls back to frosted glass,
 * and to a solid surface when the system asks for reduced transparency (see .lg in globals.css).
 * On touch screens it frosts unless told otherwise (see `touch`), so scrolling stays smooth on a phone.
 */
const LiquidGlass = forwardRef<HTMLElement, LiquidGlassProps>(function LiquidGlass(
    { children, className = "", style, radius = 999, bezel = 16, strength = 26, magnify = 0, frost = 1.5, chroma = true, tint, touch = "frost", as = "div", ...rest },
    outer,
) {
    const ref = useRef<HTMLElement>(null);
    useImperativeHandle(outer, () => ref.current as HTMLElement);
    const id = useId().replace(/:/g, "");
    const [size, setSize] = useState<{ w: number; h: number } | null>(null);
    const [refract, setRefract] = useState(false);
    const [map, setMap] = useState("");

    useEffect(() => setRefract(supportsRefraction() && (touch === "refract" || !touchScreen())), [touch]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([e]) => {
            const b = e.borderBoxSize?.[0];
            const w = b ? b.inlineSize : e.contentRect.width;
            const h = b ? b.blockSize : e.contentRect.height;
            setSize((s) => (s && Math.abs(s.w - w) < 1 && Math.abs(s.h - h) < 1 ? s : { w, h }));
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        if (!refract || !size) return;
        setMap(displacementMap({ w: size.w, h: size.h, radius, bezel, magnify, scale: Math.min(2, window.devicePixelRatio || 1) }));
    }, [refract, size, radius, bezel, magnify]);

    const r = size ? Math.min(radius, size.w / 2, size.h / 2) : radius;
    const filterId = `lg-${id}`;
    const live = refract && map && size;
    const backdrop = live
        ? `url(#${filterId})${frost ? ` blur(${frost}px)` : ""} saturate(140%) brightness(1.05)`
        : `blur(${Math.max(frost, 10)}px) saturate(170%) brightness(1.04)`;

    const Tag = as as "div";
    return (
        <>
            {live && (
                <svg aria-hidden width="0" height="0" style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
                    <filter id={filterId} x="0" y="0" width={size!.w} height={size!.h} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feImage href={map} x="0" y="0" width={size!.w} height={size!.h} preserveAspectRatio="none" result="raw" />
                        <feGaussianBlur in="raw" stdDeviation="0.7" result="map" />
                        {chroma ? (
                            <>
                                <feDisplacementMap in="SourceGraphic" in2="map" scale={strength * 2} xChannelSelector="R" yChannelSelector="G" result="dr" />
                                <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
                                <feDisplacementMap in="SourceGraphic" in2="map" scale={strength * 1.97} xChannelSelector="R" yChannelSelector="G" result="dg" />
                                <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
                                <feDisplacementMap in="SourceGraphic" in2="map" scale={strength * 1.94} xChannelSelector="R" yChannelSelector="G" result="db" />
                                <feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
                                <feBlend in="r" in2="g" mode="screen" result="rg" />
                                <feBlend in="rg" in2="b" mode="screen" />
                            </>
                        ) : (
                            <feDisplacementMap in="SourceGraphic" in2="map" scale={strength * 2} xChannelSelector="R" yChannelSelector="G" />
                        )}
                    </filter>
                </svg>
            )}
            <Tag
                ref={ref as React.Ref<HTMLDivElement>}
                {...(rest as React.HTMLAttributes<HTMLDivElement>)}
                className={`lg ${touch === "plain" ? "lg-plain " : ""}${className}`}
                data-glass={live ? "refract" : "frost"}
                style={{
                    borderRadius: r,
                    backdropFilter: backdrop,
                    WebkitBackdropFilter: backdrop,
                    ...(tint ? ({ "--lg-tint": tint } as CSSProperties) : null),
                    ...style,
                }}
            >
                {children}
            </Tag>
        </>
    );
});

export default LiquidGlass;
