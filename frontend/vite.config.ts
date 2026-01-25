import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  define: {
    'process.env.MY_ENV_VAR': JSON.stringify(process.env.MY_ENV_VAR),
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          vendor: ['axios', '@tanstack/react-query'],
        },
      },
    },
  },
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@app': '/src/app',
      '@api': '/src/app/api',
      '@hooks': '/src/app/hooks',
      '@models': '/src/app/models',
      '@router': '/src/app/router',
      '@selectors': '/src/app/selectors',
      '@types': '/src/app/types',
      '@store': '/src/app/store',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@/styles/global.styles.scss" as *;\n',
      },
    },
  },
  appType: 'spa',
});
