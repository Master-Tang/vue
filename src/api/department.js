import request from '@/utils/request'
export default
{
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
  
}