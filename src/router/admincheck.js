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
            path: 'assets/edit',
            component: () => import('@/views/crm/admincheck/assets/Edit'),
            meta:{title:'编辑'},
            hidden:true
          },
          {
            path: 'fund/index',
            component: () => import('@/views/crm/admincheck/fund/Index'),
            meta: { title: '资金伙伴', icon: 'table' }
          },
          {
            path: 'fund/edit',
            component: () => import('@/views/crm/admincheck/fund/Edit'),
            meta:{title:'编辑'},
            hidden:true
          },
          {
            path: 'exit/index',
            component: () => import('@/views/crm/admincheck/exit/Index'),
            meta: { title: '退出伙伴', icon: 'table' }
          },
          {
            path: 'exit/edit',
            component: () => import('@/views/crm/admincheck/exit/Edit'),
            meta:{title:'编辑'},
            hidden:true
          },
          {
            path: 'justice/index',
            component: () => import('@/views/crm/admincheck/justice/Index'),
            meta: { title: '司法伙伴', icon: 'table' }
          },
          {
            path: 'justice/edit',
            component: () => import('@/views/crm/admincheck/justice/Edit'),
            meta:{title:'编辑'},
            hidden:true
          },
          {
            path: 'peer/index',
            component: () => import('@/views/crm/admincheck/peer/Index'),
            meta: { title: '同业伙伴', icon: 'table' }
          },
          {
            path: 'peer/edit',
            component: () => import('@/views/crm/admincheck/peer/Edit'),
            meta:{title:'编辑'},
            hidden:true
          },
          {
            path: 'gov/index',
            component: () => import('@/views/crm/admincheck/gov/Index'),
            meta: { title: '政府伙伴', icon: 'table' }
          },
          {
            path: 'gov/edit',
            component: () => import('@/views/crm/admincheck/gov/Edit'),
            meta:{title:'编辑'},
            hidden:true
          },
        ]
      }
]