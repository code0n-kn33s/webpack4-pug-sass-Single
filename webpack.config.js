const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.pug$/,
        use: [
          "html-loader",
          "pug-html-loader"
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { sourceMap: true }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                config: { path: 'postcss.config.js'}
              }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true }
            }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: SvgSpriteHtmlWebpackPlugin.getLoader(),
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|icon)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              disable: process.env.NODE_ENV ? false : true,
              mozjpeg: {
                progressive: true,
                quality: 90
              },
              optipng: {
                optimizationLevel: 9
              },
              pngquant: {
                quality: "90",
                speed: 9
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin('dist', {}),
    new HtmlWebPackPlugin({
      template: "./src/index.pug",
      filename: "./index.html"
    }),
    new SvgSpriteHtmlWebpackPlugin({
      includeFiles: [
        'src/img/svg/*.svg',
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
}

if(process.env.NODE_ENV) {
  module.exports.plugins.push(
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer'),
          require('cssnano')
        ]
      }
    })
  )
}