import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    'import.meta.env.VITE_ADMIN_EMAIL': JSON.stringify(process.env.ADMIN_EMAIL || 'admin@gmail.com'),
    'import.meta.env.VITE_ADMIN_PASSWORD': JSON.stringify(process.env.ADMIN_PASSWORD || 'Aa12Aa12'),
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target:
          mode === "development"
            ? "http://localhost:5000"
            : "https://vol-backend-1xyc.onrender.com",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
