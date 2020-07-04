const webpackConfig = require("../webpack.config")(process.env, {});
module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
  ],
  webpackFinal: (config) => ({
    ...config,
    resolve: webpackConfig.resolve,
    module: webpackConfig.module,
    plugins: [...config.plugins, ...webpackConfig.plugins],
  }),
};
