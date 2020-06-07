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
            component: () => import('@/views/crm/partner/assets/Index'),
            meta: { title: '资金伙伴', icon: 'table' }
          },
          {
            path: 'fund/add',
            component: () => import('@/views/crm/partner/assets/Add')
          },
          {
            path: 'fund/edit',
            component: () => import('@/views/crm/partner/assets/Edit')
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
        ]
      },
  
     
]