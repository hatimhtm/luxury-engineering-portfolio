"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    bgColor = "bg-cream",
    textColor = "text-ink",
    href,
    index = 0,
    mediaHeader = false,
}: {
    className?: string;
    title?: string | ReactNode;
    description?: string | ReactNode;
    header?: ReactNode;
    icon?: ReactNode;
    bgColor?: string;
    textColor?: string;
    href?: string;
    index?: number;
    /** Header contains real imagery — render it at full opacity. */
    mediaHeader?: boolean;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useMotionTemplate`${mouseY.get() * -5}deg`;
    const rotateY = useMotionTemplate`${mouseX.get() * 5}deg`;

    const content = (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "row-span-1 relative overflow-hidden group neo-card h-full w-full flex flex-col justify-between p-6 cursor-pointer neo-glow perspective-1000",
                bgColor,
                textColor,
                className
            )}
        >
            {/* Gradient Highlight Border on Hover */}
            <div className="absolute inset-0 rounded-[inherit] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-[-2px] bg-gradient-to-r from-acid via-electric to-hotpink rounded-[inherit] -z-10 animate-gradient" />
            </div>

            {/* Background Pattern / Header — decorative patterns are dimmed,
                real imagery renders at full strength */}
            <div
                className={cn(
                    "absolute inset-0 z-0 transition-opacity duration-300",
                    mediaHeader ? "opacity-100" : "opacity-40 group-hover:opacity-80"
                )}
                style={{ transform: "translateZ(20px)" }}
            >
                {header}
            </div>

            {/* Top Right Arrow */}
            <div className="relative z-10 flex justify-end" style={{ transform: "translateZ(30px)" }}>
                {href && (
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto flex flex-col gap-2" style={{ transform: "translateZ(40px)" }}>
                {icon}
                <div className="border-t-[3px] border-current pt-3">
                    <div className="font-heading font-bold text-xl md:text-2xl uppercase tracking-tight leading-none mb-1">
                        {title}
                    </div>
                    <div className="font-mono text-[0.7rem] font-bold uppercase opacity-70 tracking-widest leading-relaxed">
                        {description}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (href) {
        // The Link is the grid child — col/row span classes must live on it,
        // not only on the inner card, or the grid ignores them.
        return (
            <Link href={href} className={cn("flex h-full w-full", className)}>
                {content}
            </Link>
        );
    }

    return content;
};
