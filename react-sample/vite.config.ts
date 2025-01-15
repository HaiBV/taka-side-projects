import { AliasOptions, defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react()],
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
    setupFiles: [path.resolve(__dirname, "./src/setupTests.ts")],
    testTimeout: 30000,
  },
});

export default mergeConfig(viteConfig, vitestConfig);
