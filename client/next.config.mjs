/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://server:8080/:path*`,
      },
    ];
  },
};

export default nextConfig;
