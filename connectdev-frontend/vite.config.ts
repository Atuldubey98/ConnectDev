import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { splitVendorChunkPlugin } from "vite"
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  envDir: "../.env",
  server: {
    open: true,
    host: true,
  },
  build: {
    outDir: "build",
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
