import request from "@/utils/request"

export default {
  weekUpdates(data) {
    return request({
      url: "/business/defectweek/weekUpdates",
      method: "post",
      data
    })
  },
  weekFinds(params) {
    return request({
      url: "/business/defectweek/weekFinds",
      method: "post",
      params
    })
  },
  weekInsert(data) {
    return request({
      url: "/business/defectweek/weekInsert",
      method: "post",
      data
    })
  },
  weekLists(params) {
    return request({
      url: "/business/defectweek/weekLists",
      method: "post",
      params
    })
  },
  defectFind(params) {
    return request({
      url: "/business/defect/defectFind",
      method: "post",
      params
    })
  },
  defectUpdate(data) {
    return request({
      url: "/business/defect/defectUpdate",
      method: "post",
      data
    })
  },
}
