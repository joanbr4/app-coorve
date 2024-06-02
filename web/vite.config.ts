import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/login": "http://localhost:3000/api/v1/auth",
      "/register": "http://localhost:3000/api/v1/auth",
      "/resetPass": "http://localhost:3000/api/v1/auth",
    },
  },
});
