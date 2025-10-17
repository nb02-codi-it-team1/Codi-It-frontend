import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 이미지 테스트를 위한 외부 이미지 도메인 허용
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프론트에서 /api 요청
        destination: "http://localhost:3000/api/:path*", // 백엔드 서버로 프록시
      },
    ];
  },
};

export default nextConfig;
