import Layout from '@/layout'
export default[
    {
        path: '/search',
        component: Layout,
        name: 'search',
        redirect:"index",
        meta: { title: '我的伙伴', icon: 'example' },
        children:[
          {
            path: 'index',
            component: () => import('@/views/crm/search/Index'),
            meta: { title: '查询伙伴', icon: 'table' }
          },
          {
            path: 'find',
            component: () => import('@/views/crm/search/Find'),
            meta: { title: '查询伙伴', icon: 'table' },
            hidden:true
          },
        ]
      },
  
     
]