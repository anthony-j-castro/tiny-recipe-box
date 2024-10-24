const path = require("node:path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports = {
  entry: {
    "extension-test-initializer": {
      import: path.resolve(
        __dirname,
        "src/client/extension-test-initializer.tsx",
      ),
      filename: "public/[name].[contenthash].js",
    },
    main: {
      import: path.resolve(__dirname, "src/client/index.tsx"),
    },
    "privacy-policy": {
      import: path.resolve(__dirname, "src/client/privacy-policy.tsx"),
      filename: "public/[name].[contenthash].js",
    },
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      EXTENSION_HEARTBEAT_INTERVAL_MILLISECONDS: null,
      GITHUB_SHA: null,
      GOOGLE_ANALYTICS_MEASUREMENT_ID: null,
      ROLLBAR_ACCESS_TOKEN: null,
      SIMULATED_LATENCY_MILLISECONDS: null,
      SIMULATED_LATENCY_TOLERANCE_MILLISECONDS: null,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "build"),
          globOptions: {
            ignore: [
              path.resolve(__dirname, "public/index.html"),
              path.resolve(__dirname, "public/privacy-policy.html"),
              path.resolve(__dirname, "public/extension-test-initializer.html"),
            ],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      chunks: ["main"],
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      chunks: ["privacy-policy"],
      template: path.resolve(__dirname, "public/privacy-policy.html"),
      filename: "public/privacy-policy.html",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      chunks: ["extension-test-initializer"],
      template: path.resolve(
        __dirname,
        "public/extension-test-initializer.html",
      ),
      filename: "public/extension-test-initializer.html",
      inject: "body",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 3000,
    static: {
      directory: path.resolve(__dirname, "build"),
      staticOptions: {
        // Mimic how GitHub allows you to omit the .html
        // extension from a URL
        extensions: ["html"],
      },
    },
  },
};
