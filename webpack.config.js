var path = require('path')
var webpack = require('webpack')

module.exports = {
  cache: 'true',
  devtool: 'source-map',
  entry: path.resolve(__dirname, "src/NDExStore.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    library: "NDExStore",
    libraryTarget: "umd",
    filename: "NDExStore.js",
  },
  resolve: {
    root: __dirname,
    moduleDirectories: ["node_modules", "./src"],
    extensions: ["", ".js", ".webpack.js"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=es2015']
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
