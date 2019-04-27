import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import Root from '@/components/Root'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/root',
      name: 'Root',
      component: Root
    },
  ]
})
