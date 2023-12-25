import { defineAsyncComponent } from 'vue'

export function _import(filename: string, root = 'views') {
  return () => import(/* webpackChunkName: "[request]" */ `@/${root}/${filename}.vue`)
}

_import.async = function (filename: string, root = 'components') {
  return defineAsyncComponent({
    loader: _import(filename, root),
    timeout: 3000
  })
}
