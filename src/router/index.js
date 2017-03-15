import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import weather from '@/components/weather'
import music from '@/components/music'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/weather',
      name: 'weather',
      component: weather
    },
    {
      path: '/music',
      name: 'music',
      component: music
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})
