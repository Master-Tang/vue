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
        prorigAdd(data) {
            return request({
                url: '/business/prorigq/prorigAdd',
                method: 'post',
                data
            })
        },
        prorig(params) {
            return request({
                url: '/business/prorigq/prorig',
                method: 'post',
                params
            })
        },
        prorigFake(params) {
            return request({
                url: '/business/prorigq/prorigFake',
                method: 'post',
                params
            })
        },
        prorigList(){
            return request({
                url: '/business/prorigq/prorigList',
                method: 'post',
            })
        },
        mortgageFake(params) {
            return request({
                url: '/business/mortgageq/mortgageFake',
                method: 'post',
                params
            })
        },
        mortgageList(){
            return request({
                url: '/business/mortgageq/mortgageList',
                method: 'post',
            })
        },
        addmortgage(data) {
            return request({
                url: '/business/mortgageq/mortgageAdd',
                method: 'post',
                data
            })
        },
        legal(params) {
            return request({
                url: '/business/claims/legal',
                method: 'post',
                params
            })
        },
        legalFake(params) {
            return request({
                url: '/business/claims/legalFake',
                method: 'post',
                params
            })
        },
        legalList(params) {
            return request({
                url: '/business/claims/legalList',
                method: 'post',
                params
            })
        },
        legalUpdate(data) {
            return request({
                url: '/business/claims/legalUpdate',
                method: 'post',
                data
            })
        },
        legalAdd(data) {
            return request({
                url: '/business/claims/legalAdd',
                method: 'post',
                data
            })
        },
        mapproAll(params) {
            return request({
                url: '/business/prorigq/mapAll',
                method: 'post',
                params
            })
        },
        mapLists(params) {
            return request({
                url: '/business/mortgageq/mapAll',
                method: 'post',
                params
            })
        },
        mapAll(params) {
            return request({
                url: '/business/claimsSelect/mapAll',
                method: 'post',
                params
            })
        },
        lightFake(params) {
            return request({
                url: '/business/claims/lightFake',
                method: 'post',
                params
            })
        },
        landFake(params) {
            return request({
                url: '/business/claims/landFake',
                method: 'post',
                params
            })
        },
        propertyFake(params) {
            return request({
                url: '/business/claims/propertyFake',
                method: 'post',
                params
            })
        },
        otherFake(params) {
            return request({
                url: '/business/claims/otherFake',
                method: 'post',
                params
            })
        },
        guarantorFake(params) {
            return request({
                url: '/business/claims/guarantorFake',
                method: 'post',
                params
            })
        },
        collateralFake(params) {
            return request({
                url: '/business/claims/collateralFake',
                method: 'post',
                params
            })
        },
        contractFake(params) {
            return request({
                url: '/business/claims/contractFake',
                method: 'post',
                params
            })
        },
        borrowFake(params) {
            return request({
                url: '/business/claims/borrowFake',
                method: 'post',
                params
            })
        },
        claimFake(params) {
            return request({
                url: '/business/claims/claimFake',
                method: 'post',
                params
            })
        },
        other(params) {
            return request({
                url: '/business/claimsSelect/other',
                method: 'post',
                params
            })
        },
        property(params) {
            return request({
                url: '/business/claimsSelect/property',
                method: 'post',
                params
            })
        },
        guarantor(params) {
            return request({
                url: '/business/claimsSelect/guarantor',
                method: 'post',
                params
            })
        },
        light(params) {
            return request({
                url: '/business/claimsSelect/light',
                method: 'post',
                params
            })
        },
        contract(params) {
            return request({
                url: '/business/claimsSelect/contract',
                method: 'post',
                params
            })
        },
        land(params) {
            return request({
                url: '/business/claimsSelect/land',
                method: 'post',
                params
            })
        },
        collateral(params) {
            return request({
                url: '/business/claimsSelect/collateral',
                method: 'post',
                params
            })
        },
        borrow(params) {
            return request({
                url: '/business/claimsSelect/borrow',
                method: 'post',
                params
            })
        },
        mortgage(params) {
            return request({
                url: '/business/mortgageq/mortgage',
                method: 'post',
                params
            })
        },
        claims(params) {
            return request({
                url: '/business/claimsSelect/claims',
                method: 'post',
                params
            })
        },
        updateclaims(data) {
            return request({
                url: '/business/claimsSelect/claimsUpdate',
                method: 'post',
                data
            })
        },
        otherList(params) {
            return request({
                url: '/business/claimsSelect/otherList',
                method: 'post',
                params
            })
        },
        landList(params) {
            return request({
                url: '/business/claimsSelect/landList',
                method: 'post',
                params
            })
        },
        propertyList(params) {
            return request({
                url: '/business/claimsSelect/propertyList',
                method: 'post',
                params
            })
        },
        collateralList(params) {
            return request({
                url: '/business/claimsSelect/collateralList',
                method: 'post',
                params
            })
        },
        contractList(params) {
            return request({
                url: '/business/claimsSelect/contractList',
                method: 'post',
                params
            })
        },
        lightList(params) {
            return request({
                url: '/business/claimsSelect/lightList',
                method: 'post',
                params
            })
        },
        guarantorList(params) {
            return request({
                url: '/business/claimsSelect/guarantorList',
                method: 'post',
                params
            })
        },
        borrowList(params) {
            return request({
                url: '/business/claimsSelect/borrowList',
                method: 'post',
                params
            })
        },
        mapList(params) {
            return request({
                url: '/business/claimsSelect/mapContract',
                method: 'post',
                params
            })
        },
        mapBorrow(params) {
            return request({
                url: '/business/claimsSelect/mapBorrow',
                method: 'post',
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
        updatelight(data) {
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
        updateother(data) {
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
        updateland(data) {
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
        updateproperty(data) {
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
        updatecollateral(data) {
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
        updateguarantee(data) {
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
        updatecontract(data) {
            return request({
                url: '/business/claimsSelect/contractUpdate',
                method: 'post',
                data
            })
        },
        updateborrow(data) {
            return request({
                url: '/business/claimsSelect/borrowUpdate',
                method: 'post',
                data
            })
        },
        addInit(params) {
            return request({
                url: '/business/claims/addInit',
                method: 'get',
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
        claimsList() {
            return request({
                url: '/business/claims/claimsList',
                method: 'post',
            })
        }
    }