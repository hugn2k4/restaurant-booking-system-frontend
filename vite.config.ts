import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "mui-vendor": ["@mui/material", "@mui/icons-material"],
          "utils-vendor": ["axios", "i18next", "react-i18next", "date-fns"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Optimize bundle size
    minify: "esbuild",
  },

  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  preview: {
    port: 3001,
  },
});
