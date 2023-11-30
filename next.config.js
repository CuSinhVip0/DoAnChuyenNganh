/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
        styledComponents: true,
    },
};
module.exports = {
    future: {
        webpack5: true,
    },
};

module.exports = nextConfig;
