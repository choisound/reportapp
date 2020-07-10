import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Register from '@/views/register'
import Order from '@/views/order'
import Main from '@/views/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ],
  mode: 'history'
})
