import { merge } from 'webpack-merge'
import common from './webpack.config'

const config = merge(common, {
  mode: 'production',
  output: {
    pathinfo: false,
    publicPath: '/',
    clean: true
  },
  cache: { type: 'filesystem' },
  optimization: {
    chunkIds: 'named',
    runtimeChunk: { name: 'runtime' },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vender'
        }
      }
    }
  }
})

export default config
