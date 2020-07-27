import request from '@/utils/request'

export default {
    merchantFake(params) {
    return request({
      url: '/business/merchant/merchantFake',
      method: 'post',
      params
    })
  },
  merchantUpdate(data) {
    return request({
      url: '/business/merchant/merchantUpdate',
      method: 'post',
      data
    })
  },
  merchantSelect(params) {
    return request({
      url: '/business/merchant/merchantSelect',
      method: 'post',
      params
    })
  },
  merchantList(params) {
    return request({
      url: '/business/merchant/merchantList',
      method: 'post',
      params
    })
  },
  merchantAdd(data) {
    return request({
      url: '/business/merchant/merchantAdd',
      method: 'post',
      data
    })
  },
  addInit() {
    return request({
      url: '/business/claims/addInit',
      method: 'get',
    })
  },
}
