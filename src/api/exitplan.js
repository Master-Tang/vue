import request from "@/utils/request"

export default {
  sticky(params) {
  return request({
    url: "/business/exits/sticky",
    method: "post",
    params
  })
},
  busExitsDelete(params) {
    return request({
      url: "/business/exits/busExitsDelete",
      method: "post",
      params
    })
  },
  busExitsSelect(params) {
    return request({
      url: "/business/exits/busExitsSelect",
      method: "post",
      params
    })
  },
  busExitsMoney(params) {
    return request({
      url: "/business/exits/busExitsMoney",
      method: "post",
      params
    })
  },
  busExitsUpdate(data) {
    return request({
      url: "/business/exits/busExitsUpdate",
      method: "post",
      data
    })
  },
  busExitsAdd(data) {
    return request({
      url: "/business/exits/busExitsAdd",
      method: "post",
      data
    })
  },
  busExitsList(params) {
    return request({
      url: "/business/exits/busExitsList",
      method: "post",
      params
    })
  },
  addInit() {
    return request({
      url: '/business/claims/addInit',
      method: 'get',
    })
  },
}
