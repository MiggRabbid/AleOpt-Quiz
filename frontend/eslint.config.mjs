
import { defineConfig, globalIgnores } from 'eslint/config'

import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier/flat'
import tsParser from "@typescript-eslint/parser"
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import tseslintPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

import prettierConfig from "./prettier.config.mjs";


const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      '@typescript-eslint': tseslintPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true, tsx: true },
      },
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        NodeJS: "readonly",
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      "no-unused-vars": "warn",
      "react/prop-types": "off",
      "no-console": "off",
      "no-extra-boolean-cast": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      ],
      "react-hooks/exhaustive-deps": "warn",
      "no-shadow": "warn",
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-absolute-path": "error",

      "prettier/prettier": ["error", prettierConfig],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },

  globalIgnores([
    "node_modules",
    ".vscode",
    "dist",
    "build",
    "prettier.config.*",
    "eslint.config.mjs",
    "src/locales/*",
    "postcss.config.mjs",
    "tailwind.config.js"
  ])
]);

export default eslintConfig