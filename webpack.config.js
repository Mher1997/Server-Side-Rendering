const path = require('path');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

const clientConfig = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    watch: true,
    mode: 'development',
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader",
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.IS_CLIENT': JSON.stringify(true),
      }),
    ]
}

const serverConfig = {
    entry: './server.js',
    target: 'node',
    externals: [nodeExternals()],
    watch: true,
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'server.js'
    },
    module: {
      rules: [
        { test: /\.(js)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env'],
            }
          } 
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.IS_CLIENT': JSON.stringify(false),
      }),
    ]
  }
 
module.exports = [clientConfig, serverConfig];