const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
//package.json에 있는 것과 같은 WEBPACK_ENV
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");
//__dirname은 현재 프로젝트의 디렉토리 wetube를 의미하는 듯

const config = {
  devtool: "cheap-module-source-map",
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins() {
                  return [autoprefixer({ browsers: "cover 99.5%" })];
                },
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;
//과거에 export하던 방식
//client code라 babel을 쓸 수 없다네
