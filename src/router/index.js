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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/partner',
    component: Layout,
    redirect: '/partner/assets',
    name: 'partner',
    meta: { title: '我的伙伴', icon: 'example' },
    children: [
      {
        path: 'assets',
        name: '资产伙伴',
        component: () => import('@/views/assets/Index'),
        meta: { title: '资产伙伴', icon: 'table' }
      },
      {
        path: '/addAssets',
        name: '添加资产伙伴',
        component: () => import('@/views/assets/add')
      },
      {
        path: '/editAssets',
        name: '编辑资产伙伴',
        component: () => import('@/views/assets/edit')
      },
      {
        path: 'fund',
        name: '资金伙伴',
        component: () => import('@/views/fund/Index'),
        meta: { title: '资金伙伴', icon: 'table' }
      },
      {
        path: 'exit',
        name: '退出伙伴',
        component: () => import('@/views/exit/Index'),
        meta: { title: '退出伙伴', icon: 'table' }
      },
      {
        path: 'justice',
        name: '司法伙伴',
        component: () => import('@/views/justice/Index'),
        meta: { title: '司法伙伴', icon: 'table' }
      },
      {
        path: 'gov',
        name: '政府伙伴',
        component: () => import('@/views/gov/Index'),
        meta: { title: '政府伙伴', icon: 'table' }
      }
    ]
  },

  {
    path: '/find',
    component: Layout,
    redirect: '/system/dep',
    name: 'Nested',
    meta: {
      title: '查询伙伴',
      icon: 'nested'
    }
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/dep',
    name: 'Nested',
    meta: {
      title: '系统设置',
      icon: 'nested'
    },
    children: [
      {
        path: 'dep',
        component: () => import('@/views/department/Index'), // Parent router-view
        name: 'Dep',
        meta: { title: '部门设置' },
      },
      {
        path: 'dict',
        component: () => import('@/views/crm/system/dict/Index'),
        meta: { title: '字典设置' }
      },
      {
        path:'/adddepartment',
        component: () =>import('@/views/department/add'),
      },
      {
        path:'/add',
        component: () =>import('@/views/crm/system/dict/add'),
      },
      {
        path:'/edit',
        component: () =>import('@/views/crm/system/dict/edit'),

      },
      {
        path: 'user',
        component: () => import('@/views/sysuser/Index'),
        meta: { title: '用户设置' }
      },
      {
        path:'/addsysuser',
        component: () =>import('@/views/sysuser/add'),
      },
      {
        path:'/editsysuser',
        component: () =>import('@/views/sysuser/edit'),
      },
      {
        path: 'total',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '绩效统计' }
      }
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
