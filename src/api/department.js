import request from '@/utils/request'
export default
{
   confirmVal(params){
      return request({
         url: '/admin/department/depInfo',
         method: 'post',
         params
       })
   },
   getList(params)
   {
    return request({
        url: '/admin/department/list',
        method: 'post',
        params
      })
   },
   add(params)
   {
      return request({
         url:'/admin/department/add',
         method:'post',
         params
      })
   },
   delete(params)
   {
      return request({
         url:'/admin/department/delete',
         method:'post',
         params
      })
   }
   ,
   get(params)
   {
      return request({
         url:'/admin/department/get',
         method:'get',
         params
      })
   },
   save(params)
   {
      return request({
         url:'/admin/department/save',
         method:'post',
         params
      })
   }
}