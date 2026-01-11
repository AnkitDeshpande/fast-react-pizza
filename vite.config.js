import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnError: false, // 🔥 prevents red screen
      failOnWarning: false, // 🔥 prevents warning overlay
    }),
    tailwindcss(),
  ],
});
