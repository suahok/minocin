import { App, createApp, defineAsyncComponent, Directive } from 'vue'

const LoadingComponent = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "loading" */ './Loading.vue'),
  timeout: 3000
})

let instance: App<Element>
let element: HTMLElement

export const Loading: Directive = {
  beforeUpdate(el, binding, vnode) {
    if (binding.value) {
      element = document.createElement('div')
      el.style.position = 'relative'
      el.appendChild(element)
      instance = createApp(LoadingComponent)
      instance.mount(element)
    }
  },
  updated(el, binding, vnode) {
    if (!binding.value) {
      instance.unmount()
      element.remove()
      el.style.position = ''
    }
  }
}
