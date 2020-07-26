import request from '@/utils/request'

export default {
  assetClueDelete(params) {
    return request({
      url: '/business/Clue/assetClueDelete',
      method: 'post',
      params
    })
  },
  assetClueUpdate(data) {
    return request({
      url: '/business/Clue/assetClueUpdate',
      method: 'post',
      data
    })
  },
  assetClueSelect(params) {
    return request({
      url: '/business/Clue/assetClueSelect',
      method: 'post',
      params
    })
  },
  assetClueList(params) {
    return request({
      url: '/business/Clue/assetClueList',
      method: 'post',
      params
    })
  },
  assetClueAdd(data) {
    return request({
      url: '/business/Clue/assetClueAdd',
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
