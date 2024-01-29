const prettierConfig = require("@anthony-j-castro/prettier-config");

module.exports = {
  ...prettierConfig,
  overrides: [
    {
      files: "tsconfig.json",
      options: {
        parser: "json",
      },
    },
  ],
};
