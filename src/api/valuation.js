import request from '@/utils/request'
export default
    {
        prorigUpdate(data) {
            return request({
                url: '/business/prorigq/prorigUpdate',
                method: 'post',
                data
            })
        },
    }