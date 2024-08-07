export function getBaseUrl() {
  return process.env.VERCEL_ENV === "production"
    ? "https://wild-oasis-cabins-gold.vercel.app"
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:3000`;
}
