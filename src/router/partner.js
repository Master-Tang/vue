import Layout from '@/layout'
export default[
    {
        path: '/partner',
        component: Layout,
        name: 'partner',
        redirect:"index",
        meta: { title: '我的伙伴', icon: 'example' },
        children:[
          {
            path: 'assets/index',
            component: () => import('@/views/crm/partner/assets/Index'),
            meta: { title: '资产伙伴', icon: 'table' }
          },
          {
            path: 'assets/add',
            component: () => import('@/views/crm/partner/assets/Add'),
            meta:{title:'新增'},
            hidden:true
          },
          {
            path: 'assets/edit',
            component: () => import('@/views/crm/partner/assets/Edit'),
            meta:{title:'编辑'},
            hidden:true
          },

          {
            path: 'fund/index',
            component: () => import('@/views/crm/partner/fund/Index'),
            meta: { title: '资金伙伴', icon: 'table' }
          },
          {
            path: 'fund/add',
            component: () => import('@/views/crm/partner/fund/Add')
          },
          {
            path: 'fund/edit',
            component: () => import('@/views/crm/partner/fund/Edit')
          },

          {
            path: 'exit/index',
            component: () => import('@/views/crm/partner/exit/Index'),
            meta: { title: '退出伙伴', icon: 'table' }
          },
          {
            path: 'exit/add',
            component: () => import('@/views/crm/partner/exit/Add')
          },
          {
            path: 'exit/edit',
            component: () => import('@/views/crm/partner/exit/Edit')
          },
          {
            path: 'justice/index',
            component: () => import('@/views/crm/partner/justice/Index'),
            meta: { title: '司法伙伴', icon: 'table' }
          },
          {
            path: 'justice/add',
            component: () => import('@/views/crm/partner/justice/Add')
          },
          {
            path: 'justice/edit',
            component: () => import('@/views/crm/partner/justice/Edit')
          },
          {
            path: 'peer/index',
            component: () => import('@/views/crm/partner/peer/Index'),
            meta: { title: '同业伙伴', icon: 'table' }
          },
          {
            path: 'peer/add',
            component: () => import('@/views/crm/partner/peer/Add')
          },
          {
            path: 'peer/edit',
            component: () => import('@/views/crm/partner/peer/Edit')
          },
          {
            path: 'gov/index',
            component: () => import('@/views/crm/partner/gov/Index'),
            meta: { title: '政府伙伴', icon: 'table' }
          },
          {
            path: 'gov/add',
            component: () => import('@/views/crm/partner/gov/Add')
          },
          {
            path: 'gov/edit',
            component: () => import('@/views/crm/partner/gov/Edit')
          },
        ]
      },
  
     
]