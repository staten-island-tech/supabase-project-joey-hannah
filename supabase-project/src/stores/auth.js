
import {useAuthStore} from '../stores/auth'

const routes = [
  { path: '/', component: Home},  //change when we have files we want to auth

  {path: '/secret-candy',
    component: SecretCandy,
    meta: {requiresAuth: true},
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.BeforeEach((to,from,next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    alert('You must log in to view this')
    next('/')
  }else{
    next()
  }
})

