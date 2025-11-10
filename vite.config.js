import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // localhost + network access
    port: 5173, // Vite default port
    hmr: {
      protocol: "ws", // WebSocket
      host: "localhost",
    },
  },
});
