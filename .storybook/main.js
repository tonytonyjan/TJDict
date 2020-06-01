const webpackConfig = require("../webpack.config")(process.env, {});
module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: webpackConfig.resolve,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.scss$/i,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                },
              },
              {
                loader: "postcss-loader",
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
        ],
      },
      plugins: [...config.plugins, ...webpackConfig.plugins],
    };
  },
};
