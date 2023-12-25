import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { Loading } from '@/directives'

import './directives/loading/loading.css'

const app = createApp(App)
app.directive('loading', Loading)
app.use(router).mount('#app')
