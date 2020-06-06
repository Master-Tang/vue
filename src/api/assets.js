import request from '@/utils/request'
export default
    {
        findAll(params) {
            return request({
                url: '/user/partner/findAll',
                method: 'post',
                params
            })
        },
        insert(data) {
            return request({
                url: '/user/partner/insert',
                method: 'post',
                data
            })
        },
        
        findInit()
        {
            return request({
                url: '/user/partner/findInit',
                method: 'get',
            })
        }
    }