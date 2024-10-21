/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    react: {
      throwIfNamespace: false, // Disable the namespace warning
    },
  },

};

export default nextConfig;
