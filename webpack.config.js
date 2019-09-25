const path = require('path');

module.exports = {
  entry: [
    './server.js'
  ],
  output: {
    path: path.join(__dirname, "src/", "dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "script-loader"
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.hbs$/,
        use: {
          loader: "handlebars-loader"
        }
      }
    ]
  }
};