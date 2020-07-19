<template>
  <div class="app-container">
    <div class="button" style="padding-bottom:1rem">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="handleAdd" >添加</el-button>
          </div>
    </div>
    <el-table
      id="myform"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column label="序号" align="center" width="50rem">
        <template slot-scope="scope">{{ scope.row.a }}</template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">{{ scope.row.city+" "+scope.row.address}}</template>
      </el-table-column>
      <el-table-column label="所有权人" align="center">
        <template slot-scope="scope">{{ scope.row.owner }}</template>
      </el-table-column>
      <el-table-column label="资产类型" align="center">
        <template slot-scope="scope">{{ scope.row.assetType }}</template>
      </el-table-column>
      <el-table-column label="需要核实信息" align="center">
        <template slot-scope="scope">{{ scope.row.info }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150rem">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="small" @click="handleEdit(scope.row.number)"></el-button>
          <el-button type="info" icon="el-icon-search" circle  size="small" @click="propertyFind(scope.row.number)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleDel(scope.row.number)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import asstes from "@/api/assets";
import $ from "@/api/bus";

export default {
  data() {
    return {
      value: "",
      state: 0,
      list: null,
      val: "",
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      options: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      $.prorigList().then(response => {
        // console.log(response.data)
        this.list = response.data;
        for (var i = 1; i <= this.list.length; i++) {
          this.$set(this.list[i - 1], "a", i);
        }
        // console.log(response)
      });
    },

    handleAdd() {
      this.$router.push({
        path: "add"
      });
      
    },
    handleEdit(id) {
      this.$router.push({
        path: "edit",
        query: { claimsNumber: id }
      });
    },
    propertyFind(id){
      this.$router.push({
        path: "detail",
        query: { claimsNumber: id }
      });
    },
    handleDel(id) {
      this.$confirm("此操作将删除该伙伴, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.prorigFake({ number: id }).then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
