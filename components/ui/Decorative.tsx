export const CircuitPattern = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 20h40v40H20z" stroke="currentColor" strokeWidth="2" />
        <path d="M60 40h40" stroke="currentColor" strokeWidth="2" />
        <path d="M100 20h40v40h-40z" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="40" r="4" fill="currentColor" />
        <path d="M140 40h40" stroke="currentColor" strokeWidth="2" />
        <path d="M20 80h60" stroke="currentColor" strokeWidth="2" />
        <circle cx="80" cy="80" r="6" fill="currentColor" />
        <path d="M86 80h34" stroke="currentColor" strokeWidth="2" />
        <path d="M120 60v40" stroke="currentColor" strokeWidth="2" />
        <path d="M120 100h60" stroke="currentColor" strokeWidth="2" />
        <path d="M20 120h40v40H20z" stroke="currentColor" strokeWidth="2" />
        <circle cx="40" cy="140" r="6" fill="currentColor" />
        <path d="M60 140h80" stroke="currentColor" strokeWidth="2" />
        <path d="M140 120v40" stroke="currentColor" strokeWidth="2" />
        <path d="M140 160h40" stroke="currentColor" strokeWidth="2" />
        <circle cx="160" cy="160" r="4" fill="currentColor" />
        <path d="M160 160v20" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const GRID_DOTS = Array.from({ length: 10 }).map((_, row) =>
    Array.from({ length: 10 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={5 + col * 10} cy={5 + row * 10} r="1.5" opacity={0.3} />
    ))
);

export const GridDots = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {GRID_DOTS}
    </svg>
);

const CROSS_HATCH_LINES = Array.from({ length: 8 }).map((_, i) => (
    <g key={i}>
        <line x1={0} y1={i * 15} x2={120} y2={i * 15} opacity="0.15" />
        <line x1={i * 15} y1={0} x2={i * 15} y2={120} opacity="0.15" />
    </g>
));

export const CrossHatch = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        {CROSS_HATCH_LINES}
        <rect x="30" y="30" width="60" height="60" strokeWidth="2" opacity="0.3" />
        <line x1="30" y1="30" x2="90" y2="90" opacity="0.2" />
        <line x1="90" y1="30" x2="30" y2="90" opacity="0.2" />
    </svg>
);
