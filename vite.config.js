import path from 'path'
import { defineConfig } from 'vite'
import { vitePlugin as remix } from '@remix-run/dev'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env
    },
    server: {
        port: 5173,
        strictPort: true,
        hmr: {
            port: 5173,
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8000/api',
                changeOrigin: true,
            },
        }
    },
    plugins: [
        remix(),
    ],
    resolve: {
        alias: {
            '@tailwindConfig': path.resolve(__dirname, 'tailwind.config.js'),
        },
    },
    optimizeDeps: {
        include: [
            '@tailwindConfig',
        ]
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                },
            },
        },
    },
})
