const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/scripts/application.js',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Weather App',
      template: './src/index.html',
    }),
    new Dotenv(),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      { test: /\.html$/i, use: ['html-loader'] },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|jpeg|svg|gif)$/i, type: 'asset/resource' },
      { test: /\.(ttf|woff|woff2|eot|otf)$/i, type: 'asset/resource' },
    ],
  },
};
