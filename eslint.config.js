import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
     { ignores: ['dist'] },
     {
          extends: [js.configs.recommended, ...tseslint.configs.recommended],
          files: ['**/*.{ts,tsx}'],
          languageOptions: {
               ecmaVersion: 2020,
               globals: globals.browser,
          },
          plugins: {
               'react-hooks': reactHooks,
               'react-refresh': reactRefresh,
               react: pluginReact,
          },
          rules: {
               ...reactHooks.configs.recommended.rules,
               // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
               '@typescript-eslint/no-unused-vars': 'warn',
               '@typescript-eslint/no-unused-expressions': [
                    'warn',
                    {
                         allowShortCircuit: true,
                         allowTernary: true,
                    },
               ],
               '@typescript-eslint/no-explicit-any': 'warn',
               '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
               '@typescript-eslint/no-empty-object-type': 'warn',
               'react-hooks/exhaustive-deps': 'off',
               'react/jsx-key': 'error',
          },
     }
);
