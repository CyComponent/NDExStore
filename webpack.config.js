var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src/CyRestStore.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    library: "CyRestStore",
    libraryTarget: "umd",
    filename: "CyRestStore.js",
  },
  resolve: {
    root: __dirname,
    moduleDirectories: ["node_modules", "./src"],
    extensions: ["", ".js", ".webpack.js", ".css", ".scss"]
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=es2015']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        exclude: /node_modules/,
        loaders: ["url"]
      }
    ]
  }
};
