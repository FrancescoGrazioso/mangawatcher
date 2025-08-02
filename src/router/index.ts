import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Watchlist from '@/views/Watchlist.vue'
import Search from '@/views/Search.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/watchlist',
      name: 'Watchlist',
      component: Watchlist
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})

export default router 