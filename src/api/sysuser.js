import request from '@/utils/request'
export default
{
   backUser(params){
      return request({
         url:'/admin/sysUser/backUser',
         method:'post',
         params
      }) 
   },
   updatePassword(params){
      return request({
          url: '/admin/sysUser/password',
          method: 'post',
          params,
      })
  },
   yearAim(params){
      return request({
         url: '/home/yearAim',
         method: 'post',
         params
       })
   },
   updateAim(params){
      return request({
         url: '/home/update',
         method: 'post',
         params
       })
   },
   findAim(params){
      return request({
         url: '/home/findAim',
         method: 'post',
         params
       })
   },
   homeList(params){
      return request({
         url: '/home/yearAim',
         method: 'post',
         params
       })
   },
   getList(params)
   {
    return request({
        url: '/admin/sysUser/list',
        method: 'post',
        params
      })
   },
   getStatList(params)
   {
    return request({
        url: '/admin/stat/list',
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
   },
   export(params)
   {
      return request({
         url:'/admin/stat/export',
         method:'post',
         params,
         responseType: 'blob'
      })
   },
   exportTimeList(params)
   {
      return request({
         url:'/home/export',
         method:'post',
         params,
         responseType: 'blob'
      })
   }
}