import { App, createApp, defineAsyncComponent, Directive } from 'vue'

const PreviewComponent = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "Preview" */ './Preview.vue'),
  timeout: 3000
})

let instance: App<Element>
let element: HTMLElement

export const Preview: Directive = {
  mounted(el, binding, vnode) {
    console.log(el, binding, vnode)
    element = document.createElement('div')
    document.body.appendChild(element)
    instance = createApp(PreviewComponent)
    instance.provide('previews', binding.value)
    instance.mount(element)
  },
  unmounted(el, binding, vnode) {
    instance.unmount()
    element.remove()
  }
}
