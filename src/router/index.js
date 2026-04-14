import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowDetailView from '../views/ShowDetailView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/shows/:id',
    name: 'show-detail',
    component: ShowDetailView,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
