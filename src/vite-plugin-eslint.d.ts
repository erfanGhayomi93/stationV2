declare module 'vite-plugin-eslint' {
    import { Plugin } from 'vite';

    export interface ViteEslintPluginOptions {
        include?: string | string[];
        exclude?: string | string[];
        // Additional options can be added here based on the plugin's documentation.
    }

    export default function eslintPlugin(options?: ViteEslintPluginOptions): Plugin;
}
