import Layout from '@/layout'
export default [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/department/index',
    name: 'Nested',
    meta: {
      title: '系统设置',
      icon: 'user'
    },
    children: [
      {
        path: 'department/add',
        component: () => import('@/views/crm/system/department/Add'),
        meta: { title: '添加' },
        hidden: true
      },
      {
        path: 'department/edit',
        component: () => import('@/views/crm/system/department/Edit'),
        meta: { title: '编辑' },
        hidden: true
      },
      {
        path: 'department/index',
        component: () => import('@/views/crm/system/department/Index'), // Parent router-view
        meta: { title: '部门设置' },
      },

      {
        path: 'dict/index',
        component: () => import('@/views/crm/system/dict/Index'),
        meta: { title: '字典设置' }
      },
      {
        path: 'dict/add',
        component: () => import('@/views/crm/system/dict/add'),
        meta: { title: '添加' },
        hidden: true
      },
      {
        path: 'dict/edit',
        component: () => import('@/views/crm/system/dict/edit'),
        meta: { title: '编辑' },
        hidden: true
      },
      {
        path: 'user/index',
        component: () => import('@/views/crm/system/sysuser/Index'),
        meta: { title: '用户设置' }
      },
      {
        path: 'user/add',
        component: () => import('@/views/crm/system/sysuser/add'),
        meta: { title: '添加' },
        hidden: true
      },
      {
        path: 'user/edit',
        component: () => import('@/views/crm/system/sysuser/edit'),
        meta: { title: '编辑' },
        hidden: true
      },
      {
        path: 'statistics/index',
        component: () => import('@/views/crm/system/statistics/index'),
        meta: { title: '绩效统计' }
      }
    ]

  }
]