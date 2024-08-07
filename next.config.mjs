/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lodqzkfgzkaylswtbbki.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  experimental: {
    ppr: "incremental",
    staleTimes: {
      dynamic: 30,
      static: 60,
    },
  },
};

export default nextConfig;
