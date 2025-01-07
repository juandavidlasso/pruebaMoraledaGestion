import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                hostname: 'localhost',
                port: '3000'
            }
        ],
        path: `${process.env.NEXT_PUBLIC_BASE_PATH}/_next/image`
    },
    async redirects() {
        return [{ source: '/', destination: '/login', permanent: true }];
    }
};

export default nextConfig;
