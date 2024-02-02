import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import directive from '@/directive'
import './directive/loading/loading.css'

const app = createApp(App)
app.use(router).use(directive).mount('#app')
