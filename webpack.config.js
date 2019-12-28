const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin')

const baseManifest = require('./chrome/manifest.json')

const config = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  // devtool: 'cheap-module-source-map',
  entry: {
    popup: path.join(__dirname, './src/popup.js'),
    content: path.join(__dirname, './src/content.js'),
    background: path.join(__dirname, './src/background.js')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hypha',
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#000000'
      },
      chunks: ['popup', 'vendors'],
      manifest: 'manifest.json',
      filename: 'popup.html',
      template: './src/popup.html',
      hash: true
    }),
    new CopyPlugin([
      {
        from: 'chrome/icons',
        to: 'icons'
      },
      {
        from: 'chrome/hot-reload.js',
        to: 'hot-reload.js'
      }
    ]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      },
      { test: /\.svg$/, use: ['@svgr/webpack'] }
    ]
  }
}

module.exports = config
