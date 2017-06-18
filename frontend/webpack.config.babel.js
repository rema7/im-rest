/* global __dirname */

import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'

const repoRoot = __dirname
const appRoot = path.join(repoRoot, 'app')
const distRoot = path.join(repoRoot, 'dist')
const publicRoot = path.join(repoRoot, 'public')

export default (env = {}) => {
    const isProduction = !!env.isProduction
    const useNotifier = !!env.useNotifier
    const isDevServer = !!env.isDevServer

    const defines = {
        'process.env': {
            NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
        },
    }

    let plugins = [
        new CleanWebpackPlugin([distRoot]),
        new ExtractTextPlugin('style-[hash].css'),
        new webpack.DefinePlugin(defines),
        new CopyWebpackPlugin([
            { from: publicRoot },
        ]),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
    ]

    if (isProduction) {
        plugins = [...plugins,
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                comments: false,
                sourceMap: false,
                mangle: true,
                minimize: true,
            }),
        ]
    } else {
        plugins = [...plugins,
            new StyleLintPlugin({
                files: '**/*.scss',
                syntax: 'scss',
            }),
            new ProgressBarPlugin(),
        ]
    }

    if (isDevServer) {
        plugins = [...plugins,
            new CopyWebpackPlugin([
                { from: path.join(publicRoot, 'index.html') },
            ]),
        ]
    }

    if (useNotifier) {
        plugins = [...plugins,
            new WebpackBuildNotifierPlugin({ title: 'CT MOS' }),
        ]
    }

    const cssLoaderOptions = {
        modules: true,
        importLoaders: 1,
    }
    if (!isProduction) {
        cssLoaderOptions.camelCase = true
        cssLoaderOptions.localIdentName = '[name]-[local]--[hash:base64:5]'
    }

    return {
        context: repoRoot,

        entry: {
            bundle: path.join(appRoot, 'index.js'),
        },

        resolve: {
            modules: [
                appRoot,
                'node_modules',
            ],
            alias: {
                coreStyles: path.join(repoRoot, 'node_modules/react-datepicker/dist/react-datepicker.css'),
                stylesheets: path.join(appRoot, 'assets', 'stylesheets'),
            },
        },

        output: {
            path: distRoot,
            filename: '[name]-[hash].js',
            libraryTarget: 'umd',
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: [
                        appRoot,
                        publicRoot,
                    ],
                    use: 'babel-loader',
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'eslint-loader',
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                },
                {
                    test: /\.scss$/,
                    include: [
                        appRoot,
                        publicRoot,
                    ],
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: cssLoaderOptions,
                            },
                            'postcss-loader',
                            'sass-loader',
                        ],
                    }),
                }
            ],
        },

        devtool: isProduction ? false : 'inline-source-map',

        devServer: {
            contentBase: [
                publicRoot,
            ],
            host: '0.0.0.0',
            port: '8010',
            noInfo: true,
            disableHostCheck: true,
            historyApiFallback: true,
        },
        plugins,
    }
}
