const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackConfig = require("../webpack.config")(process.env, {});
module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
  ],
  webpackFinal: (config) => {
    require("fs").writeFileSync(
      "out",
      require("util").inspect(config, { depth: null })
    );
    return {
      ...config,
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      plugins: [...config.plugins, ...webpackConfig.plugins],
    };
  },
};
