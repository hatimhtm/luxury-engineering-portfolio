"use client";

/** Nav-bar ⌘K trigger — replaces the old floating hint that collided with content. */
export default function CmdKButton() {
    return (
        <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            aria-label="Open quick navigation (Cmd+K)"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 border-[3px] border-cream/40 text-cream/85 font-mono text-xs font-bold uppercase tracking-wider hover:bg-acid hover:text-ink hover:border-acid transition-all min-h-[40px]"
        >
            <kbd className="font-mono">⌘K</kbd>
        </button>
    );
}
