⚡ [performance improvement] Memoize BentoGridItem event handlers

💡 **What:**
Memoized the `handleMouseMove` and `handleMouseLeave` functions inside `BentoGridItem` using React's `useCallback` hook. The dependency array includes `[x, y]` since these handlers invoke `x.set` and `y.set`.

🎯 **Why:**
Previously, new instances of these event handlers were created on every render of the `BentoGridItem`. Because these handlers are passed as props to a child component (`<motion.div>`), it caused the child to re-render unnecessarily even if the underlying state had not meaningfully changed. Using `useCallback` ensures the function reference remains stable across renders, saving CPU cycles on React reconciliation and preventing unnecessary re-evaluations within the `motion.div` component.

📊 **Measured Improvement:**
Because `BentoGridItem` relies heavily on Framer Motion (`useMotionValue`, `useSpring`, `useMotionTemplate`), automated measurement via JSDOM or node test runners is impractical without significant mocking that would obscure the actual performance characteristics. Framer Motion fundamentally requires a real DOM layout to measure elements (e.g., `getBoundingClientRect`) and run animations accurately.

However, we can theoretically quantify this improvement: by ensuring referential stability for these two handlers, we avoid triggering a re-render phase for the complex nested `motion.div` tree on every parent update, leading to fewer allocations and shorter task times on the main thread during interaction. This optimization directly reduces React reconciliation overhead, especially critical when rendering multiple cards on the page simultaneously.
