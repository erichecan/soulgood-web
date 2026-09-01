import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "soulgoodwclub.org",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
