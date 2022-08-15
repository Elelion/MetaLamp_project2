const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**/

module.exports = {
  mode: "development",
  entry: {
    main: './main.js'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
  },

  module: {
    rules: [
      // sass
      {
        test: /\.sass$/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
            // url: false,
              importLoaders: 0,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            }
          },
          {loader: "sass-loader"},
        ],
      },

      // pug
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: false
        },
      },

      // svg
      {
        test: /\.svg$/,
        use: "file-loader",
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.pug',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/video'),
          to: path.resolve(__dirname, 'build/src/assets/video'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'build/src/assets/images'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/fonts'),
          to: path.resolve(__dirname, 'build/src/assets/fonts'),
        }
      ]
    }
  ),
 ],
};
