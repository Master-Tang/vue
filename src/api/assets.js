import request from '@/utils/request'
export default
    {
        workersList(){
            return request({
                url: '/user/select/workes',
                method: 'post',
            })
        },
        homeList(){
            return request({
                url: '/home/homeList',
                method: 'post',
            })
        },
        findDepName(){
            return request({
                url: '/admin/sysUser/findDepName',
                method: 'post',
            })
        },
        findFromUserID(){
            return request({
                url: '/admin/sysUser/findFromUserID',
                method: 'post',
            })
        },
        countCreateId(){
            return request({
                url: '/user/select/countCreateId',
                method: 'post',
            })
        },
        path()
        {
            return request({
                url: '/user/partner/path',
                method: 'post',
            })
        },
        getCreateUserId()
        {
            return request({
                url: '/user/partner/createId',
                method: 'get',
            })
        },
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
        findAssetInf(params){
            return request({
                url: '/user/partner/findAssetInf',
                method: 'post',
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 }
            })
        },
        findOrgInfo(params){
            return request({
                url: '/user/select/findOrgInfo',
                method: 'post',
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 }
            })
        },
        findPeerInfo(params){
            return request({
                url: '/user/select/findPeerInfo',
                method: 'post',
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 }
            })
        },
        findFundInfo(params){
            return request({
                url: '/user/partner/findFundInfo',
                method: 'post',
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 }
            })
        },
        findExitInfo(params){
            return request({
                url: '/user/select/findExitInfo',
                method: 'post',
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 }
            })
        },
        findJusticeInfo(params){
            return request({
                url: '/user/select/findJusticeInfo',
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
        matchNumber(params) {
            return request({
                url: '/user/select/matchNumber',
                method: 'post',
                params
            })
        },
        findByNameTelHide(params) {
            return request({
                url: '/user/select/findByNameTelHide',
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
        findInit(params)
        {
            return request({
                url: '/user/partner/findInit',
                method: 'get',
                params
            })
        },
        addInit1()
        {
            return request({
                url: '/user/partner/addInit1',
                method: 'get',
            })
        },
        editInit1(params)
        {
            return request({
                url: '/user/partner/editInit1',
                method: 'get',
                params
            })
        },
        findInit1(params)
        {
            return request({
                url: '/user/partner/findInit1',
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