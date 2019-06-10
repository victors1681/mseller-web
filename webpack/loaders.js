const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { isDev, isProd } = require("./utils");
const path = require("path");

const getBabelLoader = () => ({
  test: /\.(js)$/,
  exclude: /node_modules/,
  use: ["babel-loader"]
});

const getGraphQLLoaader = () => ({
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: "graphql-tag/loader"
});

const getCssLoader = env => ({
  test: /\.(sc|c)ss$/,
  use: [
    isDev(env) ? "style-loader" : MiniCssExtractPlugin.loader,
    "css-loader",
    "sass-loader"
  ]
});

const getEslintLoader = env => {
  if (isProd(env)) {
    return;
  }

  return {
    enforce: "pre",
    test: /\.js?$/,
    exclude: [path.resolve(__dirname, "../node_modules")],
    use: [
      {
        loader: "eslint-loader",
        options: {
          cache: true,
          fix: true,
          failOnWarning: true,
          failOnError: true
        }
      }
    ]
  };
};

const getFileLoader = () => ({
  test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|)$/,
  loader: "url-loader"
});

const getXmlRawLoader = () => ({
  test: /\.xml$/,
  loader: "raw-loader"
});

const getLoaders = env =>
  [
    getBabelLoader(),
    getCssLoader(env),
    getFileLoader(),
    getXmlRawLoader(),
    getEslintLoader(env),
    getGraphQLLoaader()
  ].filter(loader => loader);

module.exports.getLoaders = getLoaders;
