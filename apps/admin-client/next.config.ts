import type { NextConfig } from 'next'

const backendUrl = process.env.API_BASE_URL || 'http://localhost:3001'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: `${backendUrl}/admin/:path*`,
      },
    ]
  },
}

export default nextConfig
