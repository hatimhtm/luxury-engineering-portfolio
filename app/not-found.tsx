import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] bg-cream flex items-center justify-center p-4">
            <div className="max-w-md w-full relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-8"
                >
                    <div className="relative inline-block">
                        <motion.h1
                            className="font-heading font-bold text-8xl md:text-9xl text-ink tracking-tighter"
                            animate={{
                                x: [0, -2, 2, -1, 1, 0],
                                y: [0, 1, -1, 2, -2, 0]
                            }}
                            transition={{
                                duration: 0.2,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 5 + 2
                            }}
                        >
                            404
                        </motion.h1>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-1 bg-acid mix-blend-multiply" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-ink/60">
                            Page Not Found
                        </h2>
                        <p className="font-mono text-sm font-bold text-ink max-w-xs mx-auto">
                            The signal was lost. The page you&apos;re looking for has been moved, deleted, or never existed.
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 neo-card bg-ink text-cream px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider hover:bg-acid hover:text-ink transition-colors group"
                    >
                        <span>Return Home</span>
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </Link>

                    {/* Decorative elements */}
                    <div className="absolute -top-12 -left-12 w-24 h-24 border-t-[3px] border-l-[3px] border-ink/10" />
                    <div className="absolute -bottom-12 -right-12 w-24 h-24 border-b-[3px] border-r-[3px] border-ink/10" />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 1 }}
                        className="mt-12 font-mono text-[0.6rem] font-bold text-ink/15 uppercase tracking-[0.3em]"
                    >
                        {"//"} lord_decay was here too
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
