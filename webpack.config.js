const path = require("node:path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    filename: "main.js",
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
      GITHUB_SHA: null,
      GOOGLE_ANALYTICS_MEASUREMENT_ID: null,
      ROLLBAR_ACCESS_TOKEN: undefined,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "build"),
          globOptions: {
            ignore: [path.resolve(__dirname, "public", "index.html")],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, "build"),
    },
  },
};
