const js = require("@eslint/js");
const prettier = require("eslint-plugin-prettier");
const { FlatCompat } = require("@eslint/eslintrc");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    ignores: ["node_modules/**", ".env"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
