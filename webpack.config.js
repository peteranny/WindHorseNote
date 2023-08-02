const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: path.join(__dirname, "src/index.js"),
  output: { path: path.join(__dirname, "dist"), filename: "main-[hash].js" },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      meta: {
        viewport:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      },
      templateContent: ({ htmlWebpackPlugin }) => `
<html>
  <head></head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 128 /* 128 KB */,
              fallback: "file-loader",
            },
          },
        ],
      },
    ],
  },
};
