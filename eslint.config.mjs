import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,cjs,mjs}"],
    ...js.configs.recommended,
    languageOptions: {
      parserOptions: {
        sourceType: "module",
      },
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...tseslint.configs.recommended,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      parserOptions: {
        sourceType: "module",
      },
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: ["next/core-web-vitals"],
  },
]);
