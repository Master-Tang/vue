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
   }
  
}