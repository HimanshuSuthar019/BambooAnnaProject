import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Splits code into smaller chunks instead of 1 big file
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "query-vendor": ["@tanstack/react-query"],
          "ui-vendor": [
            "lucide-react",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
    // Compress output files
    minify: "esbuild",
    target: "esnext",
  },
  // Preload key dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "@tanstack/react-query", "wouter"],
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
