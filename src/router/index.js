import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import TicketManagement from '../views/TicketManagement.vue'

const routes = [
  { path: '/', redirect: '/login' }, // default to login
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', name: 'Tickets', component: TicketManagement, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('ticketapp_session')

  if ((to.path === '/login' || to.path === '/signup') && isAuthenticated) {
    // logged-in users should go to home
    next('/home')
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    // unauthenticated users trying to access protected routes
    next('/login')
  } else {
    next()
  }
})

export default router





