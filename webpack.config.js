const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: {
        index: './src/pages/index/index.js',
        about: './src/pages/about/about.js',
        news: './src/pages/news/news.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pages/[name]/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
            test: /\.js$/i,
            use: { loader: "babel-loader" }, 
            exclude: /node_modules/ 
            },
            {
            test: /\.css$/i,
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
            ]
            },
            {
            test: /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }            
                }]
            }
        ]
    },
    plugins: [ 
        new WebpackMd5Hash(),
        new MiniCssExtractPlugin({
            filename: 'pages/[name]/[name].[chunkhash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/pages/index/index.html',
            chunks: ['index'],
            filename: 'pages/index/index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/pages/about/about.html',
            chunks: ['about'],
            filename: 'pages/about/about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/pages/news/news.html',
            chunks: ['news'],
            filename: 'pages/news/news.html'
        })
    ]
};