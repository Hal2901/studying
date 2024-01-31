import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/services": {
        target: "http://192.168.1.89:8095",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  
});
