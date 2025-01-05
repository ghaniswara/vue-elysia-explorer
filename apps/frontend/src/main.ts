import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useFilePreviewProvider } from './provider/filePreview'

const app = createApp(App)

app.use(router)
app.mount('#app')
useFilePreviewProvider()
