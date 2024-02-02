import webpack from 'webpack'
import devServer from 'webpack-dev-server'
import { merge } from 'webpack-merge'
import common from './webpack.config'

type Configuration = webpack.Configuration & devServer.Configuration
const baseURL = process.env.VUE_BASE_URL
const proxyURL = process.env.VUE_PROXY_URL
const config: Configuration = merge(common, {
  mode: 'development',
  target: 'web',
  devServer: {
    hot: true,
    open: false,
    compress: true,
    client: { progress: true },
    proxy: {
      [`${baseURL}`]: {
        target: `${proxyURL}`,
        changeOrigin: true,
        pathRewrite: { [`${baseURL}`]: '' }
      }
    }
  }
})

export default config
