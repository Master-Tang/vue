import Layout from '@/layout'
export default[
    {
        path: '/admincheck',
        component: Layout,
        name: 'admincheck',
        redirect:"/admincheck/assets",
        meta: { title: '伙伴管理', icon: 'example' },
        children:[
          {
            path: 'assets',
            redirect:"/admincheck/assets/index",
            component: () => import('@/views/crm/admincheck/assets/Index'),
            meta: { title: '资产伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/admincheck/assets/List'),
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/admincheck/assets/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'fund',
            redirect:"/admincheck/fund/index",
            component: () => import('@/views/crm/admincheck/fund/Index'),
            meta: { title: '资金伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/admincheck/fund/List'),
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/admincheck/fund/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'exit',
            redirect:"/admincheck/exit/index",
            component: () => import('@/views/crm/admincheck/exit/Index'),
            meta: { title: '退出伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/admincheck/exit/List'),
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/admincheck/exit/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'justice',
            redirect:"/admincheck/justice/index",
            component: () => import('@/views/crm/admincheck/justice/Index'),
            meta: { title: '司法伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/admincheck/justice/List'),
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/admincheck/justice/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'peer',
            redirect:"/admincheck/peer/index",
            component: () => import('@/views/crm/admincheck/peer/Index'),
            meta: { title: '同业伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/admincheck/peer/List'),
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/admincheck/peer/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'gov',
            redirect:"/admincheck/gov/index",
            component: () => import('@/views/crm/admincheck/gov/Index'),
            meta: { title: '政府伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/admincheck/gov/List'),
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/admincheck/gov/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          
        ]
      }
]