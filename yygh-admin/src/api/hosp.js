import request from "@/utils/request";
// 定义公共请求路径
const api_name = "/admin/hosp/hospital";

export default {
  //查询医院列表
  // 条件查询
  getPageList(page, limit,searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`, //应用变量  斜引号
      method: "get",
      params: searchObj //条件对象通过参数提交
    });
  },
   //查询数据字典中的所有数据
   getChildData(id){
    return request({
      url:`/admin/cmn/dict/findChildData/${id}`,
      method:'GET'
    })
  },
  //查询子列表中所有的数据
  getDictCode(dictCode){
    return request({
      url:`/admin/cmn/dict/findByDictCode/${dictCode}`,
      method:'GET'
    })
  }
};

