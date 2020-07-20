import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [{
      path: 'welcome',
      name: 'Welcome',
      component: () => import('@/views/welcome/index'),
      meta: { title: '欢迎', icon: 'welcome' }
    }]
  },
  {
    path: '/banner',
    redirect: '/banner/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Banner',
        component: () => import('@/views/banner/index'),
        meta: { title: '轮播图信息', icon: 'banner' }
      },
      {
        path: 'details/:id',
        name: 'details',
        component: () => import('@/views/banner/details'),
        meta: { title: '轮播图详情', icon: 'banner' },
        hidden:true
      }
    ],
  },
  {
    path: '/tag',
    redirect: '/tag/index',
    component: Layout,
    meta: { title: '标签管理', icon: 'classify' },
    children: [
      {
        path: 'index',
        name: 'Tag',
        component: () => import('@/views/tag/index'),
        meta: { title: '标签列表', icon: 'tag' }
      },
      {
        path: 'details/:id',
        name: 'details',
        component: () => import('@/views/tag/details'),
        meta: { title: '标签详情', icon: 'tag' },
        hidden:true
      }
    ],
  },
  {
    path: '/teacher',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Teacher',
        component: () => import('@/views/teacher/index'),
        meta: { title: '教师信息', icon: 'teacher' }
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/teacher/create'),
        meta: { title: '详情', icon: 'teacher' },
        hidden:true
      }
    ],
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/user/create'),
        meta: { title: '创建用户', icon: 'add-user' },
      },
      {
        path: 'list',
        name: 'User',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'details/:id',
        name: 'Details',
        component: () => import('@/views/user/details'),
        meta: { title: '用户信息详情', icon: 'user' },
        hidden: true
      },
    ],
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Course',
    meta: {
      title: '课程信息',
      icon: 'course'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/course/list/index'),
        meta: { title: '课程列表' }
      },
      {
        path: 'details/:id',
        component: () => import('@/views/course/details/index'),
        meta: { title: '课程详情' },
        hidden: true
      },
      {
        path: 'chapter/:courseId',
        component: () => import('@/views/course/chapter/index'),
        meta: { title: '章列表' },
        hidden: true
      },
      {
        path: 'chapter/details/:courseId/:chapId',
        component: () => import('@/views/course/chapter/details'),
        meta: { title: '章详情' },
        hidden: true
      },
      {
        path: 'section/:chapterId/:courseId',
        component: () => import('@/views/course/section/index'),
        meta: { title: '节列表' },
        hidden: true
      },
      {
        path: 'section/details/:chapterId/:secId',
        component: () => import('@/views/course/section/details'),
        meta: { title: '节详情' },
        hidden: true
      },
      {
        path: 'section/excises/:secId/:name',
        component: () => import('@/views/course/section/excises'),
        meta: { title: '节习题' },
        hidden: true
      },
      {
        path: 'material/list/:id',
        component: () => import('@/views/course/material/list'),
        meta: { title: '资料列表' },
        hidden: true
      },
      {
        path: 'material/details/:courseId/:id',
        component: () => import('@/views/course/material/details'),
        meta: { title: '资料详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/classify',
    component: Layout,
    name: 'Classify',
    meta: { title: '课程分类', icon: 'classify' },
    children: [
      {
        path: 'primarylist',
        name: 'Primarylist',
        component: () => import('@/views/classify/primary/index'),
        meta: { title: '分类列表', icon: 'classify1' }
      },
      {
        path: 'primaryDetails',
        name: 'PrimaryDetails',
        hidden: true,
        component: () => import('@/views/classify/primary/details'),
        meta: { title: '编辑分类', icon: 'classify1' }
      },
      {
        path: 'secondList',
        name: 'SecondList',
        component: () => import('@/views/classify/secondary/index'),
        meta: { title: 'path列表', icon: 'classify2' }
      },
      {
        path: 'secondDetails',
        name: 'SecondDetails',
        hidden: true,
        component: () => import('@/views/classify/secondary/details'),
        meta: { title: '编辑path', icon: 'classify2' }
      },
      {
        path: 'secondExcises/:id',
        name: 'SecondExcises',
        hidden: true,
        component: () => import('@/views/classify/secondary/excises'),
        meta: { title: 'path习题', icon: 'classify2' }
      }
    ]
  },
  {
    path: '/blog',
    component: Layout,
    meta: { title: '博客管理', icon: 'boke' },
    redirect: '/blog/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/blog/index'),
        meta: { title: '博客列表', icon: 'boke' }
      },
      {
        path: 'comment/:id',
        name: 'comment',
        component: () => import('@/views/blog/comment'),
        meta: { title: '评论列表', icon: 'boke' },
        hidden: true
      },
    ]
  },
  {
    path: '/program',
    component: Layout,
    meta: { title: '编程题管理', icon: 'program'},
    redirect: '/program/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/program/index'),
        meta: { title: '编程题列表', icon: 'program' }
      },
      {
        path: 'details/:id/:tag',
        name: 'details',
        component: () => import('@/views/program/details'),
        meta: { title: '批改', icon: 'boke' },
        hidden: true
      },
    ]
  },
  {
    path: '/activity',
    component: Layout,
    meta: { title: '运营活动', icon: 'activity'},
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/activity/index'),
        meta: { title: '闯关活动列表', icon: 'barrier' }
      },
      {
        path: 'excises/:id',
        name: 'excises',
        component: () => import('@/views/activity/excises'),
        meta: { title: '闯关题目', icon: 'barrier' },
        hidden: true
      },
      {
        path: 'material/:id',
        name: 'excises',
        component: () => import('@/views/activity/material'),
        meta: { title: '闯关任务资料', icon: 'barrier' },
        hidden: true
      },
      {
        path: 'vote',
        name: 'vote',
        component: () => import('@/views/activity/vote'),
        meta: { title: '视频大赛', icon: 'vote' }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
