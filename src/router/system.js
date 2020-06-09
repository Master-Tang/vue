import Layout from '@/layout'
export default[
  {
        path: '/system',
        component: Layout,
        redirect: '/system/department/index',
        name: 'Nested',
        meta: {
          title: '系统设置',
          icon: 'nested'
        },
        children: [
            {
                path: 'department/add',
                component: () => import('@/views/crm/system/department/Add'),
            },
            {
              path: 'department/edit',
              component: () => import('@/views/crm/system/department/Edit'),
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
            path:'dict/add',
            component: () =>import('@/views/crm/system/dict/add'),
          },
          {
            path:'dict/edit',
            component: () =>import('@/views/crm/system/dict/edit'),
    
          },
          {
            path: 'user/index',
            component: () => import('@/views/crm/system/sysuser/Index'),
            meta: { title: '用户设置' }
          },
          {
            path:'user/add',
            component: () =>import('@/views/crm/system/sysuser/add'),
          },
          {
            path:'user/edit',
            component: () =>import('@/views/crm/system/sysuser/edit'),
          },
          {
            path: 'user/total',
            component: () => import('@/views/nested/menu2/index'),
            meta: { title: '绩效统计' }
          }
        ]

      }
      ]