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
    files: ["eslint.config.js", "jest.config.js", "webpack.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
