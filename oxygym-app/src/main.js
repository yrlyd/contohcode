import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

router.beforeEach((to, from, next) =>{
    document.title = `Oxygym - ${to.meta.title}`
    next()
})
const app = createApp(App)

app.use(router)

app.mount('#app')
