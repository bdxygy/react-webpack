import type { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin, {
  Options as HtmlWebpackOptions,
} from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import path from "path";

import proxyConfiguration from "./proxy.config.json";

const HtmlOptions: HtmlWebpackOptions = {
  filename: "index.html",
  template: path.resolve(__dirname, "public/index.html"),
};

export const devServer: DevServerConfiguration = {
  port: 4567,
  hot: true,
  proxy: proxyConfiguration,
  static: path.resolve(__dirname, "dev"),
  historyApiFallback: true,
};

const webpackConfig: Configuration = {
  devServer,
  mode: "development",
  entry: "./src/index.tsx",
  plugins: [
    new HtmlWebpackPlugin(HtmlOptions),
    new ForkTsCheckerWebpackPlugin({ async: false }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
  },
};

export default webpackConfig;
