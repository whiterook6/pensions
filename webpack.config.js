const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  
  // bundling mode
  mode: "production",
  devtool: "source-map",
  
  // entry files
  entry: "./src/index.tsx",
  
  // output bundles (location)
  output: {
    path: path.resolve( __dirname, "./static" ),
    filename: "index.js",
    publicPath: "./",
  },
  
  // file resolutions
  resolve: {
    extensions: [ ".ts", ".js", ".tsx" ],
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat"
    }
  },

  watchOptions: {
    ignored: /node_modules/,
  },
  
  // loaders
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      publicPath: "./",
      template: "src/index.html",
    })
  ],
};
