import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import "vue-toastification/dist/index.css"
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";

const pinia = createPinia()


createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast)
    .mount('#app')