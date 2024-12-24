import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  env: {
    BASE_URL: "http://localhost:4000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "", // Leave this empty unless the resource uses a specific port
        pathname: "/**", // Match all paths
      },
    ],
  },
  output: "standalone",
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, ".");
    return config;
  },
  /* config options here */
};

export default nextConfig;
