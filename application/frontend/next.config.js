module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.PUBLIC_API_URL,
    AUTH_URL: process.env.PUBLIC_AUTH_URL
  },
  publicRuntimeConfig: {
    HMR_HOST: '192.168.0.19',
  },
  onDemandEntries: {
    // keep pages in memory longer
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 10,
  },
};
