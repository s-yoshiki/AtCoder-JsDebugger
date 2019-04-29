import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import ConfigParent from '@/components/ConfigParent'
import Config from '@/components/Configs/Config'
import EditorSettings from '@/components/Configs/EditorSettings'
import Snippets from '@/components/Configs/Snippets'
import Stdin from '@/components/Configs/Stdin'
import Stdout from '@/components/Configs/Stdout'
import Stderr from '@/components/Configs/Stderr'
import ImportSettings from '@/components/Configs/ImportSettings'
import ExportSettings from '@/components/Configs/ExportSettings'
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
          path:'/config/editor-settings',
          name:'EditotTheme',
          component:EditorSettings
        },
        {
          path:'/config/snippets',
          name:'Snippets',
          component:Snippets
        },
        {
          path:'/config/stdin',
          name:'Stdin',
          component:Stdin
        },
        {
          path:'/config/stdout',
          name:'Stdout',
          component:Stdout
        },
        {
          path:'/config/stderr',
          name:'Stderr',
          component:Stderr
        },
        {
          path:'/config/import-settings',
          name:'ImportSettings',
          component:ImportSettings
        },
        {
          path:'/config/export-settings',
          name:'ExportSettings',
          component:ExportSettings
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
