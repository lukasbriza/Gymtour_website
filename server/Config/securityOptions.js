const config = {
  jsonLimit: "10kb",
  rateLimit: {
    maxRequests: 2,
    windowMS: 60 * 60 * 1000,
    message: "You reached maximum number of requests.",
  },
};

module.exports = config;
