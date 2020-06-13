import Layout from '@/layout'
export default[
    {
        path: '/search',
        component: Layout,
        name: 'search',
        redirect:"index",
        meta: { title: '伙伴查询', icon: 'example' },
        children:[
          {
            path: 'assets/index',
            component: () => import('@/views/crm/search/assets/Index'),
            meta: { title: '资产伙伴', icon: 'table' }
          },
          {
            path: 'assets/find',
            component: () => import('@/views/crm/search/assets/Find'),
            
          },
          {
            path: 'fund/index',
            component: () => import('@/views/crm/search/fund/Index'),
            meta: { title: '资金伙伴', icon: 'table' }
          },
          {
            path: 'fund/find',
            component: () => import('@/views/crm/search/fund/Find'),
            
          },
          {
            path: 'exit/index',
            component: () => import('@/views/crm/search/exit/Index'),
            meta: { title: '退出伙伴', icon: 'table' }
          },
          {
            path: 'exit/find',
            component: () => import('@/views/crm/search/exit/Find'),
            
          },
          {
            path: 'justice/index',
            component: () => import('@/views/crm/search/justice/Index'),
            meta: { title: '司法伙伴', icon: 'table' }
          },
          {
            path: 'justice/find',
            component: () => import('@/views/crm/search/justice/Find'),
            
          },
          {
            path: 'peer/index',
            component: () => import('@/views/crm/search/peer/Index'),
            meta: { title: '同业伙伴', icon: 'table' }
          },
          {
            path: 'peer/find',
            component: () => import('@/views/crm/search/peer/Find'),
            
          },
          {
            path: 'gov/index',
            component: () => import('@/views/crm/search/gov/Index'),
            meta: { title: '政府伙伴', icon: 'table' }
          },
          {
            path: 'gov/find',
            component: () => import('@/views/crm/search/gov/Find'),
            
          },
        ]
      }
]