import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import path from 'path';




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() , 
    svgr({
      include : "**/*.svg" , 
    })],
  build : {
    outDir : "build"
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/common/components'),
      '@hooks': path.resolve(__dirname, './src/common/hooks'),
      '@methods': path.resolve(__dirname, './src/common/methods'),
      '@uiKit': path.resolve(__dirname, './src/uiKit'),
      '@LS': path.resolve(__dirname, './src/LS'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@config': path.resolve(__dirname, './src/config'),
      '@router': path.resolve(__dirname, './src/router'),
      '@api': path.resolve(__dirname, './src/api'),
      '@zustand': path.resolve(__dirname, './src/zustand')
    },
  },
})
