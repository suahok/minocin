import webpack from 'webpack'
import devServer from 'webpack-dev-server'
import { merge } from 'webpack-merge'
import common from './webpack.config'

type Configuration = webpack.Configuration & devServer.Configuration
const config: Configuration = merge(common, {
  mode: 'development',
  target: 'web',
  devServer: {
    hot: true,
    open: false,
    compress: true,
    client: { progress: true }
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
})

export default config
