import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  // {
  //   rules: {
  //     "no-unused-vars": "warn",
  //     "no-undef": "warn",
  //     // "@typescript-eslint/explicit-function-return-type": "warn",
  //     // "@typescript-eslint/explicit-module-boundary-types": "warn",
  //   },
  // },
  tseslint.configs.recommended,
]);