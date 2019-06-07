module.exports = api => ({
  presets: [
    [
      "airbnb",
      {
        loose: true,
        modules: false,
        useBuiltIns: "entry",
        forceAllTransforms: api.env("production"),
        targets: {
          browsers: ["last 2 versions"]
        },
        corejs: "2"
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/plugin-transform-classes",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel",
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-transform-spread",
    "@babel/plugin-transform-regenerator",
    "transform-custom-element-classes",
    "@babel/plugin-transform-runtime"
  ]
});
