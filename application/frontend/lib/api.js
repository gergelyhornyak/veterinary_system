export function apiUrl() {
  // // If an env var was baked in during build (via next.config.js) use it
  // if (process.env.API_URL) return process.env.API_URL;

  // // Otherwise, derive the backend host from the current window location
  // if (typeof window !== "undefined") {
  //   const host = "localhost";
  //   const port = 3000; // backend default in docker-compose
  //   return `http://${host}:${port}`;
  // }

  // Fallback for server-side code
  return "http://localhost:3000";
}
