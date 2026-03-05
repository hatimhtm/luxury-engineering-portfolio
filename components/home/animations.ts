export const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
