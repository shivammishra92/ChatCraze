import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        //target: "https://chatigo-backend.onrender.com",//backend url
         target: "http://localhost:4005",//backend url
        changeOrigin: true,
      },
    },
  },
});
