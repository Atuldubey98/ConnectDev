import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
export default defineConfig({
  plugins: [react()],
  envDir: "../.env",
  server: {
    open: true,
    host: true,
  },
  build: {
    outDir: "build",
    manifest: true,
    sourcemap: true,
    cssMinify: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
