import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import ConfigParent from '@/components/ConfigParent'
import Config from '@/components/Configs/Config'
import EditorTheme from '@/components/Configs/EditorTheme'
import Snippets from '@/components/Configs/Snippets'
import About from '@/components/Configs/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/config/:screen',
      name: 'ConfigParent',
      component: ConfigParent,
      children: [
        {
          path:'/config/',
          name:'Config',
          component:Config
        },
        {
          path:'/config/editor-theme',
          name:'EditotTheme',
          component:EditorTheme
        },
        {
          path:'/config/snippets',
          name:'Snippets',
          component:Snippets
        },
        {
          path:'/config/about',
          name:'About',
          component:About
        },
      ],
    },
  ]
})
