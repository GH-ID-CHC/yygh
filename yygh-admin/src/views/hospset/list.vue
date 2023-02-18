<template>
  <div class="app-container">
    <!-- 医院列表设置 -->
    <!-- 条件查询表单 -->
    <el-form :inline="true" class="demo-form-inline" style="text-align: left">
         <el-form-item>
             <el-input v-model="searchObj.hosname" placeholder="医院名称" />
         </el-form-item
      >
       <el-form-item>
           <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
       <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>
    <!-- 工具条 -->
    <div>
         
      <el-button type="danger" size="mini" @click="delHospSetByIds()"
        >批量删除</el-button>
    </div>
    <!-- banner列表(复选框) -->
    <!-- selection-change="handleSelectionChange 选中就会改变 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
    
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <!-- {{ scope.row.status === 1 ? "可用" : "不可用" }} -->
          <el-switch
            v-model="scope.row.status"
            :active-value="1" 
            :inactive-value="0" 
            @change="handleChangeStatus($event,scope.row.id)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope"
          >     
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="delHospSet(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页插件 -->
    <el-pagination
      @current-page="current"
      @current-change="getList"
      style="padding: 30px 0;  text-align: center"
      background
      :page-size="limit"
      :total="total"
      layout="total,prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
import hospitalSetApi from "@/api/hospset";
export default {
  //定义变量的默认值
  data() {
    return {
      current: 1, //当前页码
      limit: 3, //每页记录书
      searchObj: {
        //hosname: "人民",
      }, //查询条件
      list: [], //用于接受请求返回值
      total: 0, //总记录数
      multipleSelection: [], // 复选框选择的记录列表
    };
  },
  created() {
    //调用方法
    this.getList();
  },
  methods: {
    getList(page = 1) {
      this.current = page;
      hospitalSetApi
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
          console.log(response.data.records);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delHospSet(id) {
      this.$confirm("此操作将永久删除医院的设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法调用接口
        hospitalSetApi
          .deleHospSet(id)
          .then((response) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            //刷新列表
            this.getList(this.current);
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          });
      });
    },
    // 当复选框发生变化的时候触发方法
    handleSelectionChange(selection) {
      // 接受变化的列表对象
      this.multipleSelection = selection;
    },
    //锁定或解锁账号
    handleChangeStatus(status,id){
        this.$confirm(`是否确认${status ? '开启' : '关闭'}状态开关？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        hospitalSetApi
        .lockHospitalSet(id,status)
        .then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          //刷新列表
          this.getList(this.current);
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "修改失败",
          });
        });
      }).catch(()=>{
          this.$message({
            message: "取消成功",
            type: "success",
          });
      	  this.getList(this.current);
      });  
    },
    //批量删除
    delHospSetByIds() {
      this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        var idList = [];
        //获取复选框中发生变化的列表
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var element = this.multipleSelection[i];
          var id = element.id;
          idList.push(id);
        }
        //调用批量删除的接口
        hospitalSetApi
          .deleHospSetById(idList)
          .then((response) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            //刷新列表
            this.getList(this.current);
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          });
      });
    },
  },
};
</script>