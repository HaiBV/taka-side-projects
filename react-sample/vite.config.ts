import path from "path";
import { AliasOptions, defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    } as AliasOptions,
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [path.resolve(__dirname, "./src/vitest.setup.ts")],
    coverage: {
      reporter: ["text", "html"],
    },
    testTimeout: 30000,
  },
});

export default mergeConfig(viteConfig, vitestConfig);
