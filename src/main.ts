import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Toaster } from 'sonner'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Add Toaster component for notifications
const toaster = createApp(Toaster)
toaster.mount('#toaster') 