import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import Registered from '../views/RegisteredView.vue'
import GenerateBarcode from '../views/GenerateBarcodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'about'
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
      meta: {
        title: 'registration'
      }
    },
    {
      path: '/registered',
      name: 'registered',
      component: Registered,
      meta: {
        title: 'registered'
      }
    },
    {
      path: '/generate-barcode',
      name: 'generate-barcode',
      component: GenerateBarcode,
      meta: {
        title: 'generate-barcode'
      }
    }
  ],
  mode: 'hash'
})

export default router
