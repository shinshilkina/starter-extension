const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'app'),
};

module.exports = {
  mode: process.env.NODE_ENV,
  watch: true,
  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
      name: false,
    },
  },
  entry: {
    bg: `${PATHS.source}/background/app.js`,
    content: `${PATHS.source}/content/app.js`,
    popup: `${PATHS.source}/popup/app.js`,
  },
  output: {
    path: PATHS.build,
    filename: '[name]/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                corejs: 3,
                targets: {
                  browsers: [
                    'last 5 Chrome versions',
                    'last 5 firefox versions',
                  ],
                },
                useBuiltIns: 'usage',
              }],
            ],
            plugins: ['lodash', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: [
          /serp\.scss/,
          `${PATHS.source}/style.scss`,
        ],
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: [
          /serp\.scss/,
          `${PATHS.source}/style.scss`,
        ],
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:6]',
            },
          }, 'scss-loader'],
      },
      {
        test: /\.(png|jpg|gif|eot|svg|otf|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 500000,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['app']),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static', to: './' },
      ],
    }),
    new MiniCssExtractPlugin({ filename: '[name]/styles.css' }),
  ],
};
