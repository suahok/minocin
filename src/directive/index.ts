import { Plugin } from 'vue'
import { Loading } from './loading'
import { Preview } from './preview'

const directive: Plugin = {
  install(app) {
    app.directive('loading', Loading)
    app.directive('preview', Preview)
  }
}

export default directive
