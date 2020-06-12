import request from '@/utils/request'
export default
    {
        findByBlurry(params) {
            return request({
                url: '/user/select/findByBlurry',
                method: 'post',
                params
            })
        }, 
        findByCity(params){
            return request({
                url: '/user/partner/findByCity',
                method: 'post',
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 }
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
                url: '/user/partner/findByPartType',
                method: 'post',
                params
            })
        },
        findByPartType(params) {
            return request({
                url: '/user/partner/findByPartType',
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