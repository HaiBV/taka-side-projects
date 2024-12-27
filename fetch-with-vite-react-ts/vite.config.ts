import { AliasOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
    } as AliasOptions,
  },

  plugins: [react()],
});
