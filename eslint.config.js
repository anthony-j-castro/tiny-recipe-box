const path = require("node:path");
const config = require("@anthony-j-castro/eslint-config");
const queryPlugin = require("@tanstack/eslint-plugin-query");
const globals = require("globals");

module.exports = [
  ...config,
  ...queryPlugin.configs["flat/recommended"],
  {
    ignores: ["build/*"],
  },
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [["~", path.resolve(__dirname, "src")]],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
        typescript: { project: "tsconfig.json" },
      },
    },
  },
  {
    files: ["eslint.config.js", "jest.config.js", "webpack.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
