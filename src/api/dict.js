import request from '@/utils/request'
export default
{
   getbusList(params)
   {
    return request({
        url: '/business/dict/list',
        method: 'get',
        params
      })
   },

   buslistByGroup(params)
   {
      return request({
         url: '/business/dict/listByGroup',
         method: 'post',
         params
      })
   },
   buslistByGroupName(params)
   {
      return request({
         url: '/business/dict/listByGroupName',
         method: 'post',
         params
      })
   },
   addbus(data)
   {
      return request({
         url:'/business/dict/add',
         method:'post',
         data
      })
   },
   updatebus(data)
   {
      return request({
         url:'/business/dict/update',
         method:'post',
         data
      })
   },
   getbusDict(params)
   {
    return request({
        url: '/business/dict/get',
        method: 'post',
        params
      })
   },
   removebusDict(params)
   {
      
    return request({
        url: '/business/dict/remove',
        method: 'post',
        params
      })
   },

   getbusGroupName()
   {
      return request({
         url: '/business/dict/group',
         method: 'post',
      })
   },

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