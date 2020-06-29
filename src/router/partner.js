import Layout from '@/layout'
import AssetsIndex from '@/views/crm/partner/assets/Index'
export default[
    {
        path: '/partner',
        component: Layout,
        name: 'partner',
        redirect:"/partner/assets",
        meta: { title: '我的伙伴', icon: 'example' },
        children:[
          {
            path: 'assets',
            redirect:"/partner/assets/index",
            component:AssetsIndex,
            meta: { title: '资产伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/partner/assets/List'),
                hidden:true
              },
              {
                path: 'add',
                component: () => import('@/views/crm/partner/assets/Add'),
                meta:{title:'新增'},
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/partner/assets/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
    
            ]
          },
         
          {
            path: 'fund',
            redirect:"/partner/fund/index",
            component: () => import('@/views/crm/partner/fund/Index'),
            meta: { title: '资金伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/partner/fund/List'),
                hidden:true
              },
              {
                path: 'add',
                component: () => import('@/views/crm/partner/fund/Add'),
                meta:{title:'新增'},
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/partner/fund/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          

          {
            path: 'exit',
            redirect:"/partner/exit/index",
            component: () => import('@/views/crm/partner/exit/Index'),
            meta: { title: '退出伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/partner/exit/List'),
                hidden:true
              },
              {
                path: 'add',
                component: () => import('@/views/crm/partner/exit/Add'),
                meta:{title:'新增'},
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/partner/exit/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
         
          {
            path: 'justice',
            redirect:"/partner/justice/index",
            component: () => import('@/views/crm/partner/justice/Index'),
            meta: { title: '司法伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/partner/justice/List'),
                hidden:true
              },
              {
                path: 'add',
                component: () => import('@/views/crm/partner/justice/Add'),
                meta:{title:'新增'},
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/partner/justice/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'peer',
            redirect:"/partner/peer/index",
            component: () => import('@/views/crm/partner/peer/Index'),
            meta: { title: '同业伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/partner/peer/List'),
                hidden:true
              },
              {
                path: 'add',
                component: () => import('@/views/crm/partner/peer/Add'),
                meta:{title:'新增'},
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/partner/peer/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          
          {
            path: 'gov',
            redirect:"/partner/gov/index",
            component: () => import('@/views/crm/partner/gov/Index'),
            meta: { title: '政府伙伴', icon: 'table' },
            children:[
              {
                path: 'index',
                component: () => import('@/views/crm/partner/gov/List'),
                hidden:true
              },
              {
                path: 'add',
                component: () => import('@/views/crm/partner/gov/Add'),
                meta:{title:'新增'},
                hidden:true
              },
              {
                path: 'edit',
                component: () => import('@/views/crm/partner/gov/Edit'),
                meta:{title:'编辑'},
                hidden:true
              },
            ]
          },
          
        ]
      },
  
     
]