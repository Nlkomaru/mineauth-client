/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    optimizeFonts: true,
    images: {
        domains: ["crafthead.net", "cdn.discordapp.com", "mc-heads.net"],
    }
};
