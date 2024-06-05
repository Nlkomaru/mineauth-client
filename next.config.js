/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    optimizeFonts: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'crafthead.net',
                port: '',
                pathname: '/avatar/**',
            },
            {
                protocol: 'https',
                hostname: 'minotar.net',
                port: '',
                pathname: '/helm/**',
            }
        ],
    },
    rewrites: async () => {
        return [
            {
                source: "/main/:path*",
                destination: process.env.SERVER_URL + "/:path*",
            },

        ];
    }
};
