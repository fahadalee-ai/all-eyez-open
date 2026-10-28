import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * Vercel serves this app at the domain root.
 * `nitro.preset: "vercel"` writes the Build Output API to `.vercel/output`.
 */
export default defineConfig({
  nitro: {
    preset: "vercel",
  },
  vite: {
    base: "/",
    server: {
      allowedHosts: ["localhost", "127.0.0.1"],
    },
    preview: {
      allowedHosts: ["localhost", "127.0.0.1"],
    },
  },
});
