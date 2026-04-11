import React from "react";

interface StatusBarProps {
    leftLabel: string;
    rightLabel: React.ReactNode;
}

export function StatusBar({ leftLabel, rightLabel }: StatusBarProps) {
    return (
        <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                <span className="font-mono text-xs font-bold text-cream/50 uppercase tracking-widest">
                    {leftLabel}
                </span>
            </div>
            <span className="font-mono text-xs font-bold text-cream/30 tracking-widest uppercase">
                {rightLabel}
            </span>
        </div>
    );
}
