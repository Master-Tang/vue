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
   add(data)
   {
      return request({
         url:'/admin/sysUser/add',
         method:'post',
         data
      })
   },
   getByLoginName(params)
   {
      return request({
         url: '/admin/sysUser/getByLoginName',
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
  
}