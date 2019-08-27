const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            use: { loader: "babel-loader" }, 
            exclude: /node_modules/ 
            },
            {
            test: /\.css$/,
            use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                loader: 'image-webpack-loader',
                options: {
                    bypassOnDebug: true,
                    disable: true,
                    },
                },
            ],
            }
        ]
    },
    plugins: [ 
        new MiniCssExtractPlugin({filename: 'style.css'}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        })
    ]
};