import request from '@/utils/request'
export default
    {
        findByCity(params){
            return request({
                url: '/user/partner/findByCity',
                method: 'post',
                params
            })
        },
        findByNameTel(params) {
            return request({
                url: '/user/select/findByNameTel',
                method: 'post',
                params
            })
        }, 
        findAll(params) {
            return request({
                url: '/user/partner/findAll',
                method: 'post',
                params
            })
        },
        findchaxun(params) {
            return request({
                url: '/user/partner/findchaxun',
                method: 'post',
                params
            })
        },
        get(params)
        {
            return request({
                url: '/user/partner/get',
                method: 'post',
                params
            })
        },
        add(data) {
            return request({
                url: '/user/partner/add',
                method: 'post',
                data
            })
        },
        
        addInit()
        {
            return request({
                url: '/user/partner/addInit',
                method: 'get',
            })
        },
        editInit(params)
        {
            return request({
                url: '/user/partner/editInit',
                method: 'get',
                params
            })
        },
        update(data)
        {
            return request({
                url: '/user/partner/update',
                method: 'post',
                data
            })
        },
        remove(params)
        {
            return request({
                url: '/user/partner/remove',
                method: 'post',
                params
            })
        },
    }