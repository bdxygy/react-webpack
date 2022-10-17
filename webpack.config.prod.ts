import webpackConfig from "./webpack.config";
import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import Dotenv from "dotenv-webpack";

const CssOptions: MiniCssExtractPlugin.PluginOptions = {
  filename: "[name].[contenthash].css",
  chunkFilename: "[id].css",
  ignoreOrder: true,
  linkType: "text/css",
};

const productionConfig = merge(webpackConfig, <Configuration>{
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin(CssOptions),
    new Dotenv({
      path: "./.env.prod",
      allowEmptyValues: false,
      systemvars: true,
      silent: true,
      defaults: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});

export default productionConfig;
