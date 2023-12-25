import path from 'node:path'
import webpack from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'
import HtmlPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Components from 'unplugin-vue-components/webpack'
import WebpackBar from 'webpackbar'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

const config: webpack.Configuration = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:7].js',
    // chunkFilename: '[id].[contenthash:7].js',
    chunkFilename(pathData, assetInfo) {
      return setChunkFile(pathData)
    },
    assetModuleFilename: '[name].[contenthash:7][ext]'
  },
  module: {
    rules: [
      { test: /\.vue$/i, exclude: /(node_modules)/, loader: 'vue-loader' },
      { test: /\.m?(t|j)s$/i, exclude: /(node_modules)/, loader: 'swc-loader' },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, exclude: /(node_modules)/, type: 'asset/resource' },
      { test: /.(woff|woff2|eot|ttf|otf)$/i, exclude: /(node_modules)/, type: 'asset/resource' },
      {
        test: /\.s?css$/i,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [['postcss-preset-env']] } }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['...', '.ts'],
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: './index.html',
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css',
      // chunkFilename: '[id].[contenthash:7].css'
      chunkFilename(pathData, assetInfo) {
        return setChunkFile(pathData, 'css')
      }
    }),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })]
    }),
    new WebpackBar({ basic: false })
  ]
}

function setChunkFile(pathData: webpack.PathData, ext = 'js') {
  const id = pathData.chunk?.id
  const paths = id!.toString().replaceAll('_vue', '').split('_')!
  const checkName = paths[paths?.length - 1].toString().toLowerCase()
  const hash = pathData.chunk?.hash
  return `${checkName}.${hash?.slice(0, 8)}.${ext}`
}

export default config
