Title: 🧹 [Code Health] Remove unused CrossHatch import and resolve linting warnings

Description:
* 🎯 What: Removed the unused `CrossHatch` import in `app/stack/page.tsx`. Additionally, fixed a JSX comment textnode warning in `app/not-found.tsx` and an `exhaustive-deps` warning in `app/page.tsx` by moving the static `KONAMI_SEQUENCE` array outside of the `useKonamiCode` hook.
* 💡 Why: Removing unused imports reduces clutter and keeps the file scoped strictly to the dependencies it actively uses. Resolving the other linting warnings improves the overall code health and ensures the codebase adheres to Next.js strict mode checks, preventing potential hydration issues and hook recreation bugs.
* ✅ Verification:
  - Verified the `CrossHatch` string is no longer present in `app/stack/page.tsx`.
  - Ran `npm run lint`, which confirmed 0 errors and 0 warnings.
  - Ran `npm run build`, which succeeded without any issues.
* ✨ Result: Cleaner imports, warning-free linting, and a successful and stable production build.
