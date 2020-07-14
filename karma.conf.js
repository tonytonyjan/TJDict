const webpackConfig = require("./webpack.config");

process.env.CHROME_BIN = require("puppeteer").executablePath();
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    client: {
      jasmine: {
        timeoutInterval: 30000,
      },
    },
    files: ["test/**/*.test.js"],
    preprocessors: {
      "test/**/*.test.js": ["webpack", "sourcemap"],
    },
    browsers: ["ChromeHeadless_without_security"],
    customLaunchers: {
      ChromeHeadless_without_security: {
        base: "ChromeHeadless",
        flags: ["--disable-web-security"],
      },
    },
    singleRun: true,
    webpack: {
      ...webpackConfig(process.env, {}),
      mode: "development",
      devtool: "inline-source-map",
    },
  });
};
