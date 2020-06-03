import request from '@/utils/request'
export default
{
   getList(params)
   {
    return request({
        url: '/admin/dict/list',
        method: 'get',
        params
      })
   },
   getDict(params)
   {
    return request({
        url: '/admin/dict/get',
        method: 'get',
        params
      })
   },
   removeDict(params)
   {
      
    return request({
        url: '/admin/dict/remove',
        method: 'post',
        params
      })
   }
}