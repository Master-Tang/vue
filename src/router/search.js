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
            path: 'fund/index',
            component: () => import('@/views/crm/search/fund/Index'),
            meta: { title: '资金伙伴', icon: 'table' }
          },
          {
            path: 'exit/index',
            component: () => import('@/views/crm/search/exit/Index'),
            meta: { title: '退出伙伴', icon: 'table' }
          },
          {
            path: 'justice/index',
            component: () => import('@/views/crm/search/justice/Index'),
            meta: { title: '司法伙伴', icon: 'table' }
          },
          {
            path: 'peer/index',
            component: () => import('@/views/crm/search/peer/Index'),
            meta: { title: '同业伙伴', icon: 'table' }
          },
          {
            path: 'gov/index',
            component: () => import('@/views/crm/search/gov/Index'),
            meta: { title: '政府伙伴', icon: 'table' }
          },
        ]
      }
]