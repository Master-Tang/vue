import request from '@/utils/request'
export default
    {
        valueUpdate(data) {
            return request({
                url: '/business/guaValues/valueUpdate',
                method: 'post',
                data
            })
        },
        valueList(params) {
            return request({
                url: '/business/guaValues/valueList',
                method: 'post',
                params
            })
        },
        valueAdd(data){
            return request({
                url: '/business/guaValues/valueAdd',
                method: 'post',
                data
            })
        },
        guarantorList(params) {
            return request({
                url: '/business/valuations/guarantorList',
                method: 'post',
                params
            })
        },
        packeValue(params) {
            return request({
                url: '/business/valuations/packeValue',
                method: 'post',
                params
            })
        },
    }