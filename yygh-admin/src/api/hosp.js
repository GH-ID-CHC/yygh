import request from '@/utils/request'
// 定义公共请求路径
const api_name = '/admin/hosp/hospital'
const api_departname = '/admin/hosp/department'
const api_schedule = '/admin/hosp/schedule'

export default {
  // 查询医院列表
  // 条件查询
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/list/${page}/${limit}`, // 应用变量  斜引号
      method: 'get',
      params: searchObj // 条件对象通过参数提交
    })
  },
  // 查询数据字典中的所有数据
  getChildData(id) {
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'GET'
    })
  },
  // 查询子列表中所有的数据
  getDictCode(dictCode) {
    return request({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'GET'
    })
  },
  // 修改医院的在线状态
  updateStatus(id, status) {
    return request({
      url: `${api_name}/updateStatus/${id}/${status}`,
      method: 'GET'
    })
  },
  // 查看医院的信息
  getHospById(id) {
    return request({
      url: `${api_name}/getInfo/${id}`,
      method: 'GET'
    })
  },
  // 查看医院部门的信息
  getDeptByHoscode(hoscode) {
    return request({
      url: `${api_departname}/getDepList/${hoscode}`,
      method: 'GET'
    })
  },
  getScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `${api_schedule}/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: 'get'
    })
  }
}
