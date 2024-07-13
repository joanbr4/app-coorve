import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  // Check if running in Docker
  const isDocker = process.env.VITE_DOCKER;
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
        ...(isDocker && {
          "/login": "http://server:3000/api/v1/auth",
          "/register": "http://server:3000/api/v1/auth",
          "/resetPass": "http://server:3000/api/v1/auth",
          "/me": "http://server:3000/api/v1/auth",
          "/logout": "http://server:3000/api/v1/auth",
          "/sheets": "http://server:3000/api/v1/google",
          "/create-session": "http://server:3000/api/v1/stripe",
          "/retrieve-session": "http://server:3000/api/v1/stripe",
        }),
        ...(!isDocker && {
          "/login": "http://localhost:3000/api/v1/auth",
          "/register": "http://localhost:3000/api/v1/auth",
          "/resetPass": "http://localhost:3000/api/v1/auth",
          "/me": "http://localhost:3000/api/v1/auth",
          "/logout": "http://localhost:3000/api/v1/auth",
          "/sheets": "http://localhost:3000/api/v1/google",
          "/create-session": "http://localhost:3000/api/v1/stripe",
          "/retrieve-session": "http://localhost:3000/api/v1/stripe",
        }),
      },
    },
  };
});
