<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start">
        <el-button type="text" @click="exportData">
          <i class="fa fa-plus" /> 导出
        </el-button>
        <el-button type="text" @click="importData"
          ><i class="fa fa-plus" /> 导入</el-button
        >
      </div>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="getChildrens"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="名称" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" width="220">
        <template slot-scope="{ row }">
          {{ row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 导入的弹出框 -->
    <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8202/admin/cmn/dict/importData'"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传xls文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false"> 取消 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dictApi from "@/api/dict";
export default {
  data() {
    return {
      list: [], //列表数据
      dialogImportVisible: false, //不显示导入弹出框
    };
  },
  created() {
    this.getDictList(1);
  },
  methods: {
    //数据字典列表
    getDictList(id) {
      dictApi.getDictList(id).then((response) => {
        this.list = response.data;
      });
    },
    //显示子列表()
    getChildrens(tree, treeNode, resolve) {
      //tree第一级的对象
      dictApi.getDictList(tree.id).then((response) => {
        resolve(response.data);
      });
    },
    //导出表格中的数据
    exportData() {
      window.location.href = "http://localhost:8202/admin/cmn/dict/exportData";
    },
    //文件内容导入到数据库
    importData() {
      //将导入的弹出框设置显示
      this.dialogImportVisible = true;
    },
    //导入成功后调用的方法
    onUploadSuccess() {
      //关闭页面的弹窗
      this.dialogImportVisible = false;

      //重新加载页面
      this.getDictList(1);
    },
  },
};
</script>
