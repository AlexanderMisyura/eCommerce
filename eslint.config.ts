import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { createViteImportResolver } from 'eslint-import-resolver-vite';
import * as pluginImportX from 'eslint-plugin-import-x';
import { createNodeResolver } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import importSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import viteConfig from './vite.config';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      jsxA11y.flatConfigs.recommended,
      reactDom.configs.recommended,
      reactRefresh.configs.vite,
      reactHooks.configs['recommended-latest'],
      reactX.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      unicorn.configs.recommended,
    ],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    plugins: {
      'simple-import-sort': importSort,
      'unused-imports': unusedImports,
    },

    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [String.raw`.*\.tsx$`, String.raw`.*\.test\..*$`],
        },
      ],
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            Env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],
      'no-debugger': 'warn',
      'no-console': 'warn',
    },

    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver(),
        createNodeResolver(),
        createViteImportResolver({ viteConfig }),
      ],
    },
  },

  {
    ignores: ['eslint.config.ts'],
    extends: [pluginImportX.flatConfigs.recommended, pluginImportX.flatConfigs.typescript],
  },

  eslintPluginPrettierRecommended
);
