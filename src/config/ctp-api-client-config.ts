const API_CLIENT_CONFIG = {
  PROJECT_KEY: import.meta.env.VITE_CTP_PROJECT_KEY,
  CLIENT_SECRET: import.meta.env.VITE_CTP_CLIENT_SECRET,
  CLIENT_ID: import.meta.env.VITE_CTP_CLIENT_ID,
  AUTH_URL: import.meta.env.VITE_CTP_AUTH_URL,
  API_URL: import.meta.env.VITE_CTP_API_URL,
  SCOPES: import.meta.env.VITE_CTP_SCOPES,
} as const;

export default API_CLIENT_CONFIG;
