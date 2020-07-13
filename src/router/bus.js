import Layout from '@/layout'
export default [
    {
        path: '/bus',
        component: Layout,
        redirect: '/bus/claims',
        meta: { title: '标的录入', icon: 'example' },
        children: [{
            path: 'claims',
            name: 'claims',
            redirect: "/bus/claims/index",
            component: () => import('@/views/bus/claims/Index'),
            meta: { title: '债权标的', icon: 'table' },
            children: [
                {
                    path: 'index',
                    component: () => import('@/views/bus/claims/List'),
                    hidden: true
                },
                {
                    path: 'add',
                    component: () => import('@/views/bus/claims/Add'),
                    meta: { title: '新增' },
                    hidden: true
                },
                {
                    path: 'edit',
                    component: () => import('@/views/bus/claims/Edit'),
                    meta: { title: '编辑' },
                    hidden: true
                },
            ]
        },
        {
            path: 'mortgage',
            name: 'mortgage',
            redirect: "/bus/mortgage/index",
            component: () => import('@/views/bus/mortgage/Index'),
            meta: { title: '房抵贷标的', icon: 'table' },
            children: [
                {
                    path: 'index',
                    component: () => import('@/views/bus/mortgage/List'),
                    hidden: true
                },
                {
                    path: 'add',
                    component: () => import('@/views/bus/mortgage/Add'),
                    meta: { title: '新增' },
                    hidden: true
                },
                {
                    path: 'edit',
                    component: () => import('@/views/bus/mortgage/Edit'),
                    meta: { title: '编辑' },
                    hidden: true
                },
            ]
        },
        {
            path: 'property',
            name: 'property',
            redirect: "/bus/property/index",
            component: () => import('@/views/bus/property/Index'),
            meta: { title: '物权标的', icon: 'table' },
            children: [
                {
                    path: 'index',
                    component: () => import('@/views/bus/property/List'),
                    hidden: true
                },
                {
                    path: 'add',
                    component: () => import('@/views/bus/property/Add'),
                    meta: { title: '新增' },
                    hidden: true
                },
                {
                    path: 'edit',
                    component: () => import('@/views/bus/property/Edit'),
                    meta: { title: '编辑' },
                    hidden: true
                },

            ]
        },

        ]
    }
]
