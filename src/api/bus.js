import request from '@/utils/request'
export default
    {
        mapList(params){
            return request({
                url:'/business/claimsSelect/mapContract',
                method:'post',
                params
             })
        },
        contractList(params){
            return request({
                url:'/business/claimsSelect/mapBorrow',
                method:'post',
                params
             })
        },
        addlight(data) {
            return request({
                url: '/business/claims/lightAdd',
                method: 'post',
                data
            })
        },
        updatelight(data){
            return request({
                url: '/business/claimsSelect/lightUpdate',
                method: 'post',
                data 
            })
        },
        addother(data) {
            return request({
                url: '/business/claims/otherAdd',
                method: 'post',
                data
            })
        },
        updateother(data){
            return request({
                url: '/business/claimsSelect/otherUpdate',
                method: 'post',
                data 
            })
        },
        addland(data) {
            return request({
                url: '/business/claims/landAdd',
                method: 'post',
                data
            })
        },
        updateland(data){
            return request({
                url: '/business/claimsSelect/landUpdate',
                method: 'post',
                data 
            })
        },
        addproperty(data) {
            return request({
                url: '/business/claims/propertyAdd',
                method: 'post',
                data
            })
        },
        updateproperty(data){
            return request({
                url: '/business/claimsSelect/propertyUpdate',
                method: 'post',
                data 
            })
        },
        addcollateral(data) {
            return request({
                url: '/business/claims/collateralAdd',
                method: 'post',
                data
            })
        },
        updatecollateral(data){
            return request({
                url: '/business/claimsSelect/collateralUpdate',
                method: 'post',
                data 
            })
        },
        addguarantee(data) {
            return request({
                url: '/business/claims/guarantorAdd',
                method: 'post',
                data
            })
        },
        updateguarantee(data){
            return request({
                url: '/business/claimsSelect/guarantorUpdate',
                method: 'post',
                data 
            })
        },
        addcontract(data) {
            return request({
                url: '/business/claims/contractAdd',
                method: 'post',
                data
            })
        },
        updatecontract(data){
            return request({
                url: '/business/claimsSelect/contractUpdate',
                method: 'post',
                data 
            })
        },
        updateborrow(data){
            return request({
                url: '/business/claimsSelect/borrowUpdate',
                method: 'post',
                data 
            })
        },
        addInit(params)
        {
           return request({
              url:'/business/claims/addInit',
              method:'get',
              params
           })
        },
        addclaims(data) {
            return request({
                url: '/business/claims/clamsAdd',
                method: 'post',
                data
            })
        },
        addborrow(data) {
            return request({
                url: '/business/claims/borrowAdd',
                method: 'post',
                data
            })
        },
        claimsList(params){
            return request({
                url: '/business/claims/claimsList',
                method: 'post',
                params
            })
        }
    }