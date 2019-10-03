const path = require('path');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, "src", "dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
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