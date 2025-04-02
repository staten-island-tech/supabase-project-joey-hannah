import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import DiscoveryView from '@/views/DiscoveryView.vue'
import PostView from '@/views/PostView.vue'
import ReviewsView from '@/views/ReviewsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: DiscoveryView,
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostView,
    },
    {
      path: '/reviews',
      name: 'review',
      component: ReviewsView,
    },
  ],
})

export default router
