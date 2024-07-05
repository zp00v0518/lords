//  Configuration Vite
import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vueDevTools(),
        vue()
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/main.scss";`,
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})