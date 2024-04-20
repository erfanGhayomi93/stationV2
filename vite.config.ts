import react from '@vitejs/plugin-react';
import path from "path";
import sass from 'sass';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	envPrefix: 'APP_',
	envDir: './environment',
	build: {
		outDir: path.join(__dirname, "build")
	},
	plugins: [
		react(),
		svgr({
			include: "**/*.svg?react",
			svgrOptions: {
				ref: true
			}
		}),
		tsconfigPaths(),
		!process.env.VITEST ? checker({ typescript: true }) : undefined
	],
	css: {
		preprocessorOptions: {
			scss: {
				implementation: sass,
			},
		},
	},
});
