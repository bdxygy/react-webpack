import webpackConfig, { devServer } from "./webpack.config";
import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import Dotenv from "dotenv-webpack";

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
