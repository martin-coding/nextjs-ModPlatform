import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [new URL("/**", "http://localhost:8333/modplatform")],
  },
}

export default nextConfig
