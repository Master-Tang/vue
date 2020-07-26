import Layout from '@/layout'
export default [
    {
        path: '/bus',
        component: Layout,
        redirect: '/bus/claims',
        meta: { title: '标的管理', icon: 'example' },
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
                    path: 'detail',
                    component: () => import('@/views/bus/claims/Detail'),
                    meta: { title: '详细信息' },
                    hidden: true
                },
                {
                    path: 'edit',
                    redirect: "/bus/claims/edit/index",
                    component: () => import('@/views/bus/claims/edit/Index'),
                    meta: { title: '债权界面' },
                    hidden: true,
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/views/bus/claims/edit/Choose'),
                            hidden: true,
                        },
                        {
                            path:'add',
                            component:()=>import('@/views/bus/claims/edit/Add'),
                            meta:{title:'债权基本信息'},
                            hidden:true
                        },
                        {
                            path: 'borrow',
                            component: () => import('@/views/bus/claims/edit/Borrowing'),
                            meta: { title: '借款合同' },
                            hidden: true
                        },
                        {
                            path: 'guarantee',
                            component: () => import('@/views/bus/claims/edit/Guarantee'),
                            meta: { title: '保证合同' },
                            hidden: true
                        },
                        {
                            path: 'collcontract',
                            component: () => import('@/views/bus/claims/edit/Collcontract'),
                            meta: { title: '抵押物合同' },
                            hidden: true
                        },
                        {
                            path: 'collateral',
                            redirect: "/bus/claims/edit/collateral/index",
                            component: () => import('@/views/bus/claims/edit/collateral/Index'),
                            meta: { title: '抵押信息' },
                            hidden: true,
                            children:[
                                {
                                    path: 'index',
                                    component: () => import('@/views/bus/claims/edit/collateral/Collateral'),
                                    hidden: true,
                                },
                                {
                                    path: 'property',
                                    component: () => import('@/views/bus/claims/edit/collateral/Property'),
                                    meta: { title: '房产信息' },
                                    hidden: true
                                },
                                {
                                    path: 'land',
                                    component: () => import('@/views/bus/claims/edit/collateral/Land'),
                                    meta: { title: '土地信息' },
                                    hidden: true
                                },
                                {
                                    path: 'other',
                                    component: () => import('@/views/bus/claims/edit/collateral/Other'),
                                    meta: { title: '其他资产信息' },
                                    hidden: true
                                },
                            ]
                        },
                        {
                            path: 'light',
                            component: () => import('@/views/bus/claims/edit/Light'),
                            meta: { title: '亮点信息' },
                            hidden: true
                        },

                    ]
                },
                {
                    path: 'add',
                    redirect: "/bus/claims/add/index",
                    component: () => import('@/views/bus/claims/add/Index'),
                    meta: { title: '新增' },
                    hidden: true,
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/views/bus/claims/add/Add'),
                            hidden: true,
                        },
                        {
                            path: 'borrow',
                            component: () => import('@/views/bus/claims/add/Borrowing'),
                            meta: { title: '借款合同' },
                            hidden: true
                        },
                        {
                            path: 'guarantee',
                            component: () => import('@/views/bus/claims/add/Guarantee'),
                            meta: { title: '保证合同' },
                            hidden: true
                        },
                        {
                            path: 'collcontract',
                            component: () => import('@/views/bus/claims/add/Collcontract'),
                            meta: { title: '抵押物合同' },
                            hidden: true
                        },
                        {
                            path: 'collateral',
                            redirect: "/bus/claims/add/collateral/index",
                            component: () => import('@/views/bus/claims/add/collateral/Index'),
                            meta: { title: '抵押信息' },
                            hidden: true,
                            children:[
                                {
                                    path: 'index',
                                    component: () => import('@/views/bus/claims/add/collateral/Collateral'),
                                    hidden: true,
                                },
                                {
                                    path: 'property',
                                    component: () => import('@/views/bus/claims/add/collateral/Property'),
                                    meta: { title: '房产信息' },
                                    hidden: true
                                },
                                {
                                    path: 'land',
                                    component: () => import('@/views/bus/claims/add/collateral/Land'),
                                    meta: { title: '土地信息' },
                                    hidden: true
                                },
                                {
                                    path: 'other',
                                    component: () => import('@/views/bus/claims/add/collateral/Other'),
                                    meta: { title: '其他资产信息' },
                                    hidden: true
                                },
                            ]
                        },
                        {
                            path: 'light',
                            component: () => import('@/views/bus/claims/add/Light'),
                            meta: { title: '亮点信息' },
                            hidden: true
                        },

                    ]
                },
                {
                    path: 'valuation',
                    redirect: "/bus/claims/valuation/index",
                    component: () => import('@/views/bus/claims/valuation/Index'),
                    meta: { title: '资产估值' },
                    hidden: true,
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/views/bus/claims/valuation/Valuation'),
                            hidden: true,
                        },

                    ]
                },
                {
                    path: 'merman',
                    redirect: "/bus/claims/merman/index",
                    component: () => import('@/views/bus/claims/merman/Index'),
                    meta: { title: '招商管理' },
                    hidden: true,
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/views/bus/claims/merman/Merman'),
                            hidden: true,
                        },

                    ]
                },
                {
                    path: 'proinfo',
                    redirect: "/bus/claims/proinfo/index",
                    component: () => import('@/views/bus/claims/proinfo/Index'),
                    meta: { title: '财产信息' },
                    hidden: true,
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/views/bus/claims/proinfo/Proinfo'),
                            hidden: true,
                        },

                    ]
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
                    path: 'detail',
                    component: () => import('@/views/bus/mortgage/Detail'),
                    meta: { title: '详细信息' },
                    hidden: true
                },
                {
                    path: 'edit',
                    redirect: "/bus/mortgage/edit/index",
                    component: () => import('@/views/bus/mortgage/edit/Index'),
                    meta: { title: '编辑' },
                    hidden: true,
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/views/bus/mortgage/edit/Add'),
                            hidden: true,
                        },
                        {
                            path: 'borrow',
                            component: () => import('@/views/bus/mortgage/edit/Borrowing'),
                            meta: { title: '借款合同' },
                            hidden: true
                        },
                        {
                            path: 'guarantee',
                            component: () => import('@/views/bus/mortgage/edit/Guarantee'),
                            meta: { title: '保证合同' },
                            hidden: true
                        },
                        {
                            path: 'collcontract',
                            component: () => import('@/views/bus/mortgage/edit/Collcontract'),
                            meta: { title: '抵押物合同' },
                            hidden: true
                        },
                        {
                            path: 'collateral',
                            redirect: "/bus/mortgage/edit/collateral/index",
                            component: () => import('@/views/bus/mortgage/edit/collateral/Index'),
                            meta: { title: '抵押信息' },
                            hidden: true,
                            children:[
                                {
                                    path: 'index',
                                    component: () => import('@/views/bus/mortgage/edit/collateral/Collateral'),
                                    hidden: true,
                                },
                                {
                                    path: 'property',
                                    component: () => import('@/views/bus/mortgage/edit/collateral/Property'),
                                    meta: { title: '房产信息' },
                                    hidden: true
                                },
                                {
                                    path: 'land',
                                    component: () => import('@/views/bus/mortgage/edit/collateral/Land'),
                                    meta: { title: '土地信息' },
                                    hidden: true
                                },
                                {
                                    path: 'other',
                                    component: () => import('@/views/bus/mortgage/edit/collateral/Other'),
                                    meta: { title: '其他资产信息' },
                                    hidden: true
                                },
                            ]
                        },
                        {
                            path: 'light',
                            component: () => import('@/views/bus/mortgage/edit/Light'),
                            meta: { title: '亮点信息' },
                            hidden: true
                        },

                    ]
                },
                {
                    path: 'add',
                    redirect: "/bus/mortgage/add/index",
                    component: () => import('@/views/bus/mortgage/add/Index'),
                    meta: { title: '新增' },
                    hidden: true,
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/views/bus/mortgage/add/Add'),
                            hidden: true,
                        },
                        {
                            path: 'borrow',
                            component: () => import('@/views/bus/mortgage/add/Borrowing'),
                            meta: { title: '借款人合同' },
                            hidden: true
                        },
                        {
                            path: 'guarantee',
                            component: () => import('@/views/bus/mortgage/add/Guarantee'),
                            meta: { title: '保证合同' },
                            hidden: true
                        },
                        {
                            path: 'collcontract',
                            component: () => import('@/views/bus/mortgage/add/Collcontract'),
                            meta: { title: '抵押物合同' },
                            hidden: true
                        },
                        {
                            path: 'collateral',
                            redirect: "/bus/mortgage/add/collateral/index",
                            component: () => import('@/views/bus/mortgage/add/collateral/Index'),
                            meta: { title: '抵押信息' },
                            hidden: true,
                            children:[
                                {
                                    path: 'index',
                                    component: () => import('@/views/bus/mortgage/add/collateral/Collateral'),
                                    hidden: true,
                                },
                                {
                                    path: 'property',
                                    component: () => import('@/views/bus/mortgage/add/collateral/Property'),
                                    meta: { title: '房产信息' },
                                    hidden: true
                                },
                                {
                                    path: 'land',
                                    component: () => import('@/views/bus/mortgage/add/collateral/Land'),
                                    meta: { title: '土地信息' },
                                    hidden: true
                                },
                                {
                                    path: 'other',
                                    component: () => import('@/views/bus/mortgage/add/collateral/Other'),
                                    meta: { title: '其他资产信息' },
                                    hidden: true
                                },
                            ]
                        },
                        {
                            path: 'light',
                            component: () => import('@/views/bus/mortgage/add/Light'),
                            meta: { title: '亮点信息' },
                            hidden: true
                        },

                    ]
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
                    path: 'detail',
                    component: () => import('@/views/bus/property/Detail'),
                    meta: { title: '详细信息' },
                    hidden: true
                },
                {
                    path: 'edit',
                    redirect: "/bus/property/edit/index",
                    component: () => import('@/views/bus/property/edit/Index'),
                    meta: { title: '编辑' },
                    hidden: true,
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/views/bus/property/edit/Add'),
                            hidden: true,
                        },
                        {
                            path: 'property',
                            component: () => import('@/views/bus/property/edit/Property'),
                            meta: { title: '房产信息' },
                            hidden: true
                        },
                        {
                            path: 'land',
                            component: () => import('@/views/bus/property/edit/Land'),
                            meta: { title: '土地信息' },
                            hidden: true
                        },
                        {
                            path: 'other',
                            component: () => import('@/views/bus/property/edit/Other'),
                            meta: { title: '其他资产信息' },
                            hidden: true
                        },
                    ]
                },
                {
                    path: 'add',
                    redirect: "/bus/property/add/index",
                    component: () => import('@/views/bus/property/add/Index'),
                    meta: { title: '新增' },
                    hidden: true,
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/views/bus/property/add/Add'),
                            hidden: true,
                        },
                        {
                            path: 'property',
                            component: () => import('@/views/bus/property/add/Property'),
                            meta: { title: '房产信息' },
                            hidden: true
                        },
                        {
                            path: 'land',
                            component: () => import('@/views/bus/property/add/Land'),
                            meta: { title: '土地信息' },
                            hidden: true
                        },
                        {
                            path: 'other',
                            component: () => import('@/views/bus/property/add/Other'),
                            meta: { title: '其他资产信息' },
                            hidden: true
                        },
                    ]
                },
            ]
        },

        ]
    }
]
