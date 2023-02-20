import request from '@/utils/request'
// 定义公共请求路径
const api_name = '/admin/cmn/dict'

export default {
  // 条件查询
  getDictList(id) {
    return request({
      url: `${api_name}/findChildData/${id}`,  //应用变量  斜引号
      method: 'get'
    })
  },
}