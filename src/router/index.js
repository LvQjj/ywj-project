import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  name: 'Index',
  meta: {
    keepAlive: true
  },
  component: () =>
    import ('../views/index.vue')
}, {
  path: '/zhuce',
  name: 'Zhuce',
  component: () =>
    import ('../views/zhuce.vue')
}, {
  path: '/editcat',
  name: 'Editcat',
  component: () =>
    import ('../views/editcat.vue')
}, {
  path: '/download',
  name: 'Download',
  component: () =>
    import ('../views/download.vue')
}, {
  path: '/article/:id',
  name: 'Article',
  component: () =>
    import ('../views/article.vue')
}, {
  path: '/denglu',
  name: 'Denglu',
  component: () =>
    import ('../views/denglu.vue')
}, {
  path: '/userinfo',
  component: () =>
    import ('../views/userinfo.vue'),
  children: [{
    path: '',
    redirect: 'dongtai'
  }, {
    path: 'shipin',
    name: 'Shipin',
    component: () =>
      import ('../components/userComponents/userList.vue')
  }, {
    path: 'dongtai',
    name: 'Dongtai',
    component: () =>
      import ('../components/userComponents/userList.vue')
  }]
}, {
  path: '/xiugai',
  name: 'Xiugai',
  component: () =>
    import ('../views/xiugai.vue')
}, ]


const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router