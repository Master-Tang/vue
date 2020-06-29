import Layout from '@/layout'
export default[
    {
        path: '/search',
        component: Layout,
        name: 'search',
        redirect:"/search/assets",
        meta: { title: '伙伴查询', icon: 'example' },
        children:[
          {
            path: 'assets',
            redirect:"/search/assets/index",
            component: () => import('@/views/crm/search/assets/Index'),
            meta: { title: '资产伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/search/assets/List'),
                hidden:true
              },
              {
                path: 'find',
                component: () => import('@/views/crm/search/assets/Find'),
                meta:{title:'查看'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'fund',
            redirect:"/search/fund/index",
            component: () => import('@/views/crm/search/fund/Index'),
            meta: { title: '资金伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/search/fund/List'),
                hidden:true
              },
              {
                path: 'find',
                component: () => import('@/views/crm/search/fund/Find'),
                meta:{title:'查看'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'exit',
            redirect:"/search/exit/index",
            component: () => import('@/views/crm/search/exit/Index'),
            meta: { title: '退出伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/search/exit/List'),
                hidden:true
              },
              {
                path: 'find',
                component: () => import('@/views/crm/search/exit/Find'),
                meta:{title:'查看'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'justice',
            redirect:"/search/justice/index",
            component: () => import('@/views/crm/search/justice/Index'),
            meta: { title: '司法伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/search/justice/List'),
                hidden:true
              },
              {
                path: 'find',
                component: () => import('@/views/crm/search/justice/Find'),
                meta:{title:'查看'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'peer',
            redirect:"/search/peer/index",
            component: () => import('@/views/crm/search/peer/Index'),
            meta: { title: '同业伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/search/peer/List'),
                hidden:true
              },
              {
                path: 'find',
                component: () => import('@/views/crm/search/peer/Find'),
                meta:{title:'查看'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'gov',
            redirect:"/search/gov/index",
            component: () => import('@/views/crm/search/gov/Index'),
            meta: { title: '政府伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/search/gov/List'),
                hidden:true
              },
              {
                path: 'find',
                component: () => import('@/views/crm/search/gov/Find'),
                meta:{title:'查看'},
                hidden:true
              },
            ]
          },
          
        ]
      }
]