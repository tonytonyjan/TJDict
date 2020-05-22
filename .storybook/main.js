const webpackConfig = require("../webpack.config")(process.env, {});
module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: ["@storybook/addon-knobs/register"],
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: webpackConfig.resolve,
      plugins: [...config.plugins, ...webpackConfig.plugins],
    };
  },
};
