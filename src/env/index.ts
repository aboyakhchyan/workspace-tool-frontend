export default {
  API_URL: import.meta.env.VITE_API_URL ?? "http://localhost:3550/",
  API_PREFIX: import.meta.env.VITE_API_PREFIX ?? "/api",
} as const;
