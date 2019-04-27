import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import ConfigParent from '@/components/ConfigParent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/config',
      name: '',
      component: ConfigParent
    },
  ]
})
