// vite.config.js
import path from 'node:path';

import react from '@vitejs/plugin-react';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { defineConfig } from 'vite';

const production = process.env.NODE_ENV === 'production';
// // https://vitejs.dev/config/
export default defineConfig({
    root: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            plugins: [
            // ↓ Needed for build
                nodePolyfills()
            ],
        },
        // ↓ Needed for build if using WalletConnect and other providers
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    publicDir: 'public',
    plugins: [
        react(),
        // ↓ Needed for development mode
        !production &&
         nodePolyfills({
             include: [
                 'node_modules/**/*.js',
                 new RegExp('node_modules/.vite/.*js')
             ],
         })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
