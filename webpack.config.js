const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
  plugins: [new MiniCssExtractPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
});
