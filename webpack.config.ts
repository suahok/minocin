import path from 'node:path'
import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import { VueLoaderPlugin } from 'vue-loader'
import HtmlPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Components from 'unplugin-vue-components/webpack'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { getClientEnvironment } from './env'

const NODE_ENV = process.env.NODE_ENV
const env = getClientEnvironment(`.${NODE_ENV}`)
const config: webpack.Configuration = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:7].js',
    chunkFilename: (pathData, assetInfo) => setChunkFilename(pathData, assetInfo),
    assetModuleFilename: 'static/[name].[contenthash:7][ext]',
    globalObject: 'this'
  },
  module: {
    rules: [
      { test: /\.vue$/, exclude: /(node_modules)/, loader: 'vue-loader' },

      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        loader: 'swc-loader',
        options: {
          jsc: {
            target: 'es2015', // 输出js的规范
            parser: { syntax: 'typescript', tsx: true, decorators: true, dynamicImport: true },
            transform: { legacyDecorator: true },
            externalHelpers: true // 注意这里设置true时，需要在项目下安装@swc/helpers
          }
          // env: { targets: 'edge 14', mode: 'usage', coreJs: '3.25' }
          // isModule: 'unknown'
        }
      },
      {
        test: /\.worker\.js$/,
        exclude: /(node_modules)/,
        use: ['worker-loader', 'ts-loader']
      },
      {
        test: /\.s?css$/,
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
      },
      { test: /\.(png|svg|jpg|jpeg|gif)$/, exclude: /(node_modules)/, type: 'asset/resource' },
      { test: /.(woff|woff2|eot|ttf|otf)$/, exclude: /(node_modules)/, type: 'asset/resource' }
    ]
  },
  resolve: {
    extensions: ['...', '.ts'],
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  plugins: [
    new VueLoaderPlugin(),
    Components({ resolvers: [NaiveUiResolver()] }),
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
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: (pathData, assetInfo) => setChunkFilename(pathData, assetInfo, 'css')
    }),
    new webpack.DefinePlugin(
      Object.assign(env.stringified, {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      })
    ),
    new WebpackBar({ basic: false })
  ]
}

function setChunkFilename(pathData: webpack.PathData, assetInfo?: webpack.AssetInfo, ext = 'js') {
  const chunkId = pathData.chunk?.id
  const paths = `${chunkId!}`.split(/[^a-zA-Z]+/)!
  let checkName = ''
  if (paths.length > 1) {
    checkName = paths[paths?.length - 2].toString().toLowerCase()
  } else {
    checkName = paths[0].toLowerCase()
  }
  const hash = pathData.chunk?.hash
  return `${ext}/${checkName}.${hash?.slice(0, 7)}.${ext}`
}

export default config
