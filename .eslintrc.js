const path = require("node:path");

module.exports = {
  env: { browser: true, node: true },
  extends: [
    "@anthony-j-castro/eslint-config",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  plugins: ["sort-destructure-keys", "unused-imports"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: false, avoidEscape: true },
    ],
    "sort-destructure-keys/sort-destructure-keys": [
      "error",
      { caseSensitive: false },
    ],
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["~", path.resolve(__dirname, "src")]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
      typescript: { project: "tsconfig.json" },
    },
  },
};
