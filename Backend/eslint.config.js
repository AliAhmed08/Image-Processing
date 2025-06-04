import eslintPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      typescript: eslintPlugin,
    },
    rules: {
      "typescript/no-unused-vars": "warn",
      "typescript/explicit-function-return-type": "off",
    },
  },
];
