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
  const apiBaseUrl = env.VITE_API_DOCKER ?? env.VITE_API_BASE_URL;
  console.log(apiBaseUrl);

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
        "/api/login": {
          target: `${apiBaseUrl}/api/v1/auth`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        "/api/register": {
          target: `${apiBaseUrl}/api/v1/auth`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        "/api/resetPass": {
          target: `${apiBaseUrl}/api/v1/auth`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        "/api/me": {
          target: `${apiBaseUrl}/api/v1/auth`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        "/api/logout": {
          target: `${apiBaseUrl}/api/v1/auth`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        "/api/sheets": {
          target: `${apiBaseUrl}/api/v1/google`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        "/api/create-session": {
          target: `${apiBaseUrl}/api/v1/stripe`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        "/api/retrieve-session": {
          target: `${apiBaseUrl}/api/v1/stripe`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
