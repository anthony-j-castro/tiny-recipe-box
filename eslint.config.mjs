import config from "@anthony-j-castro/eslint-config";
import queryPlugin from "@tanstack/eslint-plugin-query";
import globals from "globals";

export default [
  ...config,
  ...queryPlugin.configs["flat/recommended"],
  {
    ignores: ["build/*", "playwright/report/*", "playwright/test-results/*"],
  },
  {
    files: ["jest.config.js", "webpack.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
