import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import weather from '@/components/weather'
// import music from '@/components/music'
// import NotFound from '@/components/NotFound'

//懒加载写法
const Hello = resolve => require(['@/components/Hello.vue'], resolve)
const weather = resolve => require(['@/components/weather.vue'], resolve)
const music = resolve => require(['@/components/music.vue'], resolve)
const blog = resolve => require(['@/components/blog.vue'], resolve)
const galery = resolve => require(['@/components/galery.vue'], resolve)
const NotFound = resolve => require(['@/components/NotFound.vue'], resolve)

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
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/galery',
      name: 'galery',
      component: galery
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})
