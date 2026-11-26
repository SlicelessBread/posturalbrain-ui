import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The package ships TypeScript source: the app compiles it.
  transpilePackages: ['posturalbrain-ui'],
  // This app sits inside the package repository: keep Next from taking the parent folder as its root.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
