const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const hash = production ? 'contenthash' : 'hash';
const output = `${__dirname}/docs`;

module.exports = {
  entry: {
    index: ['normalize.css', '@babel/polyfill', `${__dirname}/src/index.js`],
  },
  output: {
    path: output,
    filename: `[name].[${hash}].js`,
    chunkFilename: `[name].[${hash}].js`,
    hashDigestLength: 5,
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    ...(production ? [new CleanWebpackPlugin()] : []),
    new MiniCssExtractPlugin({
      filename: `[name].[${hash}].css`,
    }),
    new HTMLWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  mode: production ? 'production' : 'development',
  devtool: production ? 'source-map' : 'inline-source-map',
};
