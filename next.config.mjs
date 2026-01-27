/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "googleusercontent.com" }, // For the placeholder images
      { protocol: "https", hostname: "images.unsplash.com" } // <--- ADD THIS
    ],
  },
};

export default nextConfig;