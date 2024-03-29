export const config = {
  dbUnitLimit: 20,
  jsonLimit: "10kb",
  rateLimit: {
    maxRequests: 200,
    windowMS: 60 * 60 * 1000,
    message: "You reached maximum number of requests.",
  },
  tokenExpiration: "10h",
} as const;
