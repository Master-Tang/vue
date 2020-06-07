<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-button type="primary" @click="$router.push('add')">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table
      id="myform"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
     <el-table-column label="部门编号">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="部门名称">
        <template slot-scope="scope">{{ scope.row.depName }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import $ from "@/api/department";

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
      options: []
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    
    fetchData() {
      this.listLoading = true;
      $.getList({ pageIndex: this.currentPage, pageSize: this.pageSize }).then(
        response => {
          console.log(response.data)
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
        }
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      // console.log(this.currentPage)
      if (this.state == 1) {
        this.find();
        //console.log(this.currentPage)
      } else this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //console.log(val)
      if (this.state == 1) {
        this.find();
      } else this.fetchData();
    },

    handleEdit(id) {
      this.$router.push({
        path: "edit",
        query: { id: id }
      });
    },
    handleDel(id) {
      this.$confirm("此操作将删除该字典项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //console.log(id)
          $.delete({ id }).then(response => {
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
