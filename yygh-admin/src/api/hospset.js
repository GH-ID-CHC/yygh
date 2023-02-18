import request from '@/utils/request'
// 定义公共请求路径
const api_name = '/admin/hosp/hospitalSet'

export default {
  // 条件查询
  getHospSetList(current, limit, searchObj) {

    return request({
      url: `${api_name}/findPageHospSet/${current}/${limit}`,  //应用变量  斜引号
      method: 'post',
      data: searchObj //使用json的方式
    })
  },
  //按照id进行删除
  deleHospSet(id){
    return request({
      url: `${api_name}/${id}`,  //应用变量  斜引号
      method: 'delete',
    })
  },
  //批量删除
  deleHospSetById(ids){
    return request({
      url: `${api_name}/batchRemove`,  //应用变量  斜引号
      method: 'delete',
      data:ids
    })
  },
  //锁定和解锁，医院的状态
  lockHospitalSet(id,stuts){
    return request({
      url: `${api_name}/lockHospitalSet/${id}/${stuts}`,  //应用变量  斜引号
      method: 'put'
    })
  },
  //添加医院的信息
  addHospital(hosp){
    return request({
      url: `${api_name}/saveHospitalSet/`,  //应用变量  斜引号
      method: 'post',
      data:hosp
    })
  },
  //根据id获取数据（数据的回显）
  getHospSet(id){
    return request({
      url: `${api_name}/getHospSet/${id}`,  //应用变量  斜引号
      method: 'get',
    })
  },
  //修改医院数据
  updateHospSet(hosp){
    return request({
      url: `${api_name}/updateHospSet/`,  //应用变量  斜引号
      method: 'put',
      data:hosp
    })
  }
}

