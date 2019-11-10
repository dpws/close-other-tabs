const webpack = require("webpack"),
    Dotenv = require('dotenv-webpack'),
    path = require("path"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    WriteFilePlugin = require('write-file-webpack-plugin'),
    ChromeExtensionReloadPlugin = require('webpack-chrome-extension-reloader'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require("html-webpack-plugin");

var alias = {};

var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

var options = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        confirm: './src/js/confirm.js',
        'no-tabs': './src/js/no-tabs.js',
        options: './src/js/options.js',
        background: './src/js/background.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    devServer: {
        clientLogLevel: 'debug',
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env'
                        ],
                        plugins: ["module:fast-async", "@babel/plugin-transform-runtime"]
                    },

                },

            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
                loader: "file-loader?name=[name].[ext]",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: /node_modules/,
                options: {
                    interpolate: true
                },
            }
        ]
    },
    resolve: {
        alias: alias
    },
    plugins: [
        new Dotenv(),
        //new CleanWebpackPlugin(),
        new ChromeExtensionReloadPlugin(),
        new webpack.EnvironmentPlugin(["NODE_ENV"]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "confirm.html"),
            filename: "confirm.html",
            chunks: ["confirm"]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "no-tabs.html"),
            filename: "no-tabs.html",
            chunks: ["no-tabs"]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "options.html"),
            filename: "options.html",
            chunks: ["options"]
        }),
        new CopyWebpackPlugin([
            {
                from: 'public', to: './'
            },
            {
                from: 'src/manifest.json', to: './manifest.json'
            }
        ],),
    ]
};

module.exports = options;