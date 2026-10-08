"use client";

import Link from "next/link";
import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, type MotionValue } from "framer-motion";
import { ArrowUpRight, HandGrabbing } from "@phosphor-icons/react";
import LiquidGlass from "@/components/glass/LiquidGlass";
import { supportsRefraction } from "@/components/glass/displacement";
import SplitReveal from "@/components/motion/SplitReveal";
import { useTheme } from "@/components/ui/ThemeProvider";
import { BOOK_CALL } from "@/lib/site";

// the looping 3D drift; off until the 2560 px render replaces the 1600 px one
const HERO_LOOP = false;
// the same idea for phones: the camera drifts around the two phones (public/work/hero-phone-loop.mp4, rendered in portrait
// at 1296 x 1620 and trimmed like the still, so its first frame lies exactly on the picture it fades in over)
const PHONE_LOOP = true;

/**
 * The moving scene on a phone. It starts on the exact frame of the still picture and fades in over it once it plays,
 * so the first screen never waits for it. Only a narrow screen asks for the file, and not one that saves data.
 */
function PhoneLoop() {
    const ref = useRef<HTMLVideoElement>(null);
    const [on, setOn] = useState(false);
    useEffect(() => {
        const v = ref.current;
        const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        if (!v || saver || !window.matchMedia("(max-width: 767px)").matches) return;
        v.src = "/work/hero-phone-loop.mp4";
        v.play().catch(() => {});
    }, []);
    return (
        <video
            ref={ref}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            onPlaying={() => setOn(true)}
            className={`theme-day absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out md:hidden ${on ? "opacity-100" : "opacity-0"}`}
        />
    );
}

/**
 * The scene, framed twice: the wide render on a desktop, and below 768 px a portrait render made for a phone
 * (two phones large in front of the Mac window). A phone downloads the portrait picture only.
 */
function Scene({ night = false }: { night?: boolean }) {
    const wide = getImageProps({ alt: "", src: night ? "/work/hero-night.jpg" : "/work/hero-day.jpg", width: 2560, height: 1600, sizes: "100vw", quality: night ? 90 : 92 }).props;
    const tall = getImageProps({ alt: "", src: night ? "/work/hero-phone-night.jpg" : "/work/hero-phone-day.jpg", width: 1412, height: 1765, sizes: "100vw", quality: 90 }).props;
    return (
        <picture>
            <source media="(min-width: 768px)" srcSet={wide.srcSet} sizes="100vw" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                alt=""
                src={tall.src}
                srcSet={tall.srcSet}
                sizes="100vw"
                width={1412}
                height={1765}
                decoding="async"
                // the night picture has no box until dark mode is chosen, so "lazy" keeps it off the wire until then
                loading={night ? "lazy" : "eager"}
                fetchPriority={night ? "auto" : "high"}
                data-hero={night ? "night" : "day"}
                className={`${night ? "theme-night" : "theme-day"} absolute inset-0 h-full w-full object-cover object-top md:object-[center_46%]`}
            />
        </picture>
    );
}

/**
 * Where a browser can't bend what is behind the glass (every browser on an iPhone), the lens on a phone shows the
 * picture under it, enlarged: a loupe. It reads the picture the hero already loaded, so nothing else is fetched.
 */
function Loupe({ box, lx, ly }: { box: React.RefObject<HTMLElement>; lx: MotionValue<number>; ly: MotionValue<number> }) {
    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [pic, setPic] = useState("");
    const [geo, setGeo] = useState({ left: 0, top: 0, d: 0, w: 0, h: 0 });
    const ZOOM = 1.24;

    useEffect(() => {
        const host = box.current;
        const el = ref.current;
        if (!host || !el) return;
        const read = () => {
            const mover = el.closest<HTMLElement>("[data-lens]");
            const band = host.querySelector<HTMLElement>("[data-band]");
            const img = host.querySelector<HTMLImageElement>(`img[data-hero="${theme === "dark" ? "night" : "day"}"]`);
            if (!mover || !band) return;
            setGeo({ left: mover.offsetLeft, top: mover.offsetTop, d: mover.offsetWidth, w: band.offsetWidth, h: band.offsetHeight });
            if (img?.currentSrc) setPic(img.currentSrc);
            else img?.addEventListener("load", read, { once: true });
        };
        read();
        const ro = new ResizeObserver(read);
        ro.observe(host);
        return () => ro.disconnect();
    }, [box, theme]);

    const position = useTransform([lx, ly] as never, ([x, y]: number[]) => {
        const { left, top, d } = geo;
        return `${-((left + d / 2 + x) * ZOOM - d / 2)}px ${-((top + d / 2 + y) * ZOOM - d / 2)}px`;
    });

    return (
        <motion.div
            ref={ref}
            className="lg loupe h-[34vw] max-h-[150px] w-[34vw] max-w-[150px]"
            style={{ backgroundImage: pic ? `url("${pic}")` : undefined, backgroundSize: `${geo.w * ZOOM}px ${geo.h * ZOOM}px`, backgroundPosition: position }}
        />
    );
}

export default function Hero() {
    const reduce = useReducedMotion();
    const box = useRef<HTMLElement>(null);
    const band = useRef<HTMLDivElement>(null);
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const sx = useSpring(px, { stiffness: 50, damping: 18 });
    const sy = useSpring(py, { stiffness: 50, damping: 18 });
    const { scrollYProgress } = useScroll({ target: box, offset: ["start start", "end start"] });
    const drift = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const bgX = useTransform(sx, (v) => v * -18);
    const bgY = useTransform([sy, drift] as never, ([a, b]: number[]) => a * -12 + b);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, -220]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    // the lens squashes along its direction of travel, like a drop of water
    const lx = useMotionValue(0);
    const ly = useMotionValue(0);
    const vx = useVelocity(lx);
    const vy = useVelocity(ly);
    const squash = useSpring(useTransform([vx, vy] as never, ([a, b]: number[]) => Math.min(0.16, Math.hypot(a, b) / 9000)), { stiffness: 300, damping: 22 });
    const scaleX = useTransform(squash, (s) => 1 + s);
    const scaleY = useTransform(squash, (s) => 1 - s * 0.8);
    const [dragged, setDragged] = useState(false);

    // Which lens this browser gets is only known once the page runs here, so the lens arrives then, already as glass,
    // instead of flashing as a blur first. On a phone the scene stands still: the copy never slides away under a thumb.
    const [glass, setGlass] = useState<"wait" | "refract" | "frost" | "loupe">("wait");
    const [phone, setPhone] = useState(false);
    useEffect(() => {
        const narrow = window.matchMedia("(max-width: 767px)");
        const read = () => {
            setPhone(narrow.matches);
            setGlass(supportsRefraction() ? "refract" : narrow.matches ? "loupe" : "frost");
        };
        read();
        narrow.addEventListener("change", read);
        return () => narrow.removeEventListener("change", read);
    }, []);
    const still = reduce || phone;

    const onMove = (e: React.PointerEvent) => {
        if (reduce || e.pointerType !== "mouse" || !box.current) return;
        const r = box.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
    };

    return (
        <section ref={box} onPointerMove={onMove} className="relative overflow-hidden md:min-h-[100dvh]">
            <motion.div ref={band} data-band aria-hidden style={still ? undefined : { x: bgX, y: bgY, scale: bgScale }} className="absolute inset-x-0 top-0 aspect-[4/5] max-md:!transform-none md:bottom-0 md:aspect-auto">
                <Scene />
                {!reduce && PHONE_LOOP && <PhoneLoop />}
                {!reduce && HERO_LOOP && (
                    // a slow 3D camera drift around the devices, rendered in Blender, looping
                    <video
                        className="theme-day absolute inset-0 hidden h-full w-full object-cover object-[center_46%] md:block"
                        src="/work/hero-loop.mp4"
                        poster="/work/hero-day.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-hidden
                    />
                )}
                <Scene night />
            </motion.div>
            <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-b from-transparent via-transparent to-page md:block" />
            <div aria-hidden className="hero-scrim pointer-events-none absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-page/85 via-page/50 to-transparent" />

            <div className="hero-copy relative mx-auto flex max-w-[1280px] flex-col px-5 md:min-h-[100dvh] md:justify-center md:px-10 md:pb-24 md:pt-32">
                {/* on a phone the words sit on the page colour, and the picture fades into it just above them */}
                <div className="relative -mx-5 bg-page px-5 pb-12 md:mx-0 md:bg-transparent md:px-0 md:pb-0">
                    <div aria-hidden className="hero-fade pointer-events-none absolute inset-x-0 bottom-full bg-gradient-to-b from-transparent to-page md:hidden" />
                    <motion.div style={still ? undefined : { y: copyY, opacity: copyOpacity }} className="max-w-[640px] max-md:!transform-none max-md:!opacity-100">
                        <SplitReveal as="h1" text="I build native apps for iPhone, Mac and Android." delay={0.15} className="display text-[clamp(2.2rem,10vw,3rem)] text-ink [text-wrap:balance] sm:text-[3.9rem] lg:text-[4.5rem]" />
                        <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7, ease: [0.23, 1, 0.32, 1] }} className="mt-4 max-w-[34rem] text-[16.5px] leading-[1.55] text-ink2 md:mt-6 md:text-[20px] md:leading-relaxed">
                            GoPilates is rated 4.4 by 208 people in France. Hope Assistant books a therapy practice&apos;s appointments on its own. I built both.
                        </motion.p>
                        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7, ease: [0.23, 1, 0.32, 1] }} className="mt-6 flex flex-wrap items-center gap-3 md:mt-9">
                            <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                                Book a call <span className="dot"><ArrowUpRight size={15} weight="bold" /></span>
                            </a>
                            <Link href="/work">
                                <LiquidGlass radius={999} bezel={10} strength={14} frost={6} tint="var(--gt-lo)" touch="plain" className="px-6 py-3.5 text-[15.5px] font-semibold text-ink transition-transform active:scale-[0.97]">
                                    See the work
                                </LiquidGlass>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* A lens of liquid glass you can drag over the scene */}
            <motion.div
                data-lens
                drag={!reduce}
                dragConstraints={glass === "loupe" ? band : box}
                dragElastic={0.14}
                dragMomentum
                onDragStart={() => setDragged(true)}
                style={{ x: lx, y: ly, scaleX: reduce ? 1 : scaleX, scaleY: reduce ? 1 : scaleY, touchAction: "none" }}
                className="absolute left-[31vw] top-[30vw] z-10 cursor-grab active:cursor-grabbing md:left-auto md:right-[22%] md:top-[33%]"
                aria-label="A glass lens you can drag over the picture"
                role="img"
            >
                <motion.div
                    initial={false}
                    animate={glass === "wait" ? { opacity: 0, scale: 0.86 } : { opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.7, bounce: 0.22, delay: 0.25 }}
                >
                    <motion.div animate={dragged || reduce ? { y: 0 } : { y: [0, -8, 0] }} transition={dragged ? { duration: 0.3 } : { duration: 3.2, repeat: 4, ease: "easeInOut" }}>
                        {glass === "loupe" ? (
                            <Loupe box={box} lx={lx} ly={ly} />
                        ) : (
                            <LiquidGlass
                                radius={999}
                                bezel={phone ? 26 : 40}
                                strength={phone ? 28 : 40}
                                magnify={phone ? 0.2 : 0.2}
                                frost={0}
                                touch="refract"
                                className="h-[34vw] max-h-[150px] w-[34vw] max-w-[150px] md:h-[200px] md:max-h-none md:w-[200px] md:max-w-none"
                            />
                        )}
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: dragged ? 0 : 1 }} transition={{ delay: dragged ? 0 : 1.6, duration: 0.4 }} className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <LiquidGlass radius={999} bezel={6} strength={8} frost={8} tint="var(--gt-mid)" className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-ink">
                            <HandGrabbing size={15} weight="bold" /> Drag the glass
                        </LiquidGlass>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
