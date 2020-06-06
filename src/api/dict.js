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

   listByGroup(params)
   {
      return request({
         url: '/admin/dict/listByGroup',
         method: 'post',
         params
      })
   },
   listByGroupName(params)
   {
      return request({
         url: '/admin/dict/listByGroupName',
         method: 'post',
         params
      })
   },
   add(data)
   {
      return request({
         url:'/admin/dict/add',
         method:'post',
         data
      })
   },
   update(data)
   {
      return request({
         url:'/admin/dict/update',
         method:'post',
         data
      })
   },
   getDict(params)
   {
    return request({
        url: '/admin/dict/get',
        method: 'post',
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
   },

   getGroupName()
   {
      return request({
         url: '/admin/dict/group',
         method: 'post',
      })
   }
}