import webpackConfig from "./webpack.config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import Dotenv from "dotenv-webpack";

import proxyConfiguration from "./proxy.config.json";

import path from "path";

export const devServer: DevServerConfiguration = {
  port: 4567,
  hot: true,
  proxy: proxyConfiguration,
  static: path.resolve(__dirname, "dev"),
  historyApiFallback: true,
};

const productionConfig = merge(webpackConfig, <Configuration>{
  devServer,
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new Dotenv({
      path: "./.env",
      allowEmptyValues: false,
      systemvars: false,
      silent: false,
      defaults: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});

export default productionConfig;
