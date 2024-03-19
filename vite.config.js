import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { webfontDownload } from 'vite-plugin-webfont-dl';

export default defineConfig({
    plugins: [
        sveltekit(),
        webfontDownload(),
    ],
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
});
