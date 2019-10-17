const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        index: './src/pages/index/index.js',
        about: './src/pages/about/about.js',
        paper: './src/pages/paper/paper.js'
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
                use: [
                    (isDev ? 'style-loader' :
                    {
                    loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../',
                        }
                    }),
                    'css-loader',
                    'postcss-loader'
                ]
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
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/pages/about/about.html',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/pages/paper/paper.html',
            filename: 'paper.html'
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    ]
};