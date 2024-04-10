import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import version from "vite-plugin-package-version";

export default defineConfig({
  plugins: [sveltekit(), version()],
});
