import Layout from '@/layout'
export default[
    {
        path: '/admincheck',
        component: Layout,
        name: 'admincheck',
        redirect:"index",
        meta: { title: '伙伴管理', icon: 'example' },
        children:[
          {
            path: 'assets/index',
            component: () => import('@/views/crm/admincheck/assets/Index'),
            meta: { title: '资产伙伴', icon: 'table' }
          },
          {
            path: 'assets/find',
            component: () => import('@/views/crm/admincheck/assets/Find'),
            
          },
          {
            path: 'fund/index',
            component: () => import('@/views/crm/admincheck/fund/Index'),
            meta: { title: '资金伙伴', icon: 'table' }
          },
          {
            path: 'fund/find',
            component: () => import('@/views/crm/admincheck/fund/Find'),
            
          },
          {
            path: 'exit/index',
            component: () => import('@/views/crm/admincheck/exit/Index'),
            meta: { title: '退出伙伴', icon: 'table' }
          },
          {
            path: 'exit/find',
            component: () => import('@/views/crm/admincheck/exit/Find'),
            
          },
          {
            path: 'justice/index',
            component: () => import('@/views/crm/admincheck/justice/Index'),
            meta: { title: '司法伙伴', icon: 'table' }
          },
          {
            path: 'justice/find',
            component: () => import('@/views/crm/admincheck/justice/Find'),
            
          },
          {
            path: 'peer/index',
            component: () => import('@/views/crm/admincheck/peer/Index'),
            meta: { title: '同业伙伴', icon: 'table' }
          },
          {
            path: 'peer/find',
            component: () => import('@/views/crm/admincheck/peer/Find'),
            
          },
          {
            path: 'gov/index',
            component: () => import('@/views/crm/admincheck/gov/Index'),
            meta: { title: '政府伙伴', icon: 'table' }
          },
          {
            path: 'gov/find',
            component: () => import('@/views/crm/admincheck/gov/Find'),
            
          },
        ]
      }
]