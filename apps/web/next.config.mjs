import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // a stray package-lock.json above the repo makes Next infer the wrong workspace root
  outputFileTracingRoot: path.join(import.meta.dirname, '../..'),
};

export default nextConfig;
