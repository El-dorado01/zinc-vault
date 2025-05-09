import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "esiczybfbgopvqqftioh.supabase.co",
        // pathname: "/storage/v1/object/public/hero-images/**", // Optional: Restrict to your bucket
      },
    ],
  },
};

export default nextConfig;
