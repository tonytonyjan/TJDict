const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { EnvironmentPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = (_env, argv) => ({
  entry: {
    main: "./src/main.js",
    background: "./src/background.js",
    content: "./src/content.js",
  },
  devtool: argv.mode === "production" ? false : "source-map",
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            // https://github.com/webpack/webpack/issues/10227
            plugins: ["@babel/plugin-proposal-optional-chaining"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            ident: "postcss",
            options: {
              ident: "postcss",
              postcss: {},
              plugins: [
                require("postcss-flexbugs-fixes"),
                require("autoprefixer")({
                  flexbox: "no-2009",
                }),
              ],
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new EnvironmentPlugin({
      BROWSER: "chrome",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: "manifest.json",
          transform: (content) => {
            const manifest = JSON.parse(content);
            if (process.env.BROWSER === "firefox")
              delete manifest.content_security_policy;
            if (process.env.BROWSER === "chrome")
              manifest.key =
                "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDxe7EOVTTF6Fxu3geDsJ37HIiJYs7sEVs06nKxugc2zZOsrlQ6/HLT2Wb3SkE6ljjA5rEUcuencJBTaQHdulQXK8Sle7qIY1U+4/pp03tFfKj9nYFOpN8I25hMQC+gubBW6K97SIrtjOlDqOgR6mxoL37loKkPAdeFblMViWzLBQIDAQAB";
            return JSON.stringify(manifest, null, 2);
          },
        },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
});
