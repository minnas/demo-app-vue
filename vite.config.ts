import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@Views": path.resolve(__dirname, "src/components/views"),
      "@Store": path.resolve(__dirname, "src/store"),
      "@Tools": path.resolve(__dirname, "./src/components/tools"),
      "@Types": path.resolve(__dirname, "./src/types"),
      "@Api": path.resolve(__dirname, "./src/api"),
      "@Assets": path.resolve(__dirname, "./src/assets"),
      "@Provider": path.resolve(__dirname, "./src/provider"),
    },
  },
});
