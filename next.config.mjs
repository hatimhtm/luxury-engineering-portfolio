/** @type {import('next').NextConfig} */
const nextConfig = {
    // test builds go to their own folder so they never disturb the dev server
    distDir: process.env.NEXT_DIST_DIR || ".next",
    images: {
        domains: [],
        formats: ["image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560, 3200],
        minimumCacheTTL: 31536000,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self' data:; connect-src 'self';",
                    }
                ],
            },
        ];
    },
};

export default nextConfig;
