import request from "@/utils/request"

export default{
    busExitsList(params){
        return request({
            url:"/business/exits/busExitsList",
            method:"post",
            params
        })
    }
}