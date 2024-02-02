import { App, createApp, defineAsyncComponent, Directive } from 'vue'

const LoadingComponent = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "Loading" */ './Loading.vue'),
  timeout: 3000
})

let instance: App<Element>
let element: HTMLElement

export const Loading: Directive = {
  beforeUpdate(el, binding, vnode) {
    if (binding.value) {
      element = document.createElement('div')
      const screenful = binding.modifiers.screenful
      if (!screenful) {
        el.style.position = 'relative'
        el.appendChild(element)
      } else {
        document.body.appendChild(element)
      }
      instance = createApp(LoadingComponent)
      instance.provide('screenful', screenful)
      instance.mount(element)
    }
  },
  updated(el, binding, vnode) {
    if (!binding.value && instance) {
      instance.unmount()
      element.remove()
      el.style.position = ''
    }
  }
}
