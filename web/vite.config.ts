import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode

  // Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  const env = loadEnv(mode, process.cwd(), "");

  // Check if running in Docker
  // Set base URL based on environment variables
  const apiBaseUrl = env.VITE_BE_DOCKER ?? env.VITE_BE_URL;
  // console.log("url-be:", apiBaseUrl);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      port: 5173,
      host: true,
      // strictPort: true,
      watch: {
        usePolling: true,
      },
      proxy: {
        "/api/v1/auth/login": apiBaseUrl,
        "/api/v1/auth/register": apiBaseUrl,
        "/api/v1/auth/resetPass": apiBaseUrl,
        "/api/v1/auth/me": apiBaseUrl,
        "/api/v1/auth/logout": apiBaseUrl,
        "/api/v1/google/sheets": apiBaseUrl,
        "/api/v1/stripe/create-session": apiBaseUrl,
        "/api/v1/stripe/retrieve-session": apiBaseUrl,
      },
    },
  };
});
