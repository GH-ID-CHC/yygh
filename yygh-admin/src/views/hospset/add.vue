<template>
  <div class="app-container">
    医院设置添加
    <el-form label-width="120px">
<el-form-item label="医院名称">
<el-input v-model="hospitalSet.hosname" />
</el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
        </el-form-item
      >
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
        </el-form-item
      >
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
        </el-form-item
      >
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
        </el-form-item
      >
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate"
          >保存</el-button
        >
        </el-form-item>
      </el-form>

  </div>
</template>
<script>
import hospitalSetApi from "@/api/hospset";
export default {
    data(){
        return {
            hospitalSet:{} //用户添加的信息保存到对象中
        }
    },
    created(){
        //获取路由id值 调用接口得到医院设置信息
if(this.$route.params&&this.$route.params.id){//有参数&&有id
constid=this.$route.params.id
this.getHostSet(id)
}else{
        //使用添加功能时，将表单进行清空
        this.hospitalSet={};
      }
    },
    methods: {
        //表单提交或修改
        saveOrUpdate(){
            // 查看当前的对象是否有id值，如果有则为修改方法，无则是添加方法
            if(!this.hospitalSet.id){
                this.save()
            }else{
                this.update()
            }
        },
        //数据的回显
        getHostSet(id){
            hospitalSetApi.getHospSet(id)
            .then((response)=>{
                this.hospitalSet=response.data
            })

        },
        //保存方法
        save(){
            hospitalSetApi.addHospital(this.hospitalSet)
            .then((response)=>{
                this.$message({
                    message: "修改成功",
                    type: "success",
                });
                //跳转列表页面，使用路由跳转方式实现
     this.$router.push({path:'/hospSet/list'})
            })
        },
        //修改方法
        update(){
            hospitalSetApi.updateHospSet(this.hospitalSet)
            .then((response)=>{
                this.$message({
                    message: "修改成功",
                    type: "success",
                });
                //跳转列表页面，使用路由跳转方式实现
 this.$router.push({path:'/hospSet/list'})
            })
        }

    }
}
</script>
