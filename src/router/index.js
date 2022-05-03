import { createRouter, createWebHistory } from 'vue-router'
import TestPage from '../views/TestPage'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TestPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
