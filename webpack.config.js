/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { NODE_ENV = 'development' } = process.env;
const isProductionMode = NODE_ENV === 'production';
const hash = isProductionMode ? 'contenthash' : 'hash';

module.exports = {
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      // for babel
      '.js',
    ],
    alias: {
      '~': `${__dirname}/src`,
    },
  },
  entry: `${__dirname}/src/index.tsx`,
  output: {
    path: `${__dirname}/docs`,
    filename: `[name].[${hash}].js`,
    chunkFilename: `[name].[${hash}].js`,
    hashDigestLength: 5,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].[${hash}].css`,
    }),
    new HTMLWebpackPlugin({
      template: `src/index.html`,
      filename: `index.html`,
    }),
    ...(isProductionMode
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../reports/bundle-analyze.html',
          }),
        ]
      : []),
  ],
  mode: isProductionMode ? 'production' : 'development',
  devtool: isProductionMode ? 'source-map' : 'inline-source-map',
};
