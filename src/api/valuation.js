import request from '@/utils/request'
export default
    {
        updateCash(params) {
            return request({
                url: '/business/valuations/updateCash',
                method: 'post',
                params
            })
        },
        AssetsvalueList(params) {
            return request({
                url: '/business/busassets/valueList',
                method: 'post',
                params
            })
        },
        AssvalueUpdate(data) {
            return request({
                url: '/business/busassets/valueUpdate',
                method: 'post',
                data
            })
        },  
        update(params) {
            return request({
                url: '/business/assets/update',
                method: 'post',
                params
            })
        },
        addInit(params) {
            return request({
                url: '/business/claims/addInit',
                method: 'get',
                params
            })
        },
        assetDto(params) {
            return request({
                url: '/business/assets/assetDto',
                method: 'post',
                params
            })
        },
        assetList(params) {
            return request({
                url: '/business/assets/assetList',
                method: 'post',
                params
            })
        },
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