/** @type {import('next').NextConfig} */

const nextConfig = {
    trailingSlash: true,
    images:{
        unoptimized: true
        },
    transpilePackages: ['@mui/x-charts'],
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.us-east-1.amazonaws.com',
                port: '',
                pathname: '/eventify-bucket/**',
            },
            {
                protocol: 'https',
                hostname: 's3-pi2-gp2-wowfunding.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            }
        ],
    },

    pageExtensions: ['page.tsx', 'page.ts', 'route.tsx', 'route.ts'],


}

module.exports = nextConfig 