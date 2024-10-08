/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'coin-images.coingecko.com',
                pathname: '/coins/images/**',  // Adjust the pathname as needed
            },
        ],
    },
};

export default nextConfig;
