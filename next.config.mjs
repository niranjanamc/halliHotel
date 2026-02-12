/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Ensure trailing slashes for GitHub Pages (optional, but good for relative links)
    trailingSlash: true,
};

export default nextConfig;
