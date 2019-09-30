const path = require('path');

module.exports = {
  entry: [
    './src/scripts/index.js'
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
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
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