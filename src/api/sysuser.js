import request from '@/utils/request'
export default
{
   getList(params)
   {
    return request({
        url: '/admin/sysUser/list',
        method: 'post',
        params
      })
   },
   getRoleList(params){
      return request({
         url:'/user/role/list',
         method:'post',
         params
      })
   },
   add(data)
   {
      return request({
         url:'/admin/sysUser/add',
         method:'post',
         data
      })
   },
   get(params)
   {
      return request({
         url: '/admin/sysUser/get',
         method: 'post',
         params
       })
   },
   getByUserId(params)
   {
      return request({
         url: '/admin/sysUser/getByUserId',
         method: 'post',
         params
       })
   },
   update(data)
   {
      return request({
         url:'/admin/sysUser/update',
         method:'post',
         data
      })
   },
   remove(params)
   {
      
    return request({
        url: '/admin/sysUser/remove',
        method: 'post',
        params
      })
   }
  
}