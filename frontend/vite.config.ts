  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';


  function changeScriptType() {
    return {
      name: 'change-script-type',
      transformIndexHtml(html) {
        return html.replace(/<script type="module" /g, '<script type="script" ');
      }
    };
  }

  export default defineConfig({
    plugins: [react(), changeScriptType()],
    build: {
      
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: 'index.html',
        },
      },
    },
    appType: 'spa',
  });
