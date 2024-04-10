/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:svelte/recommended"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 13,
    extraFileExtensions: [".svelte"],
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
};
