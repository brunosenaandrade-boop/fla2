/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static files in src/content are included in serverless functions
  experimental: {
    outputFileTracingIncludes: {
      '/blog': ['./src/content/blog/**/*'],
      '/blog/[slug]': ['./src/content/blog/**/*'],
      '/sitemap.xml': ['./src/content/blog/**/*'],
    },
  },
};

export default nextConfig;
