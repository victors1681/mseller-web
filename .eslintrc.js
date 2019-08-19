module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  settings: {
    react: {
      version: "16.8"
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "react/jsx-filename-extension": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "react/destructuring-assignment": "off",
    "react/prop-types": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-console": "off",
    "import/no-unresolved": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/jsx-wrap-multilines": "off",
    "react/display-name": "off",
    "react/style-prop-object": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-newline": "off",
    "no-nested-ternary": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
    "consistent-return": "off",
    "array-callback-return": "off"
  }
};
