import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useFilePreviewProvider } from './provider/filePreview'
import { PrimeVue } from '@primevue/core'
import { Splitter , SplitterPanel as PrimeSplitterPanel } from 'primevue'


const app = createApp(App)

app.use(PrimeVue)
app.component('PrimeSplitter', Splitter)
app.component('SplitterPanel', PrimeSplitterPanel)

app.use(router)
app.mount('#app')
useFilePreviewProvider()
