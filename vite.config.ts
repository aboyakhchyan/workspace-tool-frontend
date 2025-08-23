import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  envDir: "src/env",
  resolve: {
    alias: {
      "@env": path.resolve(__dirname, "src/env"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@constans": path.resolve(__dirname, "src/constants"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
    },
  },
});
