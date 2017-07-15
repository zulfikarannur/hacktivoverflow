import Vue from 'vue'
import Router from 'vue-router'
import Forums from '@/components/Forums'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Forums',
      component: Forums
    }
  ]
})
