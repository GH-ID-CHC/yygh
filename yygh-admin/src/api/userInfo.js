import request from '@/utils/request'

const api_name = '/admin/user'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  lock(id, status) {
    return request({
      url: `${api_name}/lock/${id}/${status}`,
      method: 'get'
    })
  },
  // 用户详情
  show(id) {
    return request({
      url: `${api_name}/show/${id}`,
      method: 'get'
    })
  },
  // 认证审批
  approval(id, authStatus) {
    return request({
      url: `${api_name}/approval/${id}/${authStatus}`,
      method: 'get'
    })
  }
}
