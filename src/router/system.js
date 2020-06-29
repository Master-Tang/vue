import Layout from '@/layout'
export default [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/department',
    name: 'Nested',
    meta: { title: '系统设置', icon: 'user' },
    children: [
      {
        path: 'department',
        redirect:"/system/department/index",
        component: () => import('@/views/crm/system/department/Index'), // Parent router-view
        meta: { title: '部门设置' },
        children:[
          {
            path: 'index',
            component: () => import('@/views/crm/system/department/List'),
            hidden:true
          },
          {
            path: 'add',
            component: () => import('@/views/crm/system/department/Add'),
            meta: { title: '添加' },
            hidden: true
          },
          {
            path: 'edit',
            component: () => import('@/views/crm/system/department/Edit'),
            meta: { title: '编辑' },
            hidden: true
          },
        ]
      },
      


      {
        path: 'dict',
        redirect:"/system/dict/index",
        component: () => import('@/views/crm/system/dict/Index'),
        meta: { title: '字典设置' },
        children:[
          {
            path: 'index',
            component: () => import('@/views/crm/system/dict/List'),
            hidden:true
          },
          {
            path: 'add',
            component: () => import('@/views/crm/system/dict/add'),
            meta: { title: '添加' },
            hidden: true
          },
          {
            path: 'edit',
            component: () => import('@/views/crm/system/dict/edit'),
            meta: { title: '编辑' },
            hidden: true
          },
        ]
      },
      
      {
        path: 'sysuser',
        redirect:"/system/sysuser/index",
        component: () => import('@/views/crm/system/sysuser/Index'),
        meta: { title: '用户设置' },
        children:[
          {
            path: 'index',
            component: () => import('@/views/crm/system/sysuser/List'),
            hidden:true
          },
          {
            path: 'add',
            component: () => import('@/views/crm/system/sysuser/add'),
            meta: { title: '添加' },
            hidden: true
          },
          {
            path: 'edit',
            component: () => import('@/views/crm/system/sysuser/edit'),
            meta: { title: '编辑' },
            hidden: true
          },
        ]
      },
      
      {
        path: 'statistics/index',
        component: () => import('@/views/crm/system/statistics/index'),
        meta: { title: '绩效统计' }
      },
      {
        path: 'aim',
        redirect:"/system/aim/index",
        component: () => import('@/views/crm/system/aim/Index'),
        meta: { title: '绩效目标' },
        children:[
          {
            path: 'index',
            component: () => import('@/views/crm/system/aim/List'),
            hidden:true
          },
          {
            path: 'edit',
            component: () => import('@/views/crm/system/aim/edit'),
            meta: { title: '更改目标' },
            hidden: true
          },
        ]
      },
      
    ]

  }
]