import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ui from '@nuxt/ui/vue-plugin'
import VueVirtualScroller from 'vue-virtual-scroller'

import App from './App.vue'
import router from './router'

import 'vue-virtual-scroller/index.css'
import './assets/css/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ui)
app.use(VueVirtualScroller)

app.mount('#app')
