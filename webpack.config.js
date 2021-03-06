const { getEntry } = require("./webpack/entry");
const { getOutput } = require("./webpack/output");
const { getResolve } = require("./webpack/resolve");
const { getDevServer } = require("./webpack/devServer");
const { getPlugins } = require("./webpack/plugins");
const { getLoaders } = require("./webpack/loaders");
const { getOptimization } = require("./webpack/optimization");
const { isDev, isProd } = require("./webpack/utils");

module.exports = env => {
  const config = {
    mode: isDev(env) ? "development" : "production",
    entry: getEntry(),
    output: getOutput(env),
    resolve: getResolve(),
    plugins: getPlugins(env),
    module: {
      rules: getLoaders(env)
    },
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
    optimization: getOptimization()
  };
  if (isDev(env)) {
    config.performance = {
      hints: false
    };
    config.devServer = getDevServer();
    config.devtool = "inline-module-source-map";
  }

  if (isProd(env)) {
    config.bail = true;
  }
  return config;
};
