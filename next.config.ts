import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 설정
  images: {
    domains: ['airportrent24.kr'],
    formats: ['image/avif', 'image/webp'],
  },

  // SEO를 위한 설정 (빌드 안정성을 위해 experimental 기능 비활성화)

  // 메타데이터 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // 구 도메인 리다이렉트 설정
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'byungmin.me',
          },
        ],
        destination: 'https://airportrent24.kr/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.byungmin.me',
          },
        ],
        destination: 'https://airportrent24.kr/:path*',
        permanent: true,
      },
    ];
  },

  // 네이버 검색등록을 위한 정적 파일 설정
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
};

export default nextConfig;
