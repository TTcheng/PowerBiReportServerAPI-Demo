// noinspection NodeJsCodingAssistanceForCoreModules
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: ['babel-polyfill', './src/app.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/app'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        exclude:/node_modules/,
        loader:'style-loader!css-loader'
      },
      {
        test: /\.jsx?$/, //js或jsx ,x?表示匹配x字符0次或1次
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
            //@babel/preset-env 转换ES6到ES5  @babel/preset-react将JSX和其他东西编译到 JavaScript
          }
        }
      },
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'inline-source-map',
};