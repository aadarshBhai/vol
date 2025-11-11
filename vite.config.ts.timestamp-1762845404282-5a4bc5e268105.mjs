// vite.config.ts
import { defineConfig } from "file:///C:/Users/aadar/Downloads/vol/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/aadar/Downloads/vol/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/aadar/Downloads/vol/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\aadar\\Downloads\\vol";
var vite_config_default = defineConfig(({ mode }) => ({
  define: {
    "import.meta.env.VITE_ADMIN_EMAIL": JSON.stringify(process.env.ADMIN_EMAIL || "admin@gmail.com"),
    "import.meta.env.VITE_ADMIN_PASSWORD": JSON.stringify(process.env.ADMIN_PASSWORD || "Aa12Aa12")
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: mode === "development" ? "http://localhost:5000" : "https://vol-backend-1xyc.onrender.com",
        changeOrigin: true
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhYWRhclxcXFxEb3dubG9hZHNcXFxcdm9sXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhYWRhclxcXFxEb3dubG9hZHNcXFxcdm9sXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hYWRhci9Eb3dubG9hZHMvdm9sL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBkZWZpbmU6IHtcbiAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfQURNSU5fRU1BSUwnOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5BRE1JTl9FTUFJTCB8fCAnYWRtaW5AZ21haWwuY29tJyksXG4gICAgJ2ltcG9ydC5tZXRhLmVudi5WSVRFX0FETUlOX1BBU1NXT1JEJzogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuQURNSU5fUEFTU1dPUkQgfHwgJ0FhMTJBYTEyJyksXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICAgIHByb3h5OiB7XG4gICAgICBcIi9hcGlcIjoge1xuICAgICAgICB0YXJnZXQ6XG4gICAgICAgICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiXG4gICAgICAgICAgICA/IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwXCJcbiAgICAgICAgICAgIDogXCJodHRwczovL3ZvbC1iYWNrZW5kLTF4eWMub25yZW5kZXIuY29tXCIsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKV0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdSLFNBQVMsb0JBQW9CO0FBQzdTLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixvQ0FBb0MsS0FBSyxVQUFVLFFBQVEsSUFBSSxlQUFlLGlCQUFpQjtBQUFBLElBQy9GLHVDQUF1QyxLQUFLLFVBQVUsUUFBUSxJQUFJLGtCQUFrQixVQUFVO0FBQUEsRUFDaEc7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQ0UsU0FBUyxnQkFDTCwwQkFDQTtBQUFBLFFBQ04sY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxpQkFBaUIsZ0JBQWdCLENBQUMsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUM5RSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
