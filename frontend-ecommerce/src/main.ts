import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vue3-toastify/dist/index.css'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(Vue3Toastify, {autoClose: 3000} as ToastContainerOptions)

app.mount('#app')
