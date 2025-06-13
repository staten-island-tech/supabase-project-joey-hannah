import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/profile/:id',
      name: 'user-profile',
      component: () => import('@/components/UserProfile.vue'),
      props: true,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: () => import('@/views/DiscoveryView.vue'),
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('@/views/PostView.vue'),
    },
    {
      path: '/reviews',
      name: 'review',
      component: () => import('@/views/ReviewsView.vue'),
    },
    {
      path: '/reviews/:id',
      name: 'review-detail',
      component: () => import('@/views/IndividualReviewView.vue'),
      props: true,
    },
  ],
})

export default router
