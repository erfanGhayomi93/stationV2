import react from '@vitejs/plugin-react-swc';
import path from 'path';
import sass from 'sass';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
     envPrefix: 'APP_',
     envDir: './environment',
     plugins: [
          react(),
          tsconfigPaths(),
          !process.env.VITEST ? checker({ typescript: true }) : undefined,
          eslint(),
          svgr({
               include: '**/*.svg',
          }),
     ],
     build: {
          outDir: path.join(__dirname, 'build'),
          sourcemap: false,
     },
     resolve: {
          alias: {
               '@components': path.resolve(__dirname, './src/common/components'),
               '@hooks': path.resolve(__dirname, './src/common/hooks'),
               '@methods': path.resolve(__dirname, './src/common/methods'),
               '@widget': path.resolve(__dirname, './src/common/widget'),
               '@uiKit': path.resolve(__dirname, './src/uiKit'),
               '@LS': path.resolve(__dirname, './src/ls'),
               '@assets': path.resolve(__dirname, './src/assets'),
               '@pages': path.resolve(__dirname, './src/pages'),
               '@config': path.resolve(__dirname, './src/config'),
               '@router': path.resolve(__dirname, './src/router'),
               '@api': path.resolve(__dirname, './src/api'),
               '@zustand': path.resolve(__dirname, './src/zustand'),
          },
     },
     css: {
          preprocessorOptions: {
               scss: {
                    implementation: sass,
               },
          },
     },
});
