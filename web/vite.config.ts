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
  const apiBaseUrl = env.VITE_API_DOCKER
    ? env.VITE_API_DOCKER
    : env.VITE_API_BASE_URL;
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
        "/login": `${apiBaseUrl}/api/v1/auth`,
        "/register": `${apiBaseUrl}/api/v1/auth`,
        "/resetPass": `${apiBaseUrl}/api/v1/auth`,
        "/me": `${apiBaseUrl}/api/v1/auth`,
        "/logout": `${apiBaseUrl}/api/v1/auth`,
        "/sheets": `${apiBaseUrl}/api/v1/google`,
        "/create-session": `${apiBaseUrl}/api/v1/stripe`,
        "/retrieve-session": `${apiBaseUrl}/api/v1/stripe`,
      },
    },
  };
});
